import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/Category";
import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "../ui/text";

interface Props {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryTabs({ categories, value, onChange }: Props) {
  const options = [{ id: "all", label: "All" }, ...categories];

  return (
    <View className="">
      <Tabs value={value} onValueChange={onChange} orientation="horizontal">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* gap-3 provides even spacing between the pill tabs */}
          <TabsList className="flex-row bg-transparent gap-1 h-auto">
            {options.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-5 min-h-11 h-11 rounded-xl bg-white shadow-sm active:bg-brand-surface"
              >
                <Text className="font-body-semibold text-brand-muted text-sm">
                  {category.label}
                </Text>
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollView>
      </Tabs>
    </View>
  );
}
