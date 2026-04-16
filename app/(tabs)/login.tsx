import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Erreur", error.message);
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Bon retour 👋</Text>
        <Text style={styles.subtitle}>
          Connectez-vous à votre espace CESIZen
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Input
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* BUTTON */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            {loading ? "Connexion..." : "Se connecter"}
          </Text>
        </Pressable>
      </View>

      {/* LINKS */}
      <View style={styles.links}>
        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.link}>Créer un compte</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/forgot-password")}>
          <Text style={styles.linkMuted}>Mot de passe oublié ?</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* INPUT COMPONENT */
function Input({ label, ...props }: any) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#94A3B8"
        {...props}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 18,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,

    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  label: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    color: "#0F172A",
  },

  button: {
    marginTop: 10,
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#3B82F6",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  links: {
    marginTop: 18,
    alignItems: "center",
    gap: 10,
  },

  link: {
    color: "#3B82F6",
    fontWeight: "600",
    fontSize: 13,
  },

  linkMuted: {
    color: "#94A3B8",
    fontSize: 12,
  },
});
