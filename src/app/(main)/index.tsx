import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, View, SafeAreaView, ScrollView, Pressable } from "react-native";
import { theme } from "../../constants/theme";
import { StreakCard } from "../../components/StreakCard";
import { PracticeCard } from "../../components/PracticeCard";
import { ReviewCard } from "../../components/ReviewCard";
import { ExploreCard } from "../../components/ExploreCard";
import * as Haptics from "expo-haptics";
import { Menu } from "../../components/Menu";
import { useState } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onHamburgerPress = () => {
    console.log("Menu button pressed");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Pressable
            onPress={() => {
              console.log("Profile Icon pressed");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={({ pressed }) => [
              styles.profileContainer,
              pressed && {
                transform: [{ scale: 0.95 }],
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderWidth: 2,
                borderColor: theme.colorTeal,
              },
            ]}
            android_ripple={{
              color: "rgba(255, 255, 255, 0.1)",
              borderless: true,
            }}
          >
            <Image source={require("../../../assets/icon.png")} style={styles.headerLogo} />
          </Pressable>

          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Happy learning,</Text>
            <Text style={styles.username}>Sippy</Text>
          </View>
          <View style={styles.menuContainer}>
            <Pressable
              onPress={onHamburgerPress}
              style={({ pressed }) => [
                styles.menuButton,
                pressed && {
                  transform: [{ scale: 0.9 }],
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: theme.colorTeal,
                  borderWidth: 2,
                },
              ]}
              android_ripple={{
                color: "rgba(255, 255, 255, 0.2)",
                borderless: true,
                foreground: true,
              }}
            >
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>
          </View>
        </View>
        <StreakCard />
        <PracticeCard />
        <ReviewCard />
        <ExploreCard />
      </ScrollView>
      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorDark,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: theme.colorDark,
  },
  headerLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colorWhite,
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 30,
  },
  greetingText: {
    color: theme.colorLightGray,
    fontSize: 16,
  },
  username: {
    color: theme.colorWhite,
    fontSize: 24,
    fontWeight: "bold",
  },
  menuContainer: {
    paddingLeft: 16,
  },
  menuButton: {
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 2,
    borderColor: "transparent",
  },
  menuIcon: {
    fontSize: 24,
    color: theme.colorWhite,
    fontWeight: "600",
  },
  profileContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
});
