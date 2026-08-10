import CategoryTabs from "@/components/dashboard/CategoryTabs";
import Header from "@/components/dashboard/Header";
import MenuCard from "@/components/dashboard/MenuCard";
import SearchBar from "@/components/dashboard/SearchBar";
import { Text } from "@/components/ui/text";
import { Dish } from "@/types/Dish";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const MOCK_DISHES: Dish[] = [
  {
    id: "1",
    name: "Chicken Teriyaki",
    price: 125,
    servings: 50,
    servings_left: 12,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    category_id: "cat_japanese",
    is_available: true,
    ingredients: [
      { ingredient_id: "ing_chicken_thigh", quantity: 200 },
      { ingredient_id: "ing_teriyaki_sauce", quantity: 50 },
      { ingredient_id: "ing_rice", quantity: 150 },
    ],
  },
  {
    id: "2",
    name: "Sizzling Pork Sisig",
    price: 165,
    servings: 40,
    servings_left: 5,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80",
    category_id: "cat_filipino",
    is_available: true,
    ingredients: [
      { ingredient_id: "ing_pork_mask", quantity: 250 },
      { ingredient_id: "ing_onion", quantity: 30 },
      { ingredient_id: "ing_calamansi", quantity: 10 },
    ],
  },
  {
    id: "3",
    name: "Beef Gyudon Bowl",
    price: 180,
    servings: 30,
    servings_left: 0,
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
    category_id: "cat_japanese",
    is_available: false, // Sold out example
    ingredients: [
      { ingredient_id: "ing_beef_strips", quantity: 150 },
      { ingredient_id: "ing_rice", quantity: 150 },
      { ingredient_id: "ing_onion", quantity: 40 },
    ],
  },
  {
    id: "4",
    name: "Crispy Lechon Kawali",
    price: 195,
    servings: 25,
    servings_left: 8,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80",
    category_id: "cat_filipino",
    is_available: true,
    ingredients: [
      { ingredient_id: "ing_pork_belly", quantity: 300 },
      { ingredient_id: "ing_cooking_oil", quantity: 50 },
    ],
  },
  {
    id: "5",
    name: "Chicken Inasal Special",
    price: 140,
    servings: 60,
    servings_left: 45,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=80",
    category_id: "cat_filipino",
    is_available: true,
    ingredients: [
      { ingredient_id: "ing_chicken_leg", quantity: 250 },
      { ingredient_id: "ing_annatto_oil", quantity: 15 },
    ],
  },
  {
    id: "6",
    name: "Pork Tonkatsu Set",
    price: 175,
    servings: 35,
    servings_left: 18,
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
    category_id: "cat_japanese",
    is_available: true,
    ingredients: [
      { ingredient_id: "ing_pork_loin", quantity: 200 },
      { ingredient_id: "ing_panko", quantity: 50 },
      { ingredient_id: "ing_cabbage", quantity: 80 },
    ],
  },
  {
    id: "7",
    name: "Salmon Aburi Rice",
    price: 220,
    servings: 20,
    servings_left: 2,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80",
    category_id: "cat_japanese",
    is_available: true,
    ingredients: [
      { ingredient_id: "ing_salmon_fillet", quantity: 120 },
      { ingredient_id: "ing_japanese_mayo", quantity: 20 },
      { ingredient_id: "ing_rice", quantity: 150 },
    ],
  },
  {
    id: "8",
    name: "Classic Beef Pares",
    price: 95,
    servings: 80,
    servings_left: 55,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
    category_id: "cat_filipino",
    is_available: true,
    ingredients: [
      { ingredient_id: "ing_beef_brisket", quantity: 150 },
      { ingredient_id: "ing_star_anise", quantity: 5 },
      { ingredient_id: "ing_garlic_rice", quantity: 150 },
    ],
  },
  {
    id: "9",
    name: "Creamy Carbonara",
    price: 135,
    servings: 40,
    servings_left: 22,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&q=80",
    category_id: "cat_pasta",
    is_available: true,
    ingredients: [
      { ingredient_id: "ing_spaghetti", quantity: 150 },
      { ingredient_id: "ing_bacon", quantity: 50 },
      { ingredient_id: "ing_heavy_cream", quantity: 80 },
    ],
  },
  {
    id: "10",
    name: "Spam & Egg Musubi",
    price: 85,
    servings: 100,
    servings_left: 100,
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80",
    category_id: "cat_snacks",
    is_available: true,
    ingredients: [
      { ingredient_id: "ing_spam", quantity: 50 },
      { ingredient_id: "ing_egg", quantity: 50 },
      { ingredient_id: "ing_nori", quantity: 5 },
      { ingredient_id: "ing_rice", quantity: 100 },
    ],
  },
];
const Menu = () => {
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
            data={MOCK_DISHES}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperClassName="gap-4"
            renderItem={({ item }) => (
              <MenuCard
                {...item}
                image_url={item.image ?? ""}
                isActiveOrderButton
                isActiveViewButton
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
