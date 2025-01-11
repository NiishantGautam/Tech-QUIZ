import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { theme } from "../constants/theme";
import { useRouter } from "expo-router";

const CHAPTERS = [
  "1. Intro to TypeScript",
  "2. The any type",
  "3. TypeScript ESLint",
  "4. Primitive types",
  "5. Union types",
  "6. The type alias",
  "7. Arrays",
  "8. Tuples",
  "9. Literal types",
  "10. Functions",
  "11. Modules",
];

interface ExploreCardProps {
  onChapterPress?: (chapter: string) => void;
}

export const ExploreCard = ({ onChapterPress }: ExploreCardProps) => {
  const router = useRouter();

  const handleChapterPress = (chapter: string) => {
    router.push({
      pathname: "/chapter",
      params: { title: chapter },
    });
    onChapterPress?.(chapter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📚</Text>
        </View>
        <Text style={styles.title}>Explore chapters</Text>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.chaptersGrid}>
          {CHAPTERS.map((chapter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.chapterButton}
              onPress={() => handleChapterPress(chapter)}
            >
              <Text style={styles.chapterText}>{chapter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorDark,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginTop: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colorWhite,
    marginLeft: 12,
  },
  scrollView: {
    maxHeight: 200,
  },
  chaptersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 8,
  },
  chapterButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  chapterText: {
    color: theme.colorWhite,
    fontSize: 14,
  },
});
