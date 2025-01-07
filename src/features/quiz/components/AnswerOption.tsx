import { Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../../../constants/theme";
import React from "react";

interface AnswerOptionProps {
  option: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const AnswerOption = ({ option, isSelected, onPress }: AnswerOptionProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isSelected && { backgroundColor: "#E1F396", borderColor: "#E1F396" },
      ]}
    >
      <Text style={styles.text}>{option}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.borderLight,
    padding: 20,
    borderRadius: 100,
  },
  text: {
    color: theme.textPrimary,
    fontSize: 16,
  },
});

export default AnswerOption;
