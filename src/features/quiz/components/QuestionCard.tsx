import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../../constants/theme";
import AnswerOption from "./AnswerOption";
import { Question } from "../../../features/quiz/types/types";
import React from "react";

type QuestionCardProps = {
  question: Question;
};

export default function QuestionCard({ question }: QuestionCardProps) {
  const selectedOption = question.options[0];

  return (
    <View style={styles.questionCard}>
      <Text style={styles.question}>{question.question}</Text>

      <View style={styles.optionsContainer}>
        {question.options.map(option => {
          return (
            <AnswerOption
              key={option}
              option={option}
              isSelected={option === selectedOption}
              onPress={() => console.warn("Pressed", option)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  questionCard: {
    padding: 24,
    backgroundColor: theme.bgCard,
    borderRadius: 25,
    paddingVertical: 40,
    gap: 25,
    marginHorizontal: 10,

    shadowColor: theme.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  question: {
    fontSize: 26,
    fontWeight: "600",
    lineHeight: 32,
    textAlign: "center",
    color: theme.textPrimary,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  optionsContainer: {
    gap: 20,
  },
});
