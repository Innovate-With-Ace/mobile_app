import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Dish } from "@/types/Dish";
import { Minus, Plus, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  dish: Dish | null;
  onClose: () => void;
}

export default function DishDetailSheet({ dish, onClose }: Props) {
  const { addDish } = useCart();
  const { show } = useToast();
  const insets = useSafeAreaInsets();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [dish?.id]);

  if (!dish) return null;

  const soldOut = !dish.is_available || dish.servings_left <= 0;
  const lowStock = !soldOut && dish.servings_left <= 5;

  const handleAdd = () => {
    addDish(dish, quantity);
    show(`Added ${quantity} × ${dish.name} to cart`);
    onClose();
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-[rgba(17,24,39,0.5)] justify-end" onPress={onClose}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-white rounded-t-3xl overflow-hidden"
        >
          <View className="w-full h-52 bg-brand-surface relative">
            {dish.image ? (
              <Image
                source={{ uri: dish.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : null}
            <Pressable
              onPress={onClose}
              hitSlop={6}
              className="absolute right-4 top-4 bg-white/90 size-9 rounded-full items-center justify-center shadow-sm"
            >
              <X color="#111827" size={18} />
            </Pressable>
          </View>

          <View className="p-4 gap-4" style={{ paddingBottom: Math.max(insets.bottom, 16) + 12 }}>
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="font-header-bold text-brand-text text-xl">
                  {dish.name}
                </Text>
                <Text className="font-header-bold text-brand-primary text-lg mt-1">
                  ₱{dish.price}
                </Text>
              </View>

              {soldOut ? (
                <View className="bg-brand-error/10 px-3 py-1.5 rounded-full">
                  <Text className="text-brand-error font-body-bold text-xs uppercase">
                    Sold out
                  </Text>
                </View>
              ) : lowStock ? (
                <View className="bg-white border border-brand-error px-3 py-1.5 rounded-full">
                  <Text className="text-brand-error font-body-bold text-xs uppercase">
                    {dish.servings_left} left
                  </Text>
                </View>
              ) : (
                <View className="bg-brand-primary/10 px-3 py-1.5 rounded-full">
                  <Text className="text-brand-primary font-body-bold text-xs uppercase">
                    Available
                  </Text>
                </View>
              )}
            </View>

            {dish.ingredients && dish.ingredients.length > 0 && (
              <View className="gap-2">
                <Text className="font-body-semibold text-brand-muted text-xs uppercase tracking-wider">
                  Recipe
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {dish.ingredients.map((ing) => (
                    <View
                      key={ing.ingredient_id}
                      className="bg-brand-surface px-3 py-1.5 rounded-full"
                    >
                      <Text className="text-brand-muted font-body-medium text-xs">
                        {ing.quantity} units
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {!soldOut && (
              <View className="flex-row items-center justify-between mt-1">
                <Text className="font-body-semibold text-brand-muted text-sm">
                  Quantity
                </Text>
                <View className="flex-row items-center gap-4 bg-brand-surface rounded-full px-2 py-1">
                  <Pressable
                    onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                    hitSlop={6}
                    className="size-8 items-center justify-center rounded-full bg-white shadow-2xs"
                  >
                    <Minus size={16} color="#111827" />
                  </Pressable>
                  <Text className="font-header-bold text-brand-text text-base w-5 text-center">
                    {quantity}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setQuantity((q) => Math.min(dish.servings_left, q + 1))
                    }
                    hitSlop={6}
                    className="size-8 items-center justify-center rounded-full bg-white shadow-2xs"
                  >
                    <Plus size={16} color="#111827" />
                  </Pressable>
                </View>
              </View>
            )}

            <Button
              className={`rounded-2xl mt-2 ${
                soldOut ? "bg-brand-border" : "bg-brand-primary active:bg-brand-primary-pressed"
              }`}
              size="lg"
              disabled={soldOut}
              onPress={handleAdd}
            >
              <Text
                className={`font-body-bold text-base ${
                  soldOut ? "text-brand-muted-light" : "text-white"
                }`}
              >
                {soldOut ? "Unavailable" : `Add to cart · ₱${dish.price * quantity}`}
              </Text>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
