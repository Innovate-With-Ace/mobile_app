// app/(dashboard)/_layout.tsx
import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";

export default function DashboardLayout() {
  const { isSignedIn, isLoaded } = useAuth({ treatPendingAsSignedOut: false });
  if (!isLoaded) return null;
  if (!isSignedIn) {
    return <Redirect href="/(auth)/SignIn" />;
  }
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
    </Tabs>
  );
}
