import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../constants/theme";

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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        nestedScrollEnabled={true}
        contentContainerStyle={styles.scrollViewContent}
      >
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
    backgroundColor: theme.exploreCard.background,
    borderRadius: 24,
    padding: 20,
    margin: 16,
    marginTop: 0,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.exploreCard.textColor,
    marginLeft: 12,
  },
  scrollView: {
    maxHeight: 300,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  chaptersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chapterButton: {
    backgroundColor: theme.exploreCard.buttonBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    minWidth: "45%",
    shadowColor: theme.exploreCard.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chapterText: {
    color: theme.exploreCard.textColor,
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.9,
  },
});
