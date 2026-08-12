import CategoryTabs from "@/components/dashboard/CategoryTabs";
import Header from "@/components/dashboard/Header";
import MenuCard from "@/components/dashboard/MenuCard";
import SearchBar from "@/components/dashboard/SearchBar";
import { Text } from "@/components/ui/text";
import { useDishes } from "@/hooks/useDishes";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  const { data: dishes, isLoading, isError } = useDishes();
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
          <SearchBar placeholder="Search foods here" />
        </View>

        <View>
          <CategoryTabs />
        </View>

        <View className="flex-1">
          <FlatList
            data={dishes}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperClassName="gap-4"
            renderItem={({ item }) => (
              <MenuCard {...item} isActiveOrderButton isActiveViewButton />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
