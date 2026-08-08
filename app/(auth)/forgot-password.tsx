import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <View className="p-6 flex-1 justify-center max-w-md mx-auto w-full">
        {/* Header Section */}
        <View className="mb-8">
          <View className="flex-row items-center gap-3 mb-2">
            <Text className="text-brand-secondary font-header-bold text-3xl">
              Reset Password
            </Text>
          </View>
          <Text className="font-body text-brand-muted">
            Enter the email address associated with your account, and we'll send
            you a link or code to reset your password.
          </Text>
        </View>

        {/* Form Section */}
        <View className="gap-6">
          <View className="gap-2">
            <Label
              className="font-body-medium text-brand-muted"
              nativeID="email-label"
            >
              Email Address
            </Label>
            <Input
              placeholder="Enter your email"
              className="font-body focus:border-brand-primary"
              aria-labelledby="email-label"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Button
            className="bg-brand-primary mt-2 py-3 rounded-xl shadow-sm"
            size={"lg"}
            onPress={() => {
              // Handle password reset request logic here
              // Example: router.push("/(auth)/OTPVerification");
            }}
          >
            <Text className="text-white font-header-bold text-lg">
              Send Reset Instructions
            </Text>
          </Button>
        </View>

        {/* Back to Sign In Footer */}
        <View className="flex-row justify-center items-center mt-10 gap-1">
          <Text className="text-brand-muted font-body">
            Remembered your password?
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-brand-secondary font-body-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
