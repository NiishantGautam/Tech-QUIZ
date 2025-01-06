import { Text, StyleSheet, View } from "react-native";
import { theme } from "../../../constants/theme";

const AnswerOption = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is an option</Text>
    </View>
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
