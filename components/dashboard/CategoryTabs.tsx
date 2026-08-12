import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategories } from "@/hooks/useCategories";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Text } from "../ui/text";

interface CategoryTabsProps {
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

export default function CategoryTabs({
  selectedCategory = "all",
  onCategoryChange,
}: CategoryTabsProps) {
  const { data: categories, isLoading, isError } = useCategories();

  const categoriesList = categories ?? [];
  const categoriesToRender = [{ id: "all", label: "All" }, ...categoriesList];

  if (isLoading) {
    return (
      <View className="py-3 items-center justify-center">
        <ActivityIndicator size="small" color="#84cc16" />
      </View>
    );
  }

  if (isError) return null;

  return (
    <View className="w-full py-1">
      <Tabs
        value={selectedCategory}
        onValueChange={onCategoryChange}
        orientation="horizontal"
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-1"
        >
          <TabsList className="flex-row bg-transparent gap-2">
            {categoriesToRender.map((cat) => {
              const catId = String(cat.id);
              const isActive = selectedCategory === catId;

              return (
                <TabsTrigger
                  key={catId}
                  value={catId}
                  className={`px-5 rounded-xl border shadow-2xs ${
                    isActive
                      ? "bg-brand-primary border-brand-primary"
                      : "bg-white border-neutral-100 active:bg-neutral-50"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      isActive
                        ? "font-body-bold text-white"
                        : "font-body-semibold text-neutral-700"
                    }`}
                  >
                    {cat.label}
                  </Text>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </ScrollView>
      </Tabs>
    </View>
  );
}
