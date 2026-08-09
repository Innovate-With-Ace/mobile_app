// app/(dashboard)/_layout.tsx
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function DashboardLayout() {
  const { isSignedIn, isLoaded } = useAuth({ treatPendingAsSignedOut: false });
  if (!isLoaded) return null;
  if (!isSignedIn) {
    return <Redirect href="/(auth)/SignIn" />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
