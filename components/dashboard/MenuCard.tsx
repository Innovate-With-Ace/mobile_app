import { Eye, Soup } from "lucide-react-native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { Text } from "../ui/text";

interface Props {
  image_url?: string | null;
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
  // Format price cleanly into PHP currency
  const formattedPrice = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(price);

  return (
    <View className="flex-1 bg-white rounded-2xl border border-neutral-100 shadow-sm mb-4 overflow-hidden">
      {/* Dish Image / Preview Section */}
      <View className="w-full h-36 bg-neutral-100 relative items-center justify-center">
        {isActiveViewButton && (
          <TouchableOpacity
            activeOpacity={0.8}
            className="absolute right-3 top-3 bg-white/90 w-8 h-8 rounded-full items-center justify-center shadow-sm z-10"
            onPress={onViewPress}
          >
            <Eye color="#84cc16" size={16} strokeWidth={2.5} />
          </TouchableOpacity>
        )}

        {image_url ? (
          <Image
            source={{ uri: image_url }}
            accessibilityLabel={name}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center bg-neutral-50">
            <Soup size={32} color="#a3a3a3" strokeWidth={1.5} />
            <Text className="text-[10px] font-body text-neutral-400 mt-1">
              No preview
            </Text>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View className="p-3.5 flex-col justify-between flex-1">
        <View>
          <Text
            className="font-header-bold text-neutral-800 text-sm mb-0.5"
            numberOfLines={1}
          >
            {name}
          </Text>

          <Text className="font-header-bold text-brand-primary text-base mb-3">
            {formattedPrice}
          </Text>
        </View>

        {isActiveOrderButton && (
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-brand-primary py-2.5 rounded-xl flex-row items-center justify-center gap-2"
            onPress={onOrderPress}
          >
            <Image
              source={require("../../assets/icons/cart.png")}
              className="w-4 h-4"
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
