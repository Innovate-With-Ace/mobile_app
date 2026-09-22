import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
      <ScrollView
        contentContainerClassName="p-4 grow justify-center max-w-md mx-auto w-full"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="mb-8">
          <View className="flex-row items-center gap-3 mb-2">
            <Text className="text-brand-text font-header-bold text-3xl">
              Reset Password
            </Text>
          </View>
          <Text className="font-body text-brand-muted">
            Enter the email address associated with your account, and we&apos;ll
            send you a link or code to reset your password.
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
              className="font-body rounded-xl focus:border-brand-primary"
              aria-labelledby="email-label"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Button
            className="bg-brand-primary mt-2 rounded-xl shadow-sm active:bg-brand-primary-pressed"
            size={"lg"}
            onPress={() => {
              // Handle password reset request logic here
              // Example: router.push("/(auth)/otp-verification");
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
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={10}
            className="min-h-11 justify-center"
          >
            <Text className="text-brand-primary font-body-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
