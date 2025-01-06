import { Stack } from "expo-router";
import { theme } from "../constants/theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colorDark },
        animation: "slide_from_right",
      }}
    />
  );
}
