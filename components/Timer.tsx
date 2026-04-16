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

  const getTargetScale = () => {
    if (phase === "inhale") return 1.3;
    if (phase === "hold") return 1.3;
    if (phase === "exhale") return 1;
    return 1;
  };

  const getColor = () => {
    if (phase === "inhale") return "#60a5fa"; // blue
    if (phase === "hold") return "#a78bfa"; // purple
    if (phase === "exhale") return "#34d399"; // green
    return "#9ca3af";
  };

  useEffect(() => {
    Animated.timing(scale, {
      toValue: getTargetScale(),
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  return (
    <View style={styles.container}>
      
      {/* TITLE */}
      <Text style={styles.title}>{exercice.title}</Text>

      {/* CIRCLE */}
      <View style={styles.circleWrapper}>
        
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: getColor(),
              transform: [{ scale }],
            },
          ]}
        />

        {/* TEXT OVERLAY */}
        <View style={styles.centerText}>
          <Text style={styles.phase}>
            {phase}
          </Text>

          <Text style={styles.time}>
            {timeLeft}
          </Text>
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
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  circleWrapper: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },

  centerText: {
    position: "absolute",
    alignItems: "center",
  },

  phase: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },

  time: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
  },
});
