// src/app/(auth)/_layout.tsx
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(main)"} />; // Redirect to main app group
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hides the header for all auth screens
        contentStyle: { backgroundColor: "#fff" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="onboarding"
        options={
          {
            // Specific options for onboarding if needed
          }
        }
      />
      <Stack.Screen
        name="sign-in"
        options={
          {
            // Specific options for sign-in if needed
          }
        }
      />
      <Stack.Screen
        name="sign-up"
        options={
          {
            // Specific options for sign-up if needed
          }
        }
      />
    </Stack>
  );
}
