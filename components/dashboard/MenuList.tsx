import React from "react";
import { View } from "react-native";
import MenuCard from "./MenuCard";

import { useDishes } from "@/hooks/useDishes";

export default function MenuList() {
  const { data: dishes, isLoading, isError } = useDishes();

  if (isLoading) {
    return null;
  }

  const listToRender = dishes?.slice(0, 4);

  return (
    <View className="flex-row flex-wrap justify-between gap-y-4">
      {listToRender!.map((item) => (
        <View key={item.id} className="w-[48%]">
          <MenuCard
            image_url={item.image ?? ""}
            name={item.name}
            price={item.price}
            isActiveOrderButton={false}
          />
        </View>
      ))}
    </View>
  );
}
