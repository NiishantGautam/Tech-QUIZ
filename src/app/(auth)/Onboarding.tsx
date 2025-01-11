import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
const { width, height } = Dimensions.get("screen");

const bgs = ["#4158D0", "#C850C0", "#4158D0", "#FFCC70"];
const DATA = [
  {
    key: "3571572",
    title: "Active Recall Learning",
    description:
      "Master programming concepts through interactive quizzes and challenges. Our spaced repetition system helps you retain knowledge longer!",
    image: "https://cdn-icons-png.flaticon.com/256/3571/3571572.png",
  },
  {
    key: "3571747",
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with detailed analytics. Watch your knowledge grow as you complete daily challenges and maintain your streak!",
    image: "https://cdn-icons-png.flaticon.com/256/3571/3571747.png",
  },
  {
    key: "3571680",
    title: "Practice Makes Perfect",
    description:
      "Regular practice sessions with real-world coding problems help reinforce your understanding. Learn from mistakes and improve continuously!",
    image: "https://cdn-icons-png.flaticon.com/256/3571/3571680.png",
  },
  {
    key: "3571603",
    title: "Learn Together",
    description:
      "Join a community of tech enthusiasts. Compare scores, challenge friends, and motivate each other to excel in your learning journey!",
    image: "https://cdn-icons-png.flaticon.com/256/3571/3571603.png",
  },
];

export default function App() {
  const router = useRouter();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const inputRange = DATA.map((_, i) => i * width);
  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: bgs,
  });

  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "-35deg", "35deg"],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor,
          },
        ]}
      />
      <Animated.View
        style={{
          width: height * 0.65,
          height: height * 0.65,
          borderRadius: 96,
          backgroundColor: "rgba(255,255,255,0.9)",
          position: "absolute",
          top: -height * 0.2,
          left: -height * 0.1,
          transform: [
            {
              translateX,
            },
            {
              rotate,
            },
          ],
        }}
      />

      <Animated.FlatList
        data={DATA}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: height * 0.25 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        keyExtractor={item => item.key}
        pagingEnabled
        horizontal
        renderItem={({ item, index }) => {
          return (
            <View style={{ width, justifyContent: "center", height: "100%" }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    fontSize: 28,
                    paddingVertical: 10,
                  }}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                >
                  {item.title}
                </Text>
                <Text style={{ color: "#fff", fontWeight: "400", fontSize: 16 }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: height * 0.25,
          padding: 20,
          width,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              router.push("/(auth)/sign-in");
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Log in</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              router.push("/(auth)/sign-up");
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Create account</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.5, 1],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  margin: 8,
                  opacity,
                  backgroundColor: "#fff",
                  transform: [
                    {
                      scale,
                    },
                  ],
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.9,
    letterSpacing: 1,
    color: "#4158D0",
  },
});
