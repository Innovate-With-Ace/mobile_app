import React from "react";
import { Image, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export default function TodaySpecial() {
  return (
    <View className="bg-brand-primary p-5 rounded-md shadow-sm overflow-hidden my-2">
      <View className="flex-row items-center justify-between gap-4">
        {/* Left Info Section */}
        <View className="flex-1 items-start">
          {/* Dish Name */}
          <Text className="font-header-bold text-white text-xl leading-tight">
            Chicken Teriyaki
          </Text>

          {/* Price */}
          <Text className="font-header-bold text-white text-2xl my-2">
            ₱125
          </Text>

          {/* Action Button */}
          <Button
            className="bg-white rounded-sm py-2 px-5 shadow-2xs active:bg-neutral-100"
            size="sm"
            onPress={() => console.log("Order Special")}
          >
            <Text className="text-brand-primary font-body-bold text-sm">
              Order Now
            </Text>
          </Button>
        </View>

        {/* Right Image Container */}
        <View className="relative">
          <Image
            source={require("../../assets/dish/sample_dish.jpg")}
            className="size-24 rounded-sm border-2 border-white/20"
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}
