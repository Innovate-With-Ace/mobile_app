import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OTPVerification() {
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
            Please enter the 5-digit code sent to your email/phone.
          </Text>
          <Text className="font-body-semibold text-brand-primary mt-1">
            example@email.com
          </Text>
        </View>

        {/* OTP Input Section */}
        <View className="my-4 items-center">
          <OtpInput
            numberOfDigits={5}
            focusColor="#84cc16"
            hideStick
            autoFocus
            onTextChange={(text) => console.log(text)}
            onFilled={(text) => console.log(`OTP is ${text}`)}
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
                borderColor: "#e5e7eb", // clean subtle border
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
            className="bg-brand-primary py-3 rounded-xl active:bg-brand-primary/80"
            size={"lg"}
            onPress={() => {
              // Handle verification action here
            }}
          >
            <Text className="text-white font-header-bold text-base">
              Verify Code
            </Text>
          </Button>
        </View>

        {/* Resend Link */}
        <View className="flex-row justify-center items-center mt-8 gap-1">
          <Text className="text-brand-muted font-body text-sm">
            Didn't receive the code?
          </Text>
          <TouchableOpacity onPress={() => console.log("Resend code")}>
            <Text className="text-brand-secondary font-body-bold text-sm">
              Resend
            </Text>
          </TouchableOpacity>
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
