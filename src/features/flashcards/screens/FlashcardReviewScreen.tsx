import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { theme } from "../../../constants/theme";
import { router } from "expo-router";
import { Flashcard } from "../types";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../../../components/Header";

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

  const flipAnimation = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  const flashcards = ALL_FLASHCARDS[deckId] || [];
  const currentCard = flashcards[currentCardIndex];
  const isLastCard = currentCardIndex === flashcards.length - 1;

  const handleFlip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.spring(cardScale, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
  };

  const handleNext = (wasCorrect: boolean) => {
    Haptics.impactAsync(
      wasCorrect ? Haptics.ImpactFeedbackStyle.Success : Haptics.ImpactFeedbackStyle.Error,
    );

    if (wasCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (isLastCard) {
      setShowResult(true);
    } else {
      Animated.sequence([
        Animated.timing(cardScale, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentCardIndex(prev => prev + 1);
        setIsFlipped(false);
        flipAnimation.setValue(0);
      });
    }
  };

  const handleRestart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowResult(false);
    setCorrectAnswers(0);
    flipAnimation.setValue(0);
  };

  const handleExit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.back();
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  if (!currentCard) {
    return (
      <View style={styles.container}>
        <Header title="Error" compact onMenuPress={handleExit} />
        <Text style={styles.errorText}>No flashcards found for this deck.</Text>
        <TouchableOpacity onPress={handleExit} style={[styles.button, styles.exitButton]}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showResult) {
    const percentage = (correctAnswers / flashcards.length) * 100;
    return (
      <View style={styles.container}>
        <Header title="Review Complete" compact onMenuPress={handleExit} />
        <LinearGradient colors={[theme.colorTeal, theme.colorDark]} style={styles.resultGradient}>
          <View style={styles.resultContainer}>
            <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
            <Text style={styles.resultText}>
              You got {correctAnswers} out of {flashcards.length} cards correct
            </Text>
            <View style={styles.resultStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{correctAnswers}</Text>
                <Text style={styles.statLabel}>Correct</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{flashcards.length - correctAnswers}</Text>
                <Text style={styles.statLabel}>Incorrect</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleRestart} style={[styles.button, styles.restartButton]}>
            <Text style={styles.buttonText}>Try Again</Text>
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
      <Header
        title={`Card ${currentCardIndex + 1}/${flashcards.length}`}
        compact
        onMenuPress={handleExit}
      />

      <TouchableOpacity activeOpacity={0.9} onPress={handleFlip} style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.flipCard,
            {
              transform: [{ scale: cardScale }, { rotateY: frontInterpolate }],
            },
          ]}
        >
          <LinearGradient colors={[theme.colorTeal, theme.colorDark]} style={styles.cardGradient}>
            <Text style={styles.cardText}>{currentCard.question}</Text>
            <Text style={styles.flipPrompt}>Tap to see answer</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            styles.flipCard,
            styles.flipCardBack,
            {
              transform: [{ scale: cardScale }, { rotateY: backInterpolate }],
            },
          ]}
        >
          <LinearGradient colors={[theme.colorDark, theme.colorTeal]} style={styles.cardGradient}>
            <Text style={styles.cardText}>{currentCard.answer}</Text>
            <Text style={styles.flipPrompt}>Tap to see question</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      <View style={[styles.buttonContainer, !isFlipped && styles.buttonsHidden]}>
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
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorDark,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  flipCard: {
    width: width - 40,
    height: 400,
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  flipCardBack: {
    transform: [{ rotateY: "180deg" }],
  },
  cardGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  flipPrompt: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    position: "absolute",
    bottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  buttonsHidden: {
    opacity: 0,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
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
  restartButton: {
    backgroundColor: "#6B4EFF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resultGradient: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    fontSize: 18,
    color: theme.colorLight,
    marginTop: 20,
    textAlign: "center",
  },
  percentageText: {
    fontSize: 72,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  resultStats: {
    flexDirection: "row",
    marginTop: 40,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 36,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  errorText: {
    color: theme.colorLight,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    padding: 20,
  },
});
