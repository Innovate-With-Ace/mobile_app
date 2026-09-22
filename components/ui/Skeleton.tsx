import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export function Skeleton({ className }: { className?: string }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 650,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={{ opacity }}
      className={cn("bg-brand-border rounded-xl", className)}
    />
  );
}

export function MenuCardSkeleton() {
  return (
    <View className="flex-1 bg-white rounded-2xl border border-brand-border overflow-hidden mb-4">
      <Skeleton className="w-full h-36 rounded-none" />
      <View className="p-4 gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-11 w-full mt-1 rounded-xl" />
      </View>
    </View>
  );
}

export function OrderCardSkeleton() {
  return (
    <View className="bg-white p-4 rounded-2xl border border-brand-border mb-4 mx-4 gap-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </View>
  );
}
