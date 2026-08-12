import Header from "@/components/dashboard/Header";
import MenuList from "@/components/dashboard/MenuList";
import SearchBar from "@/components/dashboard/SearchBar";
import TodaySpecial from "@/components/dashboard/TodaySpecial";
import { Text } from "@/components/ui/text";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView className="bg-brand-bg">
        <Header screenName="Home" />
        <View className="flex-1  p-4 gap-4">
          <View>
            <SearchBar placeholder="Search foods here" />
          </View>

          {/* Today's Special */}

          <View>
            <View>
              <Text className="text-lg text-brand-secondary font-header-bold uppercase tracking-wider">
                Today&apos;s Top Seller
              </Text>
            </View>
            <TodaySpecial />
          </View>

          <View>
            <View>
              <Text className="text-lg text-brand-secondary font-header-bold uppercase tracking-wider">
                Featured
              </Text>

              <View className="flex-1">
                <MenuList />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
