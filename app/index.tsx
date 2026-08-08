import { Text } from "@/components/ui/text";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (isSignedIn) {
    return <Redirect href="/(dashboard)/" />; // Or your main app screen
  }

  return <Redirect href="/(auth)/SignIn" />;
}
