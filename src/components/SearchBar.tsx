import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constants/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={theme.colorLight} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.5)"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: theme.colorLight,
    fontSize: 16,
    padding: 0,
  },
});
