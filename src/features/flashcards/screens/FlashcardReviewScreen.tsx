import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { theme } from "../../../constants/theme";
import { router } from "expo-router";
import { Flashcard } from "../types";

const ALL_FLASHCARDS: Record<string, Flashcard[]> = {
  flutter: [
    {
      id: "1",
      question: "What is Flutter?",
      answer: "Flutter is an open-source UI software development kit created by Google.",
      deckId: "flutter",
    },
    {
      id: "2",
      question: "What language does Flutter use?",
      answer: "Flutter uses Dart programming language.",
      deckId: "flutter",
    },
  ],
  git: [
    {
      id: "1",
      question: "What is Git?",
      answer: "Git is a distributed version control system.",
      deckId: "git",
    },
    {
      id: "2",
      question: "What is a commit?",
      answer: "A commit is a snapshot of your repository at a specific point in time.",
      deckId: "git",
    },
  ],
};

interface FlashcardReviewScreenProps {
  deckId: string;
}

export const FlashcardReviewScreen: React.FC<FlashcardReviewScreenProps> = ({ deckId }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const flashcards = ALL_FLASHCARDS[deckId] || [];
  const currentCard = flashcards[currentCardIndex];
  const isLastCard = currentCardIndex === flashcards.length - 1;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (isLastCard) {
      setShowResult(true);
    } else {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowResult(false);
    setCorrectAnswers(0);
  };

  const handleExit = () => {
    router.back();
  };

  if (!currentCard) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No flashcards found for this deck.</Text>
        <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showResult) {
    const percentage = (correctAnswers / flashcards.length) * 100;
    return (
      <View style={styles.container}>
        <Text style={styles.resultTitle}>Review Complete!</Text>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            You got {correctAnswers} out of {flashcards.length} cards correct
          </Text>
          <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleRestart} style={styles.button}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExit} style={[styles.button, styles.exitButton]}>
            <Text style={styles.buttonText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <Text style={styles.progressText}>
          Card {currentCardIndex + 1} of {flashcards.length}
        </Text>
      </View>

      <TouchableOpacity onPress={handleFlip} style={styles.card}>
        <Text style={styles.cardText}>{isFlipped ? currentCard.answer : currentCard.question}</Text>
        <Text style={styles.flipPrompt}>Tap to {isFlipped ? "see question" : "see answer"}</Text>
      </TouchableOpacity>

      {isFlipped && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleNext(false)}
            style={[styles.button, styles.incorrectButton]}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNext(true)}
            style={[styles.button, styles.correctButton]}
          >
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorDark,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
  },
  progressText: {
    color: theme.colorLight,
    fontSize: 16,
    opacity: 0.8,
  },
  card: {
    width: width - 40,
    height: 400,
    backgroundColor: theme.colorTeal,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  flipPrompt: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    position: "absolute",
    bottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  correctButton: {
    backgroundColor: "#4CAF50",
  },
  incorrectButton: {
    backgroundColor: "#F44336",
  },
  exitButton: {
    backgroundColor: theme.colorTeal,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  resultTitle: {
    fontSize: 32,
    color: theme.colorLight,
    fontWeight: "bold",
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: theme.colorLight,
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 48,
    color: theme.colorTeal,
    fontWeight: "bold",
  },
  errorText: {
    color: theme.colorLight,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
