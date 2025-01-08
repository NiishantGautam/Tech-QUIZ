import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { clearTokenCache } from "../../utils/cache";

export default function MainLayout() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      await clearTokenCache();
      router.replace("/(auth)/Onboarding");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              backgroundColor: "#ff3b30",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff" }}>Sign Out</Text>
          </TouchableOpacity>
        </SignedIn>
        <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in sippy</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up sippy</Text>
          </Link>
        </SignedOut>
      </Stack>
    </View>
  );
}
