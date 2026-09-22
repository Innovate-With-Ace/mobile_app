// app/(dashboard)/_layout.tsx
import { Text } from "@/components/ui/text";
import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { Home, Receipt, User, UtensilsCrossed } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardLayout() {
  const { isSignedIn, isLoaded } = useAuth({ treatPendingAsSignedOut: false });
  const insets = useSafeAreaInsets();
  if (!isLoaded) return null;
  if (!isSignedIn) {
    return <Redirect href="/(auth)/SignIn" />;
  }

  // Tab bar height/padding include the device's bottom safe-area inset
  // (home indicator) so icons never sit flush against it.
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#84cc16",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          height: 75,
          paddingTop: 8,
          paddingBottom: insets.bottom + 10,
          backgroundColor: "#ffffff",
          borderTopWidth: 0.5,
          borderTopColor: "#e5e7eb",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Inter_500Medium",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color,
                fontSize: 10,
                fontFamily: focused ? "Inter_600SemiBold" : "Inter_500Medium",
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <UtensilsCrossed color={color} size={size} />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color,
                fontSize: 10,
                fontFamily: focused ? "Inter_600SemiBold" : "Inter_500Medium",
              }}
            >
              Menu
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Receipt color={color} size={size} />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color,
                fontSize: 10,
                fontFamily: focused ? "Inter_600SemiBold" : "Inter_500Medium",
              }}
            >
              Orders
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color,
                fontSize: 10,
                fontFamily: focused ? "Inter_600SemiBold" : "Inter_500Medium",
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
