import ExerciceCard from "@/components/ExerciceCard";
import Timer from "@/components/Timer";
import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ExercicesPage() {
  const [exercices, setExercices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState<any>(null);
  const [phase, setPhase] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

  const isRunning = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("exercice").select("*");
      setExercices(data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const runTimer = (seconds: number) =>
    new Promise<void>((resolve) => {
      let t = seconds;
      setTimeLeft(t);

      const interval = setInterval(() => {
        if (!isRunning.current) {
          clearInterval(interval);
          resolve();
          return;
        }

        t -= 1;
        setTimeLeft(t);

        if (t <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });

  async function startExercise(ex: any) {
    if (isRunning.current) return;

    isRunning.current = true;
    setActive(ex);
    setShowTimer(true);
    setPhase("prepare");

    const cycle = [
      { name: "inhale", duration: ex.inhale_seconds },
      { name: "hold", duration: ex.hold_seconds },
      { name: "exhale", duration: ex.exhale_seconds },
    ];

    while (isRunning.current) {
      for (const step of cycle) {
        setPhase(step.name);
        await runTimer(step.duration);
      }
    }
  }

  function stopExercise() {
    isRunning.current = false;
    setShowTimer(false);
    setActive(null);
    setPhase("idle");
    setTimeLeft(0);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.title}>Exercices de respiration</Text>

        <Text style={styles.subtitle}>
          Inspirez la paix. Expirez le stress.
        </Text>

        <View style={styles.heroCard}>
          <Text style={styles.heroText}>
            Choisissez un exercice et laissez-vous guider par le rythme.
            3 minutes suffisent pour calmer votre système nerveux.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
            ]}
            onPress={() => {
              const first = exercices?.[0];
              if (first) startExercise(first);
            }}
          >
            <Text style={styles.primaryButtonText}>
              Commencer rapidement
            </Text>
          </Pressable>
        </View>
      </View>

      {/* TIMER FLOATING PANEL */}
      {showTimer && active && (
        <View style={styles.timerWrapper}>
          <View style={styles.timerCard}>
            <Timer exercice={active} phase={phase} timeLeft={timeLeft} />

            <Pressable style={styles.stopButton} onPress={stopExercise}>
              <Text style={styles.stopText}>Stop session</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* SECTION */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Vos exercices</Text>
        <Text style={styles.sectionSubtitle}>
          Sélectionnez une séance adaptée à votre moment
        </Text>
      </View>

      {/* LIST */}
      <View style={styles.list}>
        {exercices.map((ex) => (
          <View key={ex.id_exercice} style={styles.cardWrap}>
            <ExerciceCard exercice={ex} onStart={() => startExercise(ex)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  hero: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
  },

  heroCard: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,

    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },

  heroText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },

  primaryButton: {
    marginTop: 14,
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#3B82F6",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  timerWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  timerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },

  stopButton: {
    marginTop: 10,
    backgroundColor: "#EF4444",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  stopText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  cardWrap: {
    marginBottom: 12,
  },
});
