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

export default function SignUpScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName || !birthday) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            birthday: birthday,
          },
        },
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error("User not created");
      }

      Alert.alert(
        "Compte créé",
        "Vérifie ton email pour confirmer ton compte"
      );

      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Créer un compte</Text>

        <TextInput
          placeholder="Prénom"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />

        <TextInput
          placeholder="Nom"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

        <TextInput
          placeholder="Date de naissance (YYYY-MM-DD)"
          value={birthday}
          onChangeText={setBirthday}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Pressable
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Création..." : "S'inscrire"}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.link}>
            Déjà un compte ? Se connecter
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 360,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#6b7280",
  },
});
