import { useRouter } from "expo-router";
import React, { Suspense } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AnimatedWrapper from "@/components/AnimatedWrapper";
import Loading from "@/components/Loading";
import PagesList from "@/components/PagesList";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* TITLE */}
      <Text style={styles.title}>CESIZen</Text>

      {/* SLOGAN */}
      <Text style={styles.slogan}>
        Respirez. Concentrez-vous. Progressez.
      </Text>

      {/* SUBTITLE */}
      <Text style={styles.subtitle}>
        Des exercices de respiration pour retrouver le calme intérieur et améliorer votre focus.
      </Text>

      {/* BUTTON */}
      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/exercices" as any)}
      >
        <Text style={styles.buttonText}>Commencer</Text>
      </Pressable>

      {/* CONTENT */}
      <View style={styles.content}>
        <Suspense fallback={<Loading />}>
          <AnimatedWrapper>
            <PagesList />
          </AnimatedWrapper>
        </Suspense>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 60,
  },

  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  slogan: {
    marginTop: 20,
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: 300,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    maxWidth: 280,
  },

  button: {
    marginTop: 40,
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  content: {
    marginTop: 40,
    width: "100%",
  },
});