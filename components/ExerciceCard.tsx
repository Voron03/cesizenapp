import { Ionicons } from "@expo/vector-icons";
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
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="leaf-outline" size={18} color="#3B82F6" />
          <Text style={styles.title}>{exercice.title}</Text>
        </View>

        <Text style={styles.subtitle}>
          Séance guidée de respiration
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.stats}>
        <Stat
          icon="arrow-down"
          label="Inspiration"
          value={`${exercice.inhale_seconds}s`}
        />
        <Stat
          icon="pause"
          label="Rétention"
          value={`${exercice.hold_seconds}s`}
        />
        <Stat
          icon="arrow-up"
          label="Expiration"
          value={`${exercice.exhale_seconds}s`}
        />
      </View>

      {/* CTA */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
        ]}
        onPress={() => onStart(exercice)}
      >
        <Ionicons name="play" size={16} color="#fff" />
        <Text style={styles.buttonText}>Commencer</Text>
      </Pressable>
    </View>
  );
}

/* SMALL STAT COMPONENT */
function Stat({ icon, label, value }: any) {
  return (
    <View style={styles.statBox}>
      <Ionicons name={icon} size={14} color="#94A3B8" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },

  header: {
    marginBottom: 14,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#94A3B8",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 16,
  },

  statBox: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },

  statLabel: {
    fontSize: 10,
    color: "#94A3B8",
  },

  statValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },

  button: {
    marginTop: 14,
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 16,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,

    shadowColor: "#3B82F6",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});
