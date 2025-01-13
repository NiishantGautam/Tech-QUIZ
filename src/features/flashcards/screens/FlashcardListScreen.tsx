import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { theme } from "../../../constants/theme";
import { router } from "expo-router";
import { Menu } from "../../../components/Menu";
import { Header } from "../../../components/Header";
import { SearchBar } from "../../../components/SearchBar";
import * as Haptics from "expo-haptics";
import { FlashcardDeck } from "../types";
import { TOPICS, FLASHCARD_DECKS } from "../data";

export const FlashcardListScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDeckPress = (deckId: string) => {
    router.push({
      pathname: "/(main)/deck",
      params: { deckId },
    });
  };

  const onHamburgerPress = () => {
    console.log("Menu button pressed");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsMenuOpen(!isMenuOpen);
  };

  const filteredDecks = useCallback(() => {
    return FLASHCARD_DECKS.filter(
      deck =>
        deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [searchQuery]);

  const renderDecksByTopic = () => {
    if (searchQuery) {
      return filteredDecks().map(deck => renderDeckCard(deck));
    }

    return Object.entries(TOPICS).map(([topic, deckIds]) => (
      <View key={topic}>
        <Text style={styles.topicTitle}>{topic}</Text>
        {FLASHCARD_DECKS.filter(deck => deckIds.includes(deck.id)).map(deck =>
          renderDeckCard(deck),
        )}
      </View>
    ));
  };

  const renderDeckCard = (deck: FlashcardDeck) => (
    <TouchableOpacity
      key={deck.id}
      style={[styles.deckCard, { backgroundColor: deck.color }]}
      onPress={() => handleDeckPress(deck.id)}
    >
      <View style={styles.deckInfo}>
        <Text style={styles.deckTitle}>{deck.title}</Text>
        <View style={styles.tagsContainer}>
          {deck.tags.map((tag: string) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{deck.count}</Text>
        <Text style={styles.countLabel}>cards</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header
        title="Flashcard Decks"
        subtitle="Select a deck to review"
        onMenuPress={onHamburgerPress}
        compact
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search decks or tags..."
      />

      <ScrollView
        style={styles.deckList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.deckListContent}
      >
        {renderDecksByTopic()}
      </ScrollView>

      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} isDarkMode={true} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorDark,
  },
  deckList: {
    flex: 1,
  },
  deckListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colorLight,
    marginTop: 24,
    marginBottom: 16,
  },
  deckCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  deckInfo: {
    flex: 1,
    marginRight: 16,
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  countContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 12,
    minWidth: 70,
  },
  countText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  countLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.9,
  },
});
