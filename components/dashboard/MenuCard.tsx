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
  soldOut?: boolean;
  cartQuantity?: number;
  onViewPress?: () => void;
  onOrderPress?: () => void;
}

export default function MenuCard({
  image_url,
  name,
  price,
  isActiveOrderButton = true,
  isActiveViewButton = true,
  soldOut = false,
  cartQuantity = 0,
  onViewPress,
  onOrderPress,
}: Props) {
  return (
    <View className="flex-1 bg-white rounded-2xl border border-brand-border shadow-sm mb-4 overflow-hidden">
      {/* Dish Image */}
      <View className="w-full h-36 bg-brand-surface relative">
        {isActiveViewButton && (
          <TouchableOpacity
            activeOpacity={0.85}
            // Circle shape with a translucent white background so it always stays visible
            hitSlop={6}
            className="absolute right-3 top-3 bg-white/90 size-8 rounded-full flex items-center justify-center shadow-sm z-10"
            onPress={onViewPress}
          >
            <Eye color="#84cc16" size={16} strokeWidth={2.5} />
          </TouchableOpacity>
        )}
        {cartQuantity > 0 && (
          <View className="absolute left-3 top-3 bg-brand-primary size-6 rounded-full items-center justify-center z-10">
            <Text className="text-white font-body-bold text-[11px]">
              {cartQuantity}
            </Text>
          </View>
        )}
        <Image
          source={{ uri: image_url }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {soldOut && (
          <View className="absolute inset-0 bg-black/40 items-center justify-center">
            <View className="bg-white/95 px-3 py-1 rounded-full">
              <Text className="font-body-bold text-brand-text text-[11px] uppercase tracking-wider">
                Sold out
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View className="p-3.5">
        <Text
          className="font-header-bold text-brand-text text-sm mb-1"
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
            disabled={soldOut}
            className={`min-h-11 rounded-xl flex-row items-center justify-center gap-2 shadow-2xs ${
              soldOut ? "bg-brand-border" : "bg-brand-primary active:bg-brand-primary-pressed"
            }`}
            onPress={onOrderPress}
          >
            {!soldOut && (
              <Image
                source={require("../../assets/icons/cart.png")}
                className="size-4"
                resizeMode="contain"
              />
            )}
            <Text
              className={`font-body-bold text-sm ${
                soldOut ? "text-brand-muted-light" : "text-white"
              }`}
            >
              {soldOut ? "Unavailable" : "Add To Cart"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
