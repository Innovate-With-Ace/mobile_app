import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useFetchApi } from "@/hooks/useFetchApi";
import { useClerk, useSignUp } from "@clerk/expo";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OTPVerification() {
  const { setActive } = useClerk();
  const fetchApi = useFetchApi();
  const { signUp } = useSignUp();
  const { email } = useLocalSearchParams();
  const code = useRef("");
  const otpRef = useRef<OtpInputRef>(null);
  const [error, setError] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResent, setIsResent] = useState<boolean>(false);

  if (!email) return null;

  async function verifyOTP() {
    setIsSubmitting(true);
    setError([]);
    try {
      const { error: verificationError } =
        await signUp.verifications.verifyEmailCode({
          code: code.current,
        });

      if (verificationError) {
        const message =
          verificationError?.longMessage ||
          verificationError?.message ||
          "Invalid Code, Please try again";

        setError((prev) => [...prev, message]);
        return;
      }

      if (signUp.status === "complete") {
        await fetchApi("/api/join-org", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: signUp.createdUserId }),
        });

        await setActive({
          session: signUp.createdSessionId,
          organization: process.env.EXPO_PUBLIC_BEBOYS_ORG_ID!,
        });

        router.replace("/");
      }
    } catch (err: any) {
      console.error("Unexpected Error:", err);
      setError((prev) => [...prev, "Something went wrong. Please try again."]);
      otpRef.current?.clear();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function resendCode() {
    setError([]);
    setIsResent(true);

    try {
      const { error: resendError } = await signUp.verifications.sendEmailCode();

      if (resendError) {
        const message =
          resendError?.longMessage ||
          resendError?.message ||
          "Something Went Wrong, Please Try again";
        setError((prev) => [...prev, message]);
      }
    } catch (err: any) {
      console.error("Unexpected Error:", err);
      setError((prev) => [...prev, "Something went wrong. Please try again."]);
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <View className="p-6 flex-1 justify-center max-w-md mx-auto w-full">
        {/* Header Section */}
        <View className="mb-8 items-center text-center">
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-brand-secondary font-header-bold text-3xl text-center">
              Verify Code
            </Text>
          </View>
          <Text className="font-body text-brand-muted text-center">
            Please enter the 5-digit code sent to your email.
          </Text>
          <Text className="font-body-semibold text-brand-primary mt-1">
            {email}
          </Text>
        </View>

        {/* Global Error Banner */}
        {error.length > 0 &&
          error.map((err, index) => (
            <View
              className="bg-brand-error/10 border border-brand-error/20 p-3 rounded-2xl mb-4 flex-row items-center justify-center"
              key={index}
            >
              <Text className="text-brand-error text-xs font-body-medium text-center">
                {err}
              </Text>
            </View>
          ))}

        {/* OTP Input Section */}
        <View className="my-4 items-center">
          <OtpInput
            ref={otpRef}
            numberOfDigits={6}
            focusColor="#84cc16"
            hideStick
            autoFocus
            onTextChange={(text) => (code.current = text)}
            onFilled={(text) => {
              code.current = text;
              verifyOTP();
            }}
            theme={{
              containerStyle: {
                width: "100%",
                gap: 12,
                justifyContent: "center",
              },
              pinCodeContainerStyle: {
                width: 52,
                height: 56,
                backgroundColor: "#ffffff",
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: "#e5e7eb",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              },
              pinCodeTextStyle: {
                fontSize: 22,
                fontFamily: "Inter_600SemiBold",
                color: "#1f2937",
              },
              focusedPinCodeContainerStyle: {
                borderColor: "#84cc16",
                backgroundColor: "#ffffff",
              },
              filledPinCodeContainerStyle: {
                borderColor: "#f59e0b",
                backgroundColor: "#ffffff",
              },
            }}
          />
        </View>

        {/* Action Button */}
        <View className="mt-6">
          <Button
            className="bg-brand-primary rounded-xl active:bg-brand-primary/80 flex-row justify-center items-center"
            size={"lg"}
            disabled={isSubmitting}
            onPress={verifyOTP}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-white font-header-bold text-base">
                Verify Code
              </Text>
            )}
          </Button>
        </View>

        {/* Resend Link */}
        <View className="flex-row justify-center items-center mt-8 gap-2">
          <Text className="text-brand-muted font-body text-sm">
            {isResent
              ? "The code has already sent"
              : "Didn't receive the code?"}
          </Text>

          {!isResent ? (
            <TouchableOpacity onPress={() => resendCode()}>
              <Text className="text-brand-secondary font-body-bold text-sm">
                Resend
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="ml-1 items-center justify-center">
              <CountdownCircleTimer
                size={24}
                strokeWidth={2}
                isPlaying
                duration={30}
                colors={["#84cc16", "#f59e0b", "#ef4444", "#ef4444"]}
                colorsTime={[30, 15, 5, 0]}
                onComplete={() => setIsResent(false)}
              >
                {({ remainingTime }) => (
                  <Text className="text-brand-muted text-[10px] font-body-semibold">
                    {remainingTime}
                  </Text>
                )}
              </CountdownCircleTimer>
            </View>
          )}
        </View>

        {/* Back option */}
        <View className="items-center mt-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-brand-muted font-body-semibold text-sm">
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
