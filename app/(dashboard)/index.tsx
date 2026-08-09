import Header from "@/components/dashboard/Header";
import { useAuth } from "@clerk/expo";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <Header />
      <View className="flex-1 bg-brand-bg p-4"></View>
    </SafeAreaView>
  );
}
