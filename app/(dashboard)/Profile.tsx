import Header from "@/components/dashboard/Header";
import { Text } from "@/components/ui/text";
import {
  Bell,
  ChevronRight,
  Heart,
  History,
  LogOut,
  User,
} from "lucide-react-native";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
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
        showBorder ? "border-b border-neutral-50" : ""
      }`}
    >
      <View className="flex-row items-center gap-3">
        <View className="bg-brand-bg p-2 rounded-xl">
          <Icon size={20} color="#525252" strokeWidth={2.2} />
        </View>
        <Text className="font-body-medium text-neutral-800 text-base">
          {title}
        </Text>
      </View>
      <ChevronRight size={20} color="#d4d4d8" />
    </TouchableOpacity>
  );
}

// --- MAIN SCREEN ---
export default function ProfileScreen() {
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
              AC
            </Text>
          </View>
          <Text className="font-header-bold text-2xl text-neutral-800">
            Ace Cruz
          </Text>
          <Text className="font-body text-brand-muted text-sm mt-1">
            ace@email.com
          </Text>
        </View>

        {/* Account Section */}
        <View className="px-6 mb-6">
          <Text className="font-header-bold text-lg text-neutral-800 mb-3 mx-1">
            Account
          </Text>
          <View className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm">
            <MenuItem
              icon={User}
              title="Edit profile"
              onPress={() => console.log("Edit profile")}
            />
            <MenuItem
              icon={History}
              title="Order history"
              onPress={() => console.log("Order history")}
            />
            <MenuItem
              icon={Heart}
              title="Favorites"
              showBorder={false}
              onPress={() => console.log("Favorites")}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View className="px-6 mb-8">
          <Text className="font-header-bold text-lg text-neutral-800 mb-3 mx-1">
            Preferences
          </Text>
          <View className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm">
            <MenuItem
              icon={Bell}
              title="Notifications"
              showBorder={false}
              onPress={() => console.log("Notifications")}
            />
          </View>
        </View>

        {/* Sign Out Button */}
        <View className="px-6 pb-10">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log("Sign out")}
            className="flex-row items-center justify-center gap-2 bg-red-50 border border-red-100 py-4 rounded-2xl"
          >
            <LogOut size={18} color="#ef4444" strokeWidth={2.5} />
            <Text className="font-body-bold text-red-500 text-base">
              Sign out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
