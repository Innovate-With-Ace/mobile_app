import CartFab from "@/components/dashboard/CartFab";
import CategoryTabs from "@/components/dashboard/CategoryTabs";
import DishDetailSheet from "@/components/dashboard/DishDetailSheet";
import Header from "@/components/dashboard/Header";
import MenuCard from "@/components/dashboard/MenuCard";
import SearchBar from "@/components/dashboard/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { MenuCardSkeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/text";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useApiQuery } from "@/hooks/useApiQuery";
import { getCategories, getDishes } from "@/lib/api";
import { Dish } from "@/types/Dish";
import { Frown, UtensilsCrossed } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const { addDish, getQuantity } = useCart();
  const { show } = useToast();

  const {
    data: dishes,
    loading: dishesLoading,
    refreshing,
    error,
    refresh,
  } = useApiQuery(getDishes);

  const { data: categories } = useApiQuery(getCategories);

  const filteredDishes = useMemo(() => {
    if (!dishes) return [];
    return dishes.filter((dish) => {
      const matchesCategory = category === "all" || dish.category_id === category;
      const matchesSearch = dish.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dishes, category, search]);

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
            categories={categories ?? []}
            value={category}
            onChange={setCategory}
          />
        </View>

        <View className="flex-1">
          {dishesLoading ? (
            <View className="flex-row flex-wrap justify-between gap-x-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <View key={i} className="w-[48%]">
                  <MenuCardSkeleton />
                </View>
              ))}
            </View>
          ) : error ? (
            <EmptyState
              icon={Frown}
              title="Couldn't load the menu"
              description={error}
              tone="error"
              actionLabel="Try again"
              onAction={refresh}
            />
          ) : (
            <FlatList
              data={filteredDishes}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperClassName="gap-4"
              showsVerticalScrollIndicator={false}
              contentContainerClassName="pb-24"
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refresh}
                  tintColor="#84cc16"
                />
              }
              ListEmptyComponent={
                <EmptyState
                  icon={UtensilsCrossed}
                  title="No dishes found"
                  description="Try a different search term or category."
                />
              }
              renderItem={({ item }) => (
                <MenuCard
                  name={item.name}
                  price={item.price}
                  image_url={item.image ?? ""}
                  isActiveOrderButton
                  isActiveViewButton
                  soldOut={!item.is_available || item.servings_left <= 0}
                  cartQuantity={getQuantity(item.id)}
                  onViewPress={() => setSelectedDish(item)}
                  onOrderPress={() => {
                    addDish(item, 1);
                    show(`Added ${item.name} to cart`);
                  }}
                />
              )}
            />
          )}
        </View>
      </View>

      <CartFab />

      <DishDetailSheet dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </SafeAreaView>
  );
};

export default Menu;
