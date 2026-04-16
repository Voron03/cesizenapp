import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

type Exercice = {
  title: string;
  inhale_seconds: number;
  hold_seconds: number;
  exhale_seconds: number;
};

type Props = {
  exercice: Exercice;
  phase: string;
  timeLeft: number;
};

export default function Timer({ exercice, phase, timeLeft }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const getConfig = () => {
    switch (phase) {
      case "inhale":
        return {
          scale: 1.35,
          color: "#3B82F6",
          icon: "arrow-down-circle",
          label: "Inspire",
        };
      case "hold":
        return {
          scale: 1.25,
          color: "#8B5CF6",
          icon: "pause-circle",
          label: "Retiens",
        };
      case "exhale":
        return {
          scale: 1,
          color: "#22C55E",
          icon: "arrow-up-circle",
          label: "Expire",
        };
      default:
        return {
          scale: 1,
          color: "#94A3B8",
          icon: "ellipse-outline",
          label: "Prêt",
        };
    }
  };

  const config = getConfig();

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: config.scale,
        useNativeDriver: true,
        friction: 6,
        tension: 60,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [phase]);

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <Text style={styles.title}>{exercice.title}</Text>

      {/* CARD */}
      <View style={styles.card}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ scale }],
              backgroundColor: config.color,
              opacity,
            },
          ]}
        />

        {/* CENTER CONTENT */}
        <View style={styles.center}>
          <Ionicons
            name={config.icon as any}
            size={22}
            color="#fff"
          />

          <Text style={styles.phase}>{config.label}</Text>

          <Text style={styles.time}>{timeLeft}s</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },

  card: {
    width: 190,
    height: 190,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",
    borderRadius: 999,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },

  circle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 999,
    opacity: 0.9,
  },

  center: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  phase: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textTransform: "capitalize",
  },

  time: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});
