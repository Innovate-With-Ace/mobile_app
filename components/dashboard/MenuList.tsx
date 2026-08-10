import React from "react";
import { View } from "react-native";
import MenuCard from "./MenuCard";

export const MOCK_DATA = [
  {
    id: "1",
    name: "Chicken Teriyaki",
    price: 125,
    image_url:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
  },
  {
    id: "2",
    name: "Sizzling Pork Sisig",
    price: 165,
    image_url:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80",
  },
  {
    id: "3",
    name: "Beef Gyudon Bowl",
    price: 180,
    image_url:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
  },
  {
    id: "4",
    name: "Crispy Lechon Kawali",
    price: 195,
    image_url:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80",
  },
  {
    id: "5",
    name: "Chicken Inasal Special",
    price: 140,
    image_url:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=80",
  },
  {
    id: "6",
    name: "Pork Tonkatsu Set",
    price: 175,
    image_url:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
  },
  {
    id: "7",
    name: "Salmon Aburi Rice",
    price: 220,
    image_url:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80",
  },
  {
    id: "8",
    name: "Classic Beef Pares",
    price: 95,
    image_url:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
  },
  {
    id: "9",
    name: "Creamy Carbonara",
    price: 135,
    image_url:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&q=80",
  },
  {
    id: "10",
    name: "Spam & Egg Musubi",
    price: 85,
    image_url:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80",
  },
];

const listToRender = MOCK_DATA.slice(0, 4);

export default function MenuList() {
  return (
    <View className="flex-row flex-wrap justify-between gap-y-4">
      {listToRender.map((item) => (
        <View key={item.id} className="w-[48%]">
          <MenuCard
            image_url={item.image_url}
            name={item.name}
            price={item.price}
            isActiveOrderButton={false}
          />
        </View>
      ))}
    </View>
  );
}
