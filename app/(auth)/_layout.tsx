import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false });
  if (!isLoaded) return null;

  if (isSignedIn) return <Redirect href={"/(dashboard)"} />;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
