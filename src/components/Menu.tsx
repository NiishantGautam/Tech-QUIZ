import React from "react";
import { Dimensions, Pressable, Image, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { AnimatePresence, MotiView, MotiText } from "moti";
import { useFonts, Inter_500Medium, Inter_700Bold, Inter_900Black } from "@expo-google-fonts/inter";
import { Feather } from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";

const { height } = Dimensions.get("window");

const _logo = "https://cdn-icons-png.flaticon.com/512/3468/3468306.png";
const _color = "#E0BDFC";
const _arrowColor = "#A1E8C3";
const _spacing = 10;
const _logoSize = 80;

const _duration = 1000;
const _delay = 60;
const _logoDelay = _duration * 0.1;

const _menu = [
  { key: "1", label: "Profile", icon: "user" },
  { key: "2", label: "Practice", icon: "book" },
  { key: "3", label: "Statistics", icon: "bar-chart-2" },
  { key: "4", label: "Settings", icon: "settings" },
  { key: "5", label: "Sign Out", icon: "log-out", isDestructive: true },
];

const _transition = {
  type: "timing" as const,
  duration: _duration,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};

interface MenuProps {
  onClose: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onClose }) => {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AnimatePresence>
      <MotiView
        from={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
        transition={_transition}
        style={styles.container}
      >
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Feather name="x" size={24} color={_color} />
        </Pressable>

        <Image source={{ uri: _logo }} style={styles.logo} />

        {_menu.map((item, index) => (
          <MotiView
            key={item.key}
            from={{
              opacity: 0,
              translateY: 20,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            transition={{
              ..._transition,
              delay: _delay * index,
            }}
            style={styles.menuItem}
          >
            <Feather
              name={item.icon as any}
              size={24}
              color={item.isDestructive ? "#FF6B6B" : _color}
            />
            <MotiText style={[styles.menuText, item.isDestructive && styles.destructiveText]}>
              {item.label}
            </MotiText>
          </MotiView>
        ))}
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: _spacing * 1.5,
    width: "100%",
    maxWidth: 280,
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
