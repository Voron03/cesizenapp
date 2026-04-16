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
            birthday,
          },
        },
      });

      if (error) throw error;

      if (!data.user) throw new Error("User not created");

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
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>
          Rejoignez CESIZen et commencez votre parcours de calme intérieur
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {/* IDENTITY SECTION */}
        <SectionTitle title="Identité" />

        <Input
          label="Prénom"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Input
          label="Nom"
          value={lastName}
          onChangeText={setLastName}
        />

        <Input
          label="Date de naissance"
          value={birthday}
          onChangeText={setBirthday}
          placeholder="YYYY-MM-DD"
        />

        {/* ACCOUNT SECTION */}
        <SectionTitle title="Compte" />

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

        {/* CTA */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
          ]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Création..." : "Créer mon compte"}
          </Text>
        </Pressable>
      </View>

      {/* LINK */}
      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.link}>
          Déjà un compte ? Se connecter
        </Text>
      </Pressable>
    </View>
  );
}

/* INPUT */
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

/* SECTION TITLE */
function SectionTitle({ title }: any) {
  return (
    <Text style={styles.sectionTitle}>{title}</Text>
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
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
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

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3B82F6",
    marginTop: 10,
    marginBottom: 8,
    textTransform: "uppercase",
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
    marginTop: 14,
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",

    shadowColor: "#3B82F6",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },

  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#3B82F6",
    fontWeight: "600",
  },
});
