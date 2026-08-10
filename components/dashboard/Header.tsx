import { Bell } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";

interface Props {
  screenName: string;
}

export default function Header({ screenName }: Props) {
  return (
    <View className="px-6 py-4 bg-white border-b border-neutral-100 shadow-sm relative">
      <View className="flex-row items-center justify-center">
        {/* Left Spacer (Keeps the center aligned properly) */}

        {/* Center Title */}
        <View className="flex-1 items-center justify-center">
          <Text className="font-header-bold text-lg text-neutral-800">
            {screenName}
          </Text>
        </View>

        {/* Actions Section (Aligned to the right) */}
        <View className="flex-row items-center justify-end absolute right-0">
          {/* Notification Bell */}
          <TouchableOpacity className="relative p-2.5 bg-neutral-50 border border-neutral-100 rounded-full active:bg-neutral-100">
            <Bell color="#4b5563" size={20} strokeWidth={2} />
            {/* Unread Badge Indicator */}
            <View className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-brand-error rounded-full border-2 border-white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
