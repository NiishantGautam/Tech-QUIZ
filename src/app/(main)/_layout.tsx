import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function MainLayout() {
  const { user } = useUser();

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
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
