import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <View className="p-6 flex-1 justify-start">
        {/* Header Section */}
        <View className="mb-10">
          <View className="flex-row items-center gap-3">
            <Text className="text-brand-secondary font-header-bold text-3xl">
              Welcome Back
            </Text>
            <Image
              source={require("../../assets/icons/hand.png")}
              className="size-8"
              resizeMode="contain"
            />
          </View>
          <View className="mt-2">
            <Text className="font-body text-brand-muted">
              Sign in to your account
            </Text>
          </View>
        </View>

        {/* Form Section */}
        <View className="gap-6">
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

          <View className="gap-2">
            <Label
              className="font-body-medium text-brand-muted"
              nativeID="password-label"
            >
              Password
            </Label>
            <Input
              placeholder="Enter your password"
              secureTextEntry
              className="font-body focus:border-brand-primary"
              aria-labelledby="password-label"
            />
            <TouchableOpacity className="self-end mt-1">
              <Text className="text-brand-primary font-body-semibold text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            className="bg-brand-primary mt-4 rounded-xl shadow-sm"
            size={"lg"}
          >
            <Text className="text-white font-header-bold text-base">Login</Text>
          </Button>
        </View>

        {/* Divider Section */}
        <View className="flex-row items-center justify-between my-8 gap-4">
          <Separator className="flex-1 bg-brand-muted/30" />
          <Text className="text-brand-muted font-body-medium text-sm">
            Or log in with
          </Text>
          <Separator className="flex-1 bg-brand-muted/30" />
        </View>

        <View>
          <Button
            className="border border-neutral-300 bg-white py-3 rounded-xl p-2"
            size={"lg"}
          >
            <View className="flex-row items-center gap-2">
              <Image
                source={require("../../assets/icons/google.png")}
                className="size-6"
              />
              <Text className="text-black font-body-medium">Google</Text>
            </View>
          </Button>
        </View>

        {/* Footer Section */}
        <View className="flex-row justify-center items-center gap-1 mt-20">
          <Text className="text-brand-muted font-body">
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/SignUp")}>
            <Text className="text-brand-secondary font-body-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
