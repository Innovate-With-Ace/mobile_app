import { Eye } from "lucide-react-native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";

interface Props {
  image_url: string;
  name: string;
  price: number;
  isActiveOrderButton?: boolean;
  isActiveViewButton?: boolean;
  onViewPress?: () => void;
  onOrderPress?: () => void;
}

export default function MenuCard({
  image_url,
  name,
  price,
  isActiveOrderButton = true,
  isActiveViewButton = true,
  onViewPress,
  onOrderPress,
}: Props) {
  return (
    <View className="flex-1 bg-white rounded-md border border-neutral-100 shadow-sm mb-4 overflow-hidden">
      {/* Dish Image */}
      <View className="w-full h-36 bg-neutral-50 relative">
        {isActiveViewButton && (
          <TouchableOpacity
            activeOpacity={0.85}
            // Circle shape with a translucent white background so it always stays visible
            className="absolute right-3 top-3 bg-white/90 size-8 rounded-full flex items-center justify-center shadow-sm z-10"
            onPress={onViewPress}
          >
            <Eye color="#84cc16" size={16} strokeWidth={2.5} />
          </TouchableOpacity>
        )}
        <Image
          source={{ uri: image_url }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Content Section */}
      <View className="p-3.5">
        <Text
          className="font-header-bold text-neutral-800 text-sm mb-1"
          numberOfLines={1}
        >
          {name}
        </Text>

        <Text className="font-header-bold text-brand-primary text-base mb-3">
          ₱{price}
        </Text>

        {isActiveOrderButton && (
          <TouchableOpacity
            activeOpacity={0.85}
            className="bg-brand-primary py-2.5 rounded-xl flex-row items-center justify-center gap-2 shadow-2xs"
            onPress={onOrderPress}
          >
            <Image
              source={require("../../assets/icons/cart.png")}
              className="size-4"
              resizeMode="contain"
            />
            <Text className="font-body-bold text-white text-sm">
              Add To Cart
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
