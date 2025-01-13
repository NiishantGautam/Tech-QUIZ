import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { theme } from "../constants/theme";
import * as Haptics from "expo-haptics";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onMenuPress?: () => void;
  username?: string;
  compact?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onMenuPress,
  username = "Sippy",
  compact = false,
}) => {
  return (
    <View style={[styles.header, compact && styles.headerCompact]}>
      <View style={styles.headerTop}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={({ pressed }) => [styles.profileContainer, pressed && styles.pressedProfile]}
        >
          <Image source={require("../../assets/icon.png")} style={styles.headerLogo} />
        </Pressable>

        {!compact && (
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Happy learning,</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
        )}

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onMenuPress?.();
          }}
          style={({ pressed }) => [styles.menuButton, pressed && styles.pressedMenu]}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
      </View>

      {title && (
        <View style={styles.titleContainer}>
          <Text style={[styles.headerTitle, compact && styles.headerTitleCompact]}>{title}</Text>
          {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: theme.colorDark,
  },
  headerCompact: {
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pressedProfile: {
    transform: [{ scale: 0.95 }],
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: theme.colorTeal,
  },
  headerLogo: {
    width: "100%",
    height: "100%",
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 12,
  },
  greetingText: {
    fontSize: 14,
    color: theme.colorLight,
    opacity: 0.7,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colorLight,
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  pressedMenu: {
    transform: [{ scale: 0.9 }],
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: theme.colorTeal,
    borderWidth: 2,
  },
  menuIcon: {
    fontSize: 20,
    color: theme.colorLight,
  },
  titleContainer: {
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.colorLight,
    marginBottom: 4,
  },
  headerTitleCompact: {
    fontSize: 24,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colorLight,
    opacity: 0.7,
  },
});
