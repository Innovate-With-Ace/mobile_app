import Header from "@/components/dashboard/Header";
import { Text } from "@/components/ui/text";
import { useAuth, useUser } from "@clerk/expo";
import { router } from "expo-router";
import {
  Bell,
  ChevronRight,
  History,
  LogOut,
  ShieldCheck,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- HELPER COMPONENT ---
interface MenuItemProps {
  icon: React.ElementType;
  title: string;
  onPress: () => void;
  showBorder?: boolean;
}

function MenuItem({
  icon: Icon,
  title,
  onPress,
  showBorder = true,
}: MenuItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`flex-row items-center justify-between p-4 ${
        showBorder ? "border-b border-brand-border" : ""
      }`}
    >
      <View className="flex-row items-center gap-3">
        <View className="bg-brand-surface p-2 rounded-xl">
          <Icon size={20} color="#6b7280" strokeWidth={2.2} />
        </View>
        <Text className="font-body-medium text-brand-text text-base">
          {title}
        </Text>
      </View>
      <ChevronRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
}

// --- MAIN SCREEN ---
export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut, orgRole } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Staff Member";
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const roleLabel = orgRole === "org:admin" ? "Admin" : "Staff";

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      router.replace("/(auth)/SignIn");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Screen Header */}
      <Header screenName="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-brand-bg"
      >
        {/* Avatar Section */}
        <View className="items-center py-8">
          <View className="w-24 h-24 bg-brand-primary/15 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
            <Text className="font-header-bold text-3xl text-brand-primary tracking-widest">
              {initials || "S"}
            </Text>
          </View>
          <Text className="font-header-bold text-2xl text-brand-text">
            {fullName}
          </Text>
          {!!email && (
            <Text className="font-body text-brand-muted text-sm mt-1">
              {email}
            </Text>
          )}
          <View className="flex-row items-center gap-1.5 bg-brand-primary/10 px-3 py-1 rounded-full mt-2">
            <ShieldCheck size={12} color="#65a30d" strokeWidth={2.5} />
            <Text className="text-brand-primary font-body-bold text-[10px] uppercase tracking-wider">
              {roleLabel}
            </Text>
          </View>
        </View>

        {/* Account Section */}
        <View className="px-4 mb-6">
          <Text className="font-header-bold text-lg text-brand-text mb-3 mx-1">
            Account
          </Text>
          <View className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-sm">
            <MenuItem
              icon={User}
              title="Edit profile"
              onPress={() => console.log("Edit profile")}
            />
            <MenuItem
              icon={History}
              title="Order history"
              showBorder={false}
              onPress={() => router.push("/(dashboard)/Orders")}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View className="px-4 mb-8">
          <Text className="font-header-bold text-lg text-brand-text mb-3 mx-1">
            Preferences
          </Text>
          <View className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-sm">
            <MenuItem
              icon={Bell}
              title="Notifications"
              showBorder={false}
              onPress={() => console.log("Notifications")}
            />
          </View>
        </View>

        {/* Sign Out Button */}
        <View className="px-4 pb-10">
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={signingOut}
            onPress={handleSignOut}
            className="flex-row items-center justify-center gap-2 bg-white border border-brand-error py-4 rounded-2xl min-h-11 disabled:opacity-60"
          >
            {signingOut ? (
              <ActivityIndicator size="small" color="#ef4444" />
            ) : (
              <>
                <LogOut size={18} color="#ef4444" strokeWidth={2.5} />
                <Text className="font-body-bold text-brand-error text-base">
                  Sign out
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
