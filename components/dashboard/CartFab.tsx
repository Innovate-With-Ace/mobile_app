import { Text } from "@/components/ui/text";
import { useCart } from "@/context/CartContext";
import { router } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

export default function CartFab() {
  const { totalQuantity, totalPrice } = useCart();

  if (totalQuantity === 0) return null;

  return (
    <Pressable
      onPress={() => router.push("/cart")}
      className="absolute bottom-4 left-4 right-4 bg-brand-text rounded-2xl px-5 py-4 min-h-11 flex-row items-center justify-between shadow-lg active:opacity-90"
    >
      <View className="flex-row items-center gap-3">
        <View className="bg-brand-primary size-8 rounded-full items-center justify-center">
          <Text className="text-white font-header-bold text-xs">
            {totalQuantity}
          </Text>
        </View>
        <Text className="text-white font-body-bold text-sm">
          View cart
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        <Text className="text-white font-header-bold text-base">
          ₱{totalPrice}
        </Text>
        <ShoppingCart color="#84cc16" size={18} />
      </View>
    </Pressable>
  );
}
