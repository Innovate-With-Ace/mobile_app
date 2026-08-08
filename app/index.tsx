import { Text } from "@/components/ui/text";
import { useAuth } from "@clerk/expo";
import { router } from "expo-router";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (isSignedIn) {
    return router.push("/_sitemap");
  }

  return router.push("/(auth)/SignIn");
}
