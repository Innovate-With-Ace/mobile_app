import Header from "@/components/dashboard/Header";
import { Text } from "@/components/ui/text";
import { CheckCircle2, ChefHat, Clock, RefreshCw } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- MOCK DATA ---
const ACTIVE_ORDERS = [
  {
    id: "a3f9c2",
    status: "Preparing",
    items: "Adobo x2, Rice x2",
    price: 150,
    date: "Jul 26, 2:12 PM",
  },
  {
    id: "b7e21a",
    status: "Pending",
    items: "Sisig x1",
    price: 75,
    date: "Jul 26, 2:40 PM",
  },
];

const PAST_ORDERS = [
  {
    id: "c81f0d",
    status: "Completed",
    items: "Sinigang x1, Rice x1",
    price: 80,
    date: "Jul 24",
  },
];

// --- HELPER COMPONENT ---
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Pending":
      return (
        <View className="flex-row items-center gap-1 bg-amber-100 px-2.5 py-1 rounded-full">
          <Clock color="#d97706" size={12} strokeWidth={3} />
          <Text className="text-amber-700 text-[10px] font-body-bold uppercase tracking-wider">
            Pending
          </Text>
        </View>
      );
    case "Preparing":
      return (
        <View className="flex-row items-center gap-1 bg-blue-100 px-2.5 py-1 rounded-full">
          <ChefHat color="#1d4ed8" size={12} strokeWidth={2.5} />
          <Text className="text-blue-700 text-[10px] font-body-bold uppercase tracking-wider">
            Preparing
          </Text>
        </View>
      );
    case "Completed":
      return (
        <View className="flex-row items-center gap-1 bg-brand-primary/15 px-2.5 py-1 rounded-full">
          <CheckCircle2 color="#65a30d" size={12} strokeWidth={3} />
          <Text className="text-brand-primary text-[10px] font-body-bold uppercase tracking-wider">
            Completed
          </Text>
        </View>
      );
    default:
      return null;
  }
}

// --- MAIN SCREEN ---
export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  const currentData = activeTab === "active" ? ACTIVE_ORDERS : PAST_ORDERS;

  const renderOrderCard = ({ item }: { item: any }) => (
    <View className="bg-white p-4 rounded-3xl border border-neutral-100 shadow-sm mb-4 mx-6">
      {/* Card Header: Order ID & Status */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="font-body-medium text-brand-muted text-xs uppercase tracking-widest">
          Order #{item.id}
        </Text>
        <StatusBadge status={item.status} />
      </View>

      {/* Card Body: Items */}
      <Text className="font-header-bold text-neutral-800 text-base mb-3">
        {item.items}
      </Text>

      {/* Card Footer: Price, Date, and Reorder Button */}
      <View
        className={`flex-row items-center justify-between pt-3 border-t border-neutral-50 ${
          activeTab === "past" ? "pb-1" : ""
        }`}
      >
        <View className="flex-row items-center gap-2">
          <Text className="font-header-bold text-brand-primary text-base">
            ₱{item.price}
          </Text>
          <View className="w-1 h-1 bg-neutral-300 rounded-full" />
          <Text className="font-body text-brand-muted text-xs">
            {item.date}
          </Text>
        </View>

        {/* Reorder Button (Only on Past tab) */}
        {activeTab === "past" && (
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center gap-1.5 bg-brand-primary/10 px-3 py-1.5 rounded-lg"
            onPress={() => console.log("Reordering:", item.id)}
          >
            <RefreshCw color="#84cc16" size={14} strokeWidth={2.5} />
            <Text className="text-brand-primary font-body-bold text-xs">
              Reorder
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Screen Header */}
      <Header screenName="Your orders" />

      {/* Segmented Tab Control */}
      <View className="bg-brand-bg flex-1 gap-4">
        <View className="flex-row bg-neutral-200/60 p-1 rounded-xl mx-6 mb-4 mt-4">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setActiveTab("active")}
            className={`flex-1 py-2 items-center rounded-lg transition-all ${
              activeTab === "active" ? "bg-white shadow-2xs" : ""
            }`}
          >
            <Text
              className={`font-body-bold text-sm ${
                activeTab === "active" ? "text-neutral-800" : "text-brand-muted"
              }`}
            >
              Active
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setActiveTab("past")}
            className={`flex-1 py-2 items-center rounded-lg transition-all ${
              activeTab === "past" ? "bg-white shadow-2xs" : ""
            }`}
          >
            <Text
              className={`font-body-bold text-sm ${
                activeTab === "past" ? "text-neutral-800" : "text-brand-muted"
              }`}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        <FlatList
          data={currentData}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderCard}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-6"
          ListEmptyComponent={
            <View className="py-12 items-center justify-center">
              <Text className="font-body text-brand-muted text-sm">
                No orders found here yet.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
