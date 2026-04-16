import LogoutButton from "@/components/LogoutButton";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session?.user) {
          setUser(null);
          router.replace("/login");
          return;
        }

        setUser(session.user);
        loadProfile(session.user.id);
      }
    );

    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        setLoading(false);
        router.replace("/login");
        return;
      }

      setUser(data.user);
      await loadProfile(data.user.id);
      setLoading(false);
    };

    init();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setFirstName(data.first_name || "");
      setLastName(data.last_name || "");
      setBirthday(data.birthday || "");
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        birthday,
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      Alert.alert("Erreur", "Impossible de sauvegarder");
    } else {
      Alert.alert("Succès", "Profil mis à jour ✅");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Chargement du profil...</Text>
      </View>
    );
  }

  if (!user) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mon profil</Text>

      <View style={styles.emailBox}>
        <Text>📧 {user.email}</Text>
      </View>

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

      <Text style={styles.saveButton} onPress={saveProfile}>
        {saving ? "Enregistrement..." : "Enregistrer"}
      </Text>

      <LogoutButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },

  emailBox: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  saveButton: {
    marginTop: 10,
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    padding: 14,
    borderRadius: 12,
    fontWeight: "600",
  },
});