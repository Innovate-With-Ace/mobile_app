import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { SignUpSchema } from "@/schema/SignUp";
import { SignUp as SignUpType } from "@/types/SignUp";
import { useSignUp } from "@clerk/expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const { signUp } = useSignUp();

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<SignUpType>({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function onSubmit(data: SignUpType) {
    clearErrors();
    setError([]);

    const result = SignUpSchema.safeParse(data);
    if (!result.success) return;

    setIsSubmitting(true);

    if (result.data.confirm_password !== result.data.password) {
      setError((prev) => [...prev, "Password must match"]);
      return;
    }
    try {
      const { error: SignUpErr } = await signUp.password({
        emailAddress: result.data.email,
        password: result.data.password,
      });

      if (SignUpErr) {
        const message =
          SignUpErr?.longMessage ||
          SignUpErr.message ||
          "Invalid email or password";
        setError((prev) => [...prev, message]);
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: () => router.replace("/(dashboard)"),
        });
        return;
      }

      if (signUp.status === "missing_requirements") {
        await signUp.verifications.sendEmailCode().then(() => {
          router.push({
            pathname: "/otp-verification",
            params: { email: result.data.email },
          });
        });
      }

      console.log(signUp.status);
    } catch (err: any) {
      console.error("Unexpected Error:", err);
      setError((prev) => [...prev, "Something went wrong. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="p-6 grow justify-center max-w-md mx-auto w-full"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="mb-8">
            <View className="flex-row items-center gap-2 mb-2">
              <Text className="text-brand-secondary font-header-bold text-3xl">
                Create Account
              </Text>
            </View>
            <Text className="font-body text-brand-muted text-sm">
              Join us today! Please fill in your details to get started.
            </Text>
          </View>

          {/* Form Section */}
          <View className="gap-4">
            {/* Email Field */}
            <View className="gap-1.5">
              <Label
                className="font-body-medium text-brand-muted text-xs uppercase tracking-wider"
                nativeID="email-label"
              >
                Email Address
              </Label>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="name@example.com"
                    className={`font-body bg-white rounded-xl px-4 border ${
                      errors.email ? "border-brand-error" : "border-neutral-200"
                    } focus:border-brand-primary`}
                    aria-labelledby="email-label"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-brand-error text-xs mt-0.5 ml-1 font-body">
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Password Field */}
            <View className="gap-1.5">
              <Label
                className="font-body-medium text-brand-muted text-xs uppercase tracking-wider"
                nativeID="password-label"
              >
                Password
              </Label>
              <View className="relative justify-center">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      placeholder="Create a password"
                      secureTextEntry={!showPassword}
                      className={`font-body bg-white rounded-xl pl-4 pr-12 border ${
                        errors.password
                          ? "border-brand-error"
                          : "border-neutral-200"
                      } focus:border-brand-primary`}
                      aria-labelledby="password-label"
                    />
                  )}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 py-2"
                >
                  <Text className="text-brand-muted font-body-semibold text-xs">
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-brand-error text-xs mt-0.5 ml-1 font-body">
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Confirm Password Field */}
            <View className="gap-1.5">
              <Label
                className="font-body-medium text-brand-muted text-xs uppercase tracking-wider"
                nativeID="confirm-password-label"
              >
                Confirm Password
              </Label>
              <View className="relative justify-center">
                <Controller
                  name="confirm_password"
                  control={control}
                  rules={{ required: "Confirm Password is required" }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      placeholder="Confirm your password"
                      secureTextEntry={!showConfirmPassword}
                      className={`font-body bg-white rounded-xl pl-4 pr-12 border ${
                        errors.confirm_password
                          ? "border-brand-error"
                          : "border-neutral-200"
                      } focus:border-brand-primary`}
                      aria-labelledby="confirm-password-label"
                    />
                  )}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 py-2"
                >
                  <Text className="text-brand-muted font-body-semibold text-xs">
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.confirm_password && (
                <Text className="text-brand-error text-xs mt-0.5 ml-1 font-body">
                  {errors.confirm_password.message}
                </Text>
              )}
            </View>

            {error.length > 0
              ? error.map((err, index) => (
                  <Text
                    key={index}
                    className="p-2 rounded-md bg-brand-error/10 text-brand-error mb-2 text-sm font-body"
                  >
                    {err}
                  </Text>
                ))
              : ""}

            {/* Submit Button */}
            <Button
              className="bg-brand-primary mt-4 rounded-xl shadow-sm flex-row justify-center items-center"
              size={"lg"}
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white font-header-bold text-base">
                Sign Up
              </Text>
            </Button>
          </View>

          {/* Divider Section */}
          <View className="flex-row items-center justify-between my-6 gap-4">
            <Separator className="flex-1 bg-neutral-200" />
            <Text className="text-brand-muted font-body-medium text-xs">
              Or sign up with
            </Text>
            <Separator className="flex-1 bg-neutral-200" />
          </View>

          {/* Social Auth */}
          <View>
            <Button
              variant="outline"
              className="border border-neutral-200 bg-white rounded-xl flex-row items-center justify-center gap-3 shadow-2xs"
              size={"lg"}
            >
              <Image
                source={require("../../assets/icons/google.png")}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-neutral-800 font-body-semibold text-sm">
                Google
              </Text>
            </Button>
          </View>

          {/* Footer Section */}
          <View className="flex-row justify-center items-center mt-8 gap-1.5">
            <Text className="text-brand-muted font-body text-sm">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-brand-secondary font-body-bold text-sm">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
