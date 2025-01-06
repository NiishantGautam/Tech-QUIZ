import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";
import * as Haptics from "expo-haptics";

interface ReviewCardProps {
  onPress?: () => void;
}

export const ReviewCard = ({ onPress }: ReviewCardProps) => {

  const handleReviewPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleReviewPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔄</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Review flashcards</Text>
        <Text style={styles.description}>
          Refresh your memory by answering questions you've previously tackled.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorTeal,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginTop: 0,
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
});
