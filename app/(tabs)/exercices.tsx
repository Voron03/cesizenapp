import ExerciceCard from "@/components/ExerciceCard";
import Timer from "@/components/Timer";
import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useRef, useState } from "react";
import {
    ImageBackground,
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
  const activeId = useRef<string | null>(null);

  const scrollRef = useRef<ScrollView>(null);

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
    activeId.current = ex.id_exercice;

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
    activeId.current = null;

    setShowTimer(false);
    setActive(null);
    setPhase("idle");
    setTimeLeft(0);
  }

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      
      {/* HERO */}
      <ImageBackground
        source={{
          uri: "https://i.notretemps.com/2000x1125/smart/2020/06/09/vacances-zen-pour-un-sejour-100-detente.jpeg",
        }}
        style={styles.hero}
      >
        <View style={styles.overlay} />

        <Text style={styles.title}>Exercices de respiration</Text>

        <Text style={styles.subtitle}>
          Inspirez la paix. Expirez le stress.
        </Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Commencer</Text>
        </Pressable>
      </ImageBackground>

      {/* TIMER */}
      {showTimer && active && (
        <View style={styles.timerBox}>
          <Timer exercice={active} phase={phase} timeLeft={timeLeft} />

          <Pressable style={styles.stop} onPress={stopExercise}>
            <Text style={{ color: "white" }}>Stop</Text>
          </Pressable>
        </View>
      )}

      {/* LIST */}
      <View style={styles.section}>
        <Text style={styles.h2}>Vos exercices</Text>

        {exercices.map((ex) => (
          <ExerciceCard
            key={ex.id_exercice}
            exercice={ex}
            onStart={() => startExercise(ex)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  hero: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#34d399",
    padding: 12,
    borderRadius: 30,
  },

  buttonText: {
    fontWeight: "600",
  },

  timerBox: {
    padding: 20,
    alignItems: "center",
  },

  section: {
    padding: 20,
  },

  h2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  stop: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
  },
});
