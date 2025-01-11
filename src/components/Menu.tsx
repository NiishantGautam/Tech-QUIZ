import React from "react";
import { Dimensions, Pressable, Image, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { AnimatePresence, MotiView, MotiText } from "moti";
import { useFonts, Inter_500Medium, Inter_700Bold, Inter_900Black } from "@expo-google-fonts/inter";
import { Feather } from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";
import { useAuth } from "@clerk/clerk-expo";

const { height } = Dimensions.get("window");

// Constants for styling and animation
const _logo = "https://cdn-icons-png.flaticon.com/512/3468/3468306.png";
const _color = "#E0BDFC";
const _spacing = 10;
const _logoSize = 80;
const _duration = 1000;
const _delay = 60;

// Menu items configuration
const _menu = [
  { key: "1", label: "Profile", icon: "user" },
  { key: "2", label: "Practice", icon: "book" },
  { key: "3", label: "Statistics", icon: "bar-chart-2" },
  { key: "4", label: "Settings", icon: "settings" },
];

// Animation transition configuration
const _transition = {
  type: "timing" as const,
  duration: _duration,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};

// Sign Out Button Component
const SignOutItem = () => {
  const { signOut } = useAuth();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ..._transition, delay: _delay * _menu.length }}
      style={styles.menuItem}
    >
      <Pressable onPress={() => signOut()} style={styles.menuItemContent}>
        <Feather name="log-out" size={24} color="#FF6B6B" />
        <MotiText style={[styles.menuText, styles.destructiveText]}>Sign Out</MotiText>
      </Pressable>
    </MotiView>
  );
};

// Menu Item Component
const MenuItem = ({ item, index }: { item: (typeof _menu)[0]; index: number }) => (
  <MotiView
    key={item.key}
    from={{ opacity: 0, translateY: 20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ ..._transition, delay: _delay * index }}
    style={styles.menuItem}
  >
    <Pressable style={styles.menuItemContent}>
      <Feather name={item.icon as any} size={24} color={_color} />
      <MotiText style={styles.menuText}>{item.label}</MotiText>
    </Pressable>
  </MotiView>
);

interface MenuProps {
  onClose: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onClose }) => {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!fontsLoaded) return null;

  return (
    <AnimatePresence>
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={_transition}
        style={styles.container}
      >
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Feather name="x" size={24} color={_color} />
        </Pressable>

        <Image source={{ uri: _logo }} style={styles.logo} />

        {/* Regular menu items */}
        {_menu.map((item, index) => (
          <MenuItem key={item.key} item={item} index={index} />
        ))}

        {/* Sign out button */}
        <SignOutItem />
      </MotiView>
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    padding: _spacing * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: Constants.statusBarHeight + _spacing,
    right: _spacing * 2,
    padding: _spacing,
  },
  logo: {
    width: _logoSize,
    height: _logoSize,
    marginBottom: _spacing * 4,
    borderRadius: _logoSize / 2,
  },
  menuItem: {
    width: "100%",
    maxWidth: 280,
    marginVertical: _spacing,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: _spacing * 1.5,
  },
  menuText: {
    color: _color,
    marginLeft: _spacing * 2,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
  },
  destructiveText: {
    color: "#FF6B6B",
  },
});
