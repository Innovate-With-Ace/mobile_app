import { Bell, User } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";

export default function Header() {
  return (
    <View className="px-6 py-4 bg-white border-b border-neutral-100 shadow-sm">
      <View className="flex-row items-center justify-between">
        {/* Greetings Section */}
        <View className="flex-1">
          <Text className="font-body-medium text-brand-muted text-xs uppercase tracking-wider mb-1">
            Good Morning
          </Text>
          <Text className="font-header-bold text-2xl text-neutral-800">
            Hello, Ace 👋
          </Text>
        </View>

        {/* Actions Section */}
        <View className="flex-row items-center gap-3">
          {/* Notification Bell */}
          <TouchableOpacity className="relative p-2.5 bg-neutral-50 border border-neutral-100 rounded-full active:bg-neutral-100">
            <Bell color="#4b5563" size={20} strokeWidth={2} />
            {/* Unread Badge Indicator */}
            <View className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-brand-error rounded-full border-2 border-white" />
          </TouchableOpacity>

          {/* User Avatar Placeholder */}
          <TouchableOpacity className="p-2.5 bg-brand-primary/10 border border-brand-primary/20 rounded-full active:bg-brand-primary/20">
            {/* Matched to your brand theme color based on previous inputs */}
            <User color="#84cc16" size={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
