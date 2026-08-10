import { Plus } from "lucide-react-native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";

interface Props {
  image_url: string;
  name: string;
  price: number;
  isActiveOrderButton?: boolean;
  onPress?: () => void;
}

export default function MenuCard({
  image_url,
  name,
  price,
  isActiveOrderButton = true,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="flex-1 bg-white rounded-xl p-3 border border-neutral-100 shadow-xs mb-4"
    >
      {/* Dish Image */}
      <View className="w-full h-32 rounded-lg overflow-hidden bg-neutral-100 mb-3">
        <Image
          source={{ uri: image_url }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Content Section */}
      <View className="px-1">
        <Text
          className="font-header-bold text-neutral-800 text-sm mb-1"
          numberOfLines={1}
        >
          {name}
        </Text>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="font-header-bold text-brand-primary text-base">
            ₱{price}
          </Text>

          {isActiveOrderButton && (
            <TouchableOpacity
              className="bg-brand-primary p-2 rounded-xl active:bg-brand-primary/80"
              onPress={onPress}
            >
              <Plus color="#ffffff" size={16} strokeWidth={2.5} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
