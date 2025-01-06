import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";
import * as Haptics from "expo-haptics";

interface PracticeCardProps {
  questionCount?: number;
  onPress?: () => void;
}

export const PracticeCard = ({ questionCount = 63, onPress }: PracticeCardProps) => {


  const handlePracticePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePracticePress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📝</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Practice flashcards</Text>
        <Text style={styles.description}>
          Answer questions based on the topics you are learning from our flashcards.
        </Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{questionCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorPeach,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
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
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colorDark,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: theme.colorDark,
    opacity: 0.8,
  },
  badge: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    fontSize: 14,
  },
});
