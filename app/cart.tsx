import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Text } from "@/components/ui/text";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ApiError, placeOrder } from "@/lib/api";
import { useAuth } from "@clerk/expo";
import { router } from "expo-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { items, totalPrice, totalQuantity, incrementItem, decrementItem, removeItem, clearCart } =
    useCart();
  const { getToken } = useAuth();
  const { show } = useToast();
  const [placing, setPlacing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setPlacing(true);
    try {
      const token = await getToken();
      await placeOrder(token, {
        source: "mobile",
        items: items.map((i) => ({
          item: { id: i.dishId, name: i.name },
          quantity: i.quantity,
        })),
      });
      clearCart();
      show("Order placed successfully");
      router.replace("/(dashboard)/Orders");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Could not place the order.";
      show(message, "error");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <View className="px-4 py-4 bg-white border-b border-brand-border flex-row items-center justify-between">
        <Text className="font-header-bold text-lg text-brand-text">
          Your Cart
        </Text>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="p-2.5 bg-brand-surface rounded-full active:bg-brand-border"
        >
          <X color="#111827" size={18} />
        </Pressable>
      </View>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add dishes from the menu to start a new order."
          actionLabel="Browse menu"
          onAction={() => router.replace("/(dashboard)/Menu")}
        />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.dishId}
            contentContainerClassName="p-4 gap-3"
            renderItem={({ item }) => (
              <View className="bg-white p-4 rounded-2xl border border-brand-border flex-row items-center gap-3">
                <View className="flex-1">
                  <Text
                    className="font-header-bold text-brand-text text-sm"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text className="font-body-medium text-brand-primary text-sm mt-0.5">
                    ₱{item.price} × {item.quantity} = ₱{item.price * item.quantity}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2 bg-brand-surface rounded-full px-1.5 py-1">
                  <Pressable
                    onPress={() => decrementItem(item.dishId)}
                    hitSlop={8}
                    className="size-7 items-center justify-center rounded-full bg-white shadow-2xs"
                  >
                    <Minus size={14} color="#111827" />
                  </Pressable>
                  <Text className="font-header-bold text-brand-text text-sm w-4 text-center">
                    {item.quantity}
                  </Text>
                  <Pressable
                    onPress={() => incrementItem(item.dishId)}
                    disabled={item.quantity >= item.servingsLeft}
                    hitSlop={8}
                    className="size-7 items-center justify-center rounded-full bg-white shadow-2xs disabled:opacity-40"
                  >
                    <Plus size={14} color="#111827" />
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => removeItem(item.dishId)}
                  hitSlop={8}
                  className="p-2 active:bg-brand-error/10 rounded-full"
                >
                  <Trash2 size={16} color="#ef4444" />
                </Pressable>
              </View>
            )}
          />

          <View className="p-4 pb-6 bg-white border-t border-brand-border gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-body-medium text-brand-muted text-sm">
                {totalQuantity} item{totalQuantity > 1 ? "s" : ""}
              </Text>
              <Text className="font-header-bold text-brand-text text-xl">
                ₱{totalPrice}
              </Text>
            </View>
            <Button
              className="bg-brand-primary rounded-2xl active:bg-brand-primary-pressed"
              size="lg"
              disabled={placing}
              onPress={handleCheckout}
            >
              {placing ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text className="text-white font-body-bold text-base">
                  Place order
                </Text>
              )}
            </Button>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
