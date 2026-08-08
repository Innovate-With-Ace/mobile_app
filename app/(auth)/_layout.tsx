import "@/global.css";
import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
