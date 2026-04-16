import LogoutButton from "@/components/LogoutButton";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
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
      Alert.alert("Succès", "Profil mis à jour");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10, color: "#64748B" }}>
          Chargement du profil...
        </Text>
      </View>
    );
  }

  if (!user) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Mon profil</Text>
        <Text style={styles.subtitle}>
          Gérez vos informations personnelles
        </Text>
      </View>

      {/* EMAIL CARD */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Email</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* FORM CARD */}
      <View style={styles.card}>
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

        {/* SAVE BUTTON */}
        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
          ]}
          onPress={saveProfile}
        >
          <Text style={styles.saveText}>
            {saving ? "Enregistrement..." : "Sauvegarder"}
          </Text>
        </Pressable>
      </View>

      {/* LOGOUT */}
      <View style={styles.logout}>
        <LogoutButton />
      </View>
    </ScrollView>
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
    paddingHorizontal: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginTop: 20,
    marginBottom: 18,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },

  cardLabel: {
    fontSize: 12,
    color: "#94A3B8",
    marginBottom: 4,
  },

  email: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
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

  saveButton: {
    marginTop: 10,
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#3B82F6",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  logout: {
    marginTop: 10,
    marginBottom: 30,
  },
});
