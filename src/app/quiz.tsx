import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import QuestionCard from "../features/quiz/components/QuestionCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { theme } from "../constants/theme";

export default function QuizScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <Text style={styles.title}>Question 1/5</Text>
        </View>

        {/* Body */}
        <View>
          <QuestionCard />
          <Text style={styles.timer}>20 sec</Text>
        </View>

        {/* Footer */}
        <Pressable onPress={() => console.warn("Pressed")} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
          <FontAwesome6
            name="arrow-right-long"
            size={16}
            color={theme.buttonText}
            style={styles.buttonIcon}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.bgPrimary,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: theme.textSecondary,
  },
  timer: {
    marginVertical: 15,
    textAlign: "center",
    color: theme.textSecondary,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: theme.buttonPrimary,
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.buttonText,
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: "absolute",
    right: 20,
  },
});
