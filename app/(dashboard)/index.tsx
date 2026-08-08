import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/expo";
import React from "react";
import { Text, View } from "react-native";

export default function Dashboard() {
  const { signOut } = useAuth();
  return (
    <View className="flex-1">
      <View className="m-auto">
        <Button onPress={() => signOut()}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </View>
  );
}
