import CategoryTabs from "@/components/dashboard/CategoryTabs";
import Header from "@/components/dashboard/Header";
import MenuCard from "@/components/dashboard/MenuCard";
import SearchBar from "@/components/dashboard/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useDishes } from "@/hooks/useDishes";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Skeleton placeholder mimicking the layout of MenuCard
function MenuCardSkeleton() {
  return (
    <View className="flex-1 bg-white rounded-2xl border border-neutral-100 p-3 mb-4 gap-3 shadow-2xs">
      <Skeleton className="w-full h-36 rounded-xl" />
      <View className="gap-2">
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <Skeleton className="h-5 w-1/3 rounded-md" />
      </View>
      <Skeleton className="h-10 w-full rounded-xl mt-1" />
    </View>
  );
}

const Menu = () => {
  const { data: dishes, isLoading, isError, refetch } = useDishes();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredDishes = dishes?.filter((dish) => {
    const matchesCategory =
      category.toLowerCase() === "all" || dish.category_id === category;

    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <Header screenName="Menu" />

      <View className="flex-1 bg-brand-bg p-4 gap-4">
        <View>
          <Text className="font-body-medium text-brand-muted/80">Our Food</Text>
          <Text className="text-brand-primary font-body-semibold text-xl">
            Cooked For You
          </Text>
        </View>

        <View>
          <SearchBar
            placeholder="Search foods here"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View>
          <CategoryTabs
            onCategoryChange={setCategory}
            selectedCategory={category}
          />
        </View>

        <View className="flex-1">
          {isLoading ? (
            /* Loading State: 2-column skeleton grid matching the layout */
            <FlatList
              data={[1, 2, 3, 4]}
              keyExtractor={(item) => item.toString()}
              numColumns={2}
              columnWrapperClassName="gap-4"
              renderItem={() => <MenuCardSkeleton />}
              showsVerticalScrollIndicator={false}
            />
          ) : isError ? (
            /* Error State */
            <View className="flex-1 items-center justify-center py-10 gap-2">
              <Text className="font-body-semibold text-neutral-800 text-base">
                Failed to load menu
              </Text>
              <Text className="font-body text-neutral-400 text-sm text-center px-6">
                Something went wrong fetching the dishes. Please check your
                connection.
              </Text>
            </View>
          ) : (
            /* Content State */
            <FlatList
              data={filteredDishes}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperClassName="gap-4"
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <MenuCard {...item} isActiveOrderButton isActiveViewButton />
              )}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-16 gap-1">
                  <Text className="font-body-bold text-neutral-700 text-base">
                    No food found
                  </Text>
                  <Text className="font-body text-neutral-400 text-sm text-center">
                    {search
                      ? `No items matching "${search}"`
                      : "There are no dishes available in this category."}
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
