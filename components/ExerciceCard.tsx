import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Exercice = {
  id_exercice: string;
  title: string;
  inhale_seconds: number;
  hold_seconds: number;
  exhale_seconds: number;
};

type Props = {
  exercice: Exercice;
  onStart: (ex: Exercice) => void;
};

export default function ExerciceCard({ exercice, onStart }: Props) {
  return (
    <View style={styles.card}>
      
      {/* TITLE */}
      <Text style={styles.title}>{exercice.title}</Text>

      {/* SUBTITLE */}
      <Text style={styles.subtitle}>
        Séance de respiration guidée
      </Text>

      {/* TIMINGS */}
      <View style={styles.timings}>
        <View style={styles.row}>
          <Text style={styles.label}>Inspiration</Text>
          <Text style={styles.value}>{exercice.inhale_seconds}s</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Rétention</Text>
          <Text style={styles.value}>{exercice.hold_seconds}s</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Expiration</Text>
          <Text style={styles.value}>{exercice.exhale_seconds}s</Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* BUTTON */}
      <Pressable
        style={styles.button}
        onPress={() => onStart(exercice)}
      >
        <Text style={styles.buttonText}>Commencer</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },

  timings: {
    marginTop: 16,
    gap: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 13,
    color: "#6b7280",
  },

  value: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 16,
  },

  button: {
    backgroundColor: "#34d399",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "600",
    color: "#000",
  },
});
