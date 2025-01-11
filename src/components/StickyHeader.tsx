import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Menu } from "./Menu";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getPageContent, NotionPage, NotionBlock } from "../services/notion-api";
import { theme } from "../constants/theme";

interface StickyHeaderProps {
  title: string;
}

export const StickyHeader = ({ title }: StickyHeaderProps) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [showMenu, setShowMenu] = React.useState(false);
  const [pageContent, setPageContent] = React.useState<NotionPage | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const toggleDarkMode = React.useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const content = await getPageContent();
        if (!content) {
          setError("No content found");
          return;
        }
        setPageContent(content);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [params.title]);

  const renderBlock = (block: NotionBlock, isDarkMode: boolean) => {
    switch (block.type) {
      case "text":
        return (
          <Text style={[styles.paragraph, isDarkMode && styles.darkText]}>{block.content}</Text>
        );

      case "image":
        return block.url ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: block.url }} style={styles.image} resizeMode="contain" />
            {block.content && (
              <Text style={[styles.imageCaption, isDarkMode && styles.darkText]}>
                {block.content}
              </Text>
            )}
          </View>
        ) : null;

      case "code":
        return (
          <View style={[styles.codeBlock, isDarkMode && styles.darkCodeBlock]}>
            <View style={styles.codeHeader}>
              <Text style={[styles.codeLanguage, isDarkMode && styles.darkText]}>
                {block.language}
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text style={[styles.codeText, isDarkMode && styles.darkText]}>{block.content}</Text>
            </ScrollView>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")} style={styles.headerButton}>
          <Entypo
            name="chevron-left"
            size={24}
            color={isDarkMode ? theme.colorWhite : theme.colorDark}
          />
        </TouchableOpacity>
        {pageContent?.title && (
          <Text style={[styles.title, isDarkMode && styles.darkText]} numberOfLines={1}>
            {pageContent.title}
          </Text>
        )}
        <TouchableOpacity onPress={toggleDarkMode} style={styles.headerButton}>
          <Entypo
            name={isDarkMode ? "light-up" : "moon"}
            size={24}
            color={isDarkMode ? theme.colorWhite : theme.colorDark}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.headerButton}>
          <Entypo name="menu" size={24} color={isDarkMode ? theme.colorWhite : theme.colorDark} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator
              size="large"
              color={isDarkMode ? theme.colorWhite : theme.colorDark}
            />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={[styles.errorText, isDarkMode && styles.darkText]}>{error}</Text>
            <TouchableOpacity
              style={[styles.retryButton, isDarkMode && styles.darkRetryButton]}
              onPress={() => router.push("/")}
            >
              <Text style={[styles.retryButtonText, isDarkMode && styles.darkText]}>Go Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {pageContent?.coverImage && (
              <Image
                source={{ uri: pageContent.coverImage }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            )}
            {pageContent?.blocks.map((block, index) => (
              <View key={`block-${index}`}>{renderBlock(block, isDarkMode)}</View>
            ))}
          </>
        )}
      </ScrollView>

      {showMenu && <Menu onClose={() => setShowMenu(false)} isDarkMode={isDarkMode} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  darkContainer: {
    backgroundColor: theme.colorDark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.exploreCard.buttonBackground,
  },
  headerButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: theme.colorDark,
    textAlign: "center",
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  coverImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
  },
  imageContainer: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: theme.exploreCard.buttonBackground,
  },
  imageCaption: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  codeBlock: {
    backgroundColor: "#f6f8fa",
    borderRadius: 8,
    marginVertical: 10,
    overflow: "hidden",
  },
  codeHeader: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  codeLanguage: {
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
  },
  darkCodeBlock: {
    backgroundColor: "#1e1e1e",
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 14,
    padding: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    color: theme.colorDark,
  },
  darkText: {
    color: theme.colorWhite,
  },
  errorText: {
    fontSize: 16,
    color: theme.colorDark,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    backgroundColor: theme.exploreCard.buttonBackground,
    borderRadius: 8,
  },
  darkRetryButton: {
    backgroundColor: theme.exploreCard.background,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
