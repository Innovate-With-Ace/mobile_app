import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { LoginSchema } from "@/schema/Login";
import { Login } from "@/types/Login";
import { useSignIn } from "@clerk/expo";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn } = useSignIn();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: Login) {
    clearErrors();
    setError(null);

    const result = LoginSchema.safeParse(data);
    if (!result.success) return;

    setIsSubmitting(true);

    try {
      const { error: signInError } = await signIn.password({
        emailAddress: result.data.email,
        password: result.data.password,
      });

      if (signInError) {
        console.error("Clerk Error:", signInError);
        const message =
          signInError?.longMessage ||
          signInError?.message ||
          "Invalid email or password";
        setError(message);
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: () => router.replace("/(dashboard)"),
        });
      }
    } catch (err: any) {
      console.error("Unexpected Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <View className="p-6 flex-1 justify-center w-full">
        {/* Header Section */}
        <View className="mb-8">
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-brand-secondary font-header-bold text-3xl">
              Welcome Back
            </Text>
            <Image
              source={require("../../assets/icons/hand.png")}
              className="w-7 h-7"
              resizeMode="contain"
            />
          </View>
          <Text className="font-body text-brand-muted text-sm">
            Sign in to access your dashboard and continue where you left off.
          </Text>
        </View>

        {/* Global Error Banner */}
        {error && (
          <View className="bg-brand-error/10 border border-brand-error/20 p-3 rounded-2xl mb-6 flex-row items-center justify-center">
            <Text className="text-brand-error text-xs font-body-medium text-center">
              {error}
            </Text>
          </View>
        )}

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
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="name@example.com"
                  className={`font-body bg-white rounded-xl border ${
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
                control={control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    className={`font-body bg-white rounded-xl pr-12 border ${
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

            <TouchableOpacity
              onPress={() => router.push("/(auth)/ForgotPassword")}
              className="self-end mt-1.5"
            >
              <Text className="text-brand-primary font-body-semibold text-xs">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <Button
            className="bg-brand-primary mt-4 rounded-xl shadow-sm flex-row justify-center items-center"
            size={"lg"}
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-white font-header-bold text-base">
                Sign In
              </Text>
            )}
          </Button>
        </View>

        {/* Divider Section */}
        <View className="flex-row items-center justify-between my-6 gap-4">
          <Separator className="flex-1 bg-neutral-200" />
          <Text className="text-brand-muted font-body-medium text-xs">
            Or continue with
          </Text>
          <Separator className="flex-1 bg-neutral-200" />
        </View>

        {/* Social Provider */}
        <View>
          <Button
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
        <View className="flex-row justify-center items-center gap-1.5 mt-8">
          <Text className="text-brand-muted font-body text-sm">
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/SignUp")}>
            <Text className="text-brand-secondary font-body-bold text-sm">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
