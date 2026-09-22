import Header from "@/components/dashboard/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { OrderCardSkeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/text";
import { useApiQuery } from "@/hooks/useApiQuery";
import { getOrders } from "@/lib/api";
import { Order, OrderStatus } from "@/types/Order";
import { useUser } from "@clerk/expo";
import { CheckCircle2, ChefHat, Clock, Frown, ReceiptText, XCircle } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Status is conveyed by icon shape + label, not color alone, since the
// palette only has one accent + destructive — pending/preparing can't be
// told apart by color the way amber/blue badges used to.
function StatusBadge({ status }: { status: OrderStatus }) {
  switch (status) {
    case "pending":
      return (
        <View className="flex-row items-center gap-1 bg-brand-surface border border-brand-border px-2.5 py-1 rounded-full">
          <Clock color="#6b7280" size={12} strokeWidth={3} />
          <Text className="text-brand-muted text-[10px] font-body-bold uppercase tracking-wider">
            Pending
          </Text>
        </View>
      );
    case "preparing":
      return (
        <View className="flex-row items-center gap-1 bg-white border border-brand-primary px-2.5 py-1 rounded-full">
          <ChefHat color="#65a30d" size={12} strokeWidth={2.5} />
          <Text className="text-brand-primary-pressed text-[10px] font-body-bold uppercase tracking-wider">
            Preparing
          </Text>
        </View>
      );
    case "completed":
      return (
        <View className="flex-row items-center gap-1 bg-brand-primary px-2.5 py-1 rounded-full">
          <CheckCircle2 color="#ffffff" size={12} strokeWidth={3} />
          <Text className="text-white text-[10px] font-body-bold uppercase tracking-wider">
            Completed
          </Text>
        </View>
      );
    case "cancelled":
      return (
        <View className="flex-row items-center gap-1 bg-white border border-brand-error px-2.5 py-1 rounded-full">
          <XCircle color="#ef4444" size={12} strokeWidth={3} />
          <Text className="text-brand-error text-[10px] font-body-bold uppercase tracking-wider">
            Cancelled
          </Text>
        </View>
      );
  }
}

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const { user } = useUser();

  const { data: orders, loading, refreshing, error, refresh } = useApiQuery(getOrders);

  // The backend has no "mine only" filter on GET /api/orders yet (it returns
  // every order in the system), so this only hides other people's orders from
  // the UI — it does not stop them from reaching the device. Ordering people
  // should not be able to see, let alone act on, each other's orders; that
  // needs a server-side fix (filter by the authenticated user, or a
  // customer_id column), not a client-side one.
  const myOrders = useMemo(
    () => (orders ?? []).filter((o) => o.cashier_id === user?.id),
    [orders, user?.id]
  );

  const activeOrders = useMemo(
    () => myOrders.filter((o) => o.status === "pending" || o.status === "preparing"),
    [myOrders]
  );
  const pastOrders = useMemo(
    () => myOrders.filter((o) => o.status === "completed" || o.status === "cancelled"),
    [myOrders]
  );

  const currentData = activeTab === "active" ? activeOrders : pastOrders;

  const renderOrderCard = ({ item }: { item: Order }) => {
    const itemsSummary = item.items.map((i) => `${i.name} x${i.quantity}`).join(", ");
    const total = item.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
      <View className="bg-white p-4 rounded-2xl border border-brand-border shadow-sm mb-4 mx-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="font-body-medium text-brand-muted text-xs uppercase tracking-widest">
            Order #{item.id.slice(0, 6)}
          </Text>
          <StatusBadge status={item.status} />
        </View>

        <Text className="font-header-bold text-brand-text text-base mb-3">
          {itemsSummary || "No items"}
        </Text>

        <View className="flex-row items-center justify-between pt-3 border-t border-brand-border">
          <View className="flex-row items-center gap-2">
            <Text className="font-header-bold text-brand-primary text-base">₱{total}</Text>
            <View className="w-1 h-1 bg-brand-muted-light rounded-full" />
            <Text className="font-body text-brand-muted text-xs">
              {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <Header screenName="Orders" />

      <View className="bg-brand-bg flex-1 gap-4">
        <View className="flex-row bg-brand-surface p-1 rounded-xl mx-4 mb-4 mt-4">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setActiveTab("active")}
            className={`flex-1 py-3 items-center justify-center rounded-lg min-h-11 ${
              activeTab === "active" ? "bg-white shadow-2xs" : ""
            }`}
          >
            <Text
              className={`font-body-bold text-sm ${
                activeTab === "active" ? "text-brand-text" : "text-brand-muted"
              }`}
            >
              Active{activeOrders.length > 0 ? ` (${activeOrders.length})` : ""}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setActiveTab("past")}
            className={`flex-1 py-3 items-center justify-center rounded-lg min-h-11 ${
              activeTab === "past" ? "bg-white shadow-2xs" : ""
            }`}
          >
            <Text
              className={`font-body-bold text-sm ${
                activeTab === "past" ? "text-brand-text" : "text-brand-muted"
              }`}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View>
            {Array.from({ length: 3 }).map((_, i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </View>
        ) : error ? (
          <EmptyState
            icon={Frown}
            title="Couldn't load orders"
            description={error}
            tone="error"
            actionLabel="Try again"
            onAction={refresh}
          />
        ) : (
          <FlatList
            data={currentData}
            keyExtractor={(item) => item.id}
            renderItem={renderOrderCard}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-6"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="#84cc16" />
            }
            ListEmptyComponent={
              <EmptyState
                icon={ReceiptText}
                title={activeTab === "active" ? "No active orders" : "No past orders"}
                description={
                  activeTab === "active"
                    ? "Orders you place will show up here."
                    : "Completed or cancelled orders appear here."
                }
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
