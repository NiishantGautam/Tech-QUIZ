import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import StickyHeader from "../components/StickyHeader";
import { View } from "react-native";

export default function ChapterPage() {
  const { title } = useLocalSearchParams();

  useEffect(() => {
    if (title) {
      // You can use the title here, for example setting it in navigation
      // navigation.setOptions({ title });
    }
  }, [title]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StickyHeader />
    </View>
  );
}
