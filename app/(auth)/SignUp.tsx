import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
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
  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="p-6 grow justify-start"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="mb-8">
            <View className="flex-row items-center gap-3">
              <Text className="text-brand-secondary font-header-bold text-3xl">
                Create Account
              </Text>
            </View>
            <View className="mt-2">
              <Text className="font-body text-brand-muted">
                Join us today! Please fill in your details.
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View className="gap-5">
            <View className="gap-2">
              <Label
                className="font-body-medium text-brand-muted"
                nativeID="email-label"
              >
                Email
              </Label>
              <Input
                placeholder="Enter your email"
                className="font-body focus:border-brand-primary"
                aria-labelledby="email-label"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View className="gap-2">
              <Label
                className="font-body-medium text-brand-muted"
                nativeID="password-label"
              >
                Password
              </Label>
              <Input
                placeholder="Create a password"
                secureTextEntry
                className="font-body focus:border-brand-primary"
                aria-labelledby="password-label"
              />
            </View>

            {/* Confirm Password */}
            <View className="gap-2">
              <Label
                className="font-body-medium text-brand-muted"
                nativeID="confirm-password-label"
              >
                Confirm Password
              </Label>
              <Input
                placeholder="Confirm your password"
                secureTextEntry
                className="font-body focus:border-brand-primary"
                aria-labelledby="confirm-password-label"
              />
            </View>

            <Button
              className="bg-brand-primary mt-2 py-3 rounded-xl shadow-sm p-2"
              size={"lg"}
            >
              <Text className="text-white font-header-bold text-lg">
                Sign Up
              </Text>
            </Button>
          </View>

          {/* Divider Section */}
          <View className="flex-row items-center justify-between my-8 gap-4">
            <Separator className="flex-1 bg-brand-muted/30" />
            <Text className="text-brand-muted font-body-medium text-sm">
              Or sign up with
            </Text>
            <Separator className="flex-1 bg-brand-muted/30" />
          </View>

          {/* Social Auth */}
          <View>
            <Button
              variant="outline"
              className="bg-white py-3 rounded-xl border-[1px]"
              style={{ borderColor: "#d4d4d8" }} // Neutral-300 fallback for reliable rendering
              size={"lg"}
            >
              <View className="flex-row items-center gap-2">
                <Image
                  source={require("../../assets/icons/google.png")}
                  className="size-6"
                  resizeMode="contain"
                />
                <Text className="text-black font-body-medium">Google</Text>
              </View>
            </Button>
          </View>

          {/* Footer Section */}
          <View className="flex-row justify-center items-center mt-20 mb-4 gap-1">
            <Text className="text-brand-muted font-body">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-brand-secondary font-body-bold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
