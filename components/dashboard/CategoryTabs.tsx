import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "../ui/text";

export default function CategoryTabs() {
  const categories = ["All", "Trending", "Favorites", "Newest", "Popular"];

  return (
    <View className="">
      <Tabs
        defaultValue="All"
        onValueChange={(val) => console.log(val)}
        orientation="horizontal"
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* gap-3 provides even spacing between the pill tabs */}
          <TabsList className="flex-row bg-transparent gap-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-5 rounded-md bg-white shadow-sm active:bg-neutral-50"
              >
                <Text className="font-body-semibold text-neutral-700 text-sm">
                  {category}
                </Text>
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollView>
      </Tabs>
    </View>
  );
}
