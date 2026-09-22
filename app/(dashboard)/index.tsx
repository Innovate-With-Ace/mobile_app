import Header from "@/components/dashboard/Header";
import MenuCard from "@/components/dashboard/MenuCard";
import SearchBar from "@/components/dashboard/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { MenuCardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/text";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useApiQuery } from "@/hooks/useApiQuery";
import { getDishes, getLowStockIngredients } from "@/lib/api";
import { useAuth } from "@clerk/expo";
import { router } from "expo-router";
import { AlertTriangle, Frown } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const { orgRole } = useAuth();
  const isAdmin = orgRole === "org:admin";
  const { addDish, getQuantity } = useCart();
  const { show } = useToast();

  const {
    data: dishes,
    loading,
    refreshing,
    error,
    refresh,
  } = useApiQuery(getDishes);

  const { data: lowStock } = useApiQuery(
    (token) => (isAdmin ? getLowStockIngredients(token) : Promise.resolve([])),
    [isAdmin]
  );

  const topSeller = useMemo(() => {
    if (!dishes || dishes.length === 0) return null;
    return [...dishes].sort(
      (a, b) => b.servings - b.servings_left - (a.servings - a.servings_left)
    )[0];
  }, [dishes]);

  const featured = useMemo(() => {
    if (!dishes) return [];
    const q = search.toLowerCase();
    return dishes
      .filter((d) => d.id !== topSeller?.id)
      .filter((d) => d.name.toLowerCase().includes(q))
      .slice(0, 4);
  }, [dishes, search, topSeller]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="#84cc16" />
        }
      >
        <Header screenName="Home" />
        <View className="flex-1 bg-brand-bg p-4 gap-4">
          <View>
            <SearchBar
              placeholder="Search foods here"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {isAdmin && lowStock && lowStock.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/(dashboard)/Menu")}
              className="flex-row items-center gap-3 bg-brand-surface border border-brand-error rounded-2xl p-4 min-h-11"
            >
              <View className="bg-white size-9 rounded-full items-center justify-center border border-brand-border">
                <AlertTriangle color="#ef4444" size={18} />
              </View>
              <View className="flex-1">
                <Text className="font-body-bold text-brand-text text-sm">
                  {lowStock.length} ingredient{lowStock.length > 1 ? "s" : ""} running low
                </Text>
                <Text className="font-body text-brand-muted text-xs" numberOfLines={1}>
                  {lowStock.map((i) => i.name).join(", ")}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Today's Special */}
          <View>
            <View>
              <Text className="text-lg text-brand-text font-header-bold uppercase tracking-wider">
                Today&apos;s Top Seller
              </Text>
            </View>

            {loading ? (
              <Skeleton className="w-full h-32 rounded-2xl mt-2" />
            ) : error ? (
              <EmptyState icon={Frown} title="Couldn't load the menu" description={error} tone="error" actionLabel="Try again" onAction={refresh} />
            ) : topSeller ? (
              <View className="bg-brand-primary p-5 rounded-2xl shadow-sm overflow-hidden my-2 flex-row items-center justify-between gap-4">
                <View className="flex-1 items-start">
                  <Text className="font-header-bold text-white text-xl leading-tight">
                    {topSeller.name}
                  </Text>
                  <Text className="font-header-bold text-white text-2xl my-2">
                    ₱{topSeller.price}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    className="bg-white rounded-xl py-2.5 px-5 shadow-2xs active:bg-brand-surface min-h-11 justify-center"
                    disabled={!topSeller.is_available || topSeller.servings_left <= 0}
                    onPress={() => {
                      addDish(topSeller, 1);
                      show(`Added ${topSeller.name} to cart`);
                    }}
                  >
                    <Text className="text-brand-primary font-body-bold text-sm">
                      {topSeller.is_available && topSeller.servings_left > 0
                        ? "Order Now"
                        : "Sold Out"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <EmptyState icon={Frown} title="No dishes yet" description="Dishes you add will appear here." />
            )}
          </View>

          <View>
            <View>
              <Text className="text-lg text-brand-text font-header-bold uppercase tracking-wider">
                Featured
              </Text>

              <View className="flex-row flex-wrap justify-between gap-y-4 mt-2">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <View key={i} className="w-[48%]">
                      <MenuCardSkeleton />
                    </View>
                  ))
                ) : featured.length === 0 ? (
                  <EmptyState icon={Frown} title="No matching dishes" />
                ) : (
                  featured.map((item) => (
                    <View key={item.id} className="w-[48%]">
                      <MenuCard
                        image_url={item.image ?? ""}
                        name={item.name}
                        price={item.price}
                        soldOut={!item.is_available || item.servings_left <= 0}
                        cartQuantity={getQuantity(item.id)}
                        isActiveOrderButton
                        isActiveViewButton={false}
                        onOrderPress={() => {
                          addDish(item, 1);
                          show(`Added ${item.name} to cart`);
                        }}
                      />
                    </View>
                  ))
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
