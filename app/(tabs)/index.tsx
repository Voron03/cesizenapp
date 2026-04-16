import { useRouter } from "expo-router";
import React, { Suspense } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedWrapper from "@/components/AnimatedWrapper";
import Loading from "@/components/Loading";
import PagesList from "@/components/PagesList";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🧘 Calm Focus</Text>
          </View>

          <Text style={styles.title}>CESIZen</Text>

          <Text style={styles.subtitle}>
            Respirez. Concentrez-vous. Progressez.
          </Text>
        </View>

        {/* HERO */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Votre moment de calme</Text>

          <Text style={styles.heroText}>
            Des exercices de respiration guidés pour réduire le stress,
            améliorer la concentration et retrouver l’équilibre intérieur en quelques minutes.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
            ]}
            onPress={() => router.push("/(tabs)/exercices" as any)}
          >
            <Text style={styles.primaryButtonText}>
              Commencer une séance
            </Text>
          </Pressable>
        </View>

        {/* QUICK STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3 min</Text>
            <Text style={styles.statLabel}>Session rapide</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>↓ Stress</Text>
            <Text style={styles.statLabel}>Objectif quotidien</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>∞</Text>
            <Text style={styles.statLabel}>Disponibilité</Text>
          </View>
        </View>

        {/* SECTION */}
        <Text style={styles.sectionTitle}>Recommandé pour vous</Text>

        <View style={styles.listContainer}>
          <Suspense fallback={<Loading />}>
            <AnimatedWrapper>
              <PagesList />
            </AnimatedWrapper>
          </Suspense>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },

  header: {
    marginBottom: 18,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
  },

  badgeText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "600",
  },

  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748B",
  },

  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    marginTop: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },

  heroText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },

  primaryButton: {
    marginTop: 16,
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",

    shadowColor: "#3B82F6",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  statValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#94A3B8",
  },

  sectionTitle: {
    marginTop: 22,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  listContainer: {
    width: "100%",
  },
});
