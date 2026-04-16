import { supabase } from "@/lib/supabaseClient";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadRole = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      setIsAdmin(!!data?.role);
    };    

    loadRole();
  }, []);

  return (
    <View style={styles.container}>
      <Tab
        label="Home"
        active={pathname === "/"}
        onPress={() => router.push("/")}
      />

      <Tab
        label="Exercices"
        active={pathname.includes("exercices")}
        onPress={() => router.push("/exercices")}
      />

      <Tab
        label="Profile"
        active={pathname.includes("profile")}
        onPress={() => router.push("/profile")}
      />

      {/* 🔥 ADMIN TAB ONLY FOR ADMINS */}
      {isAdmin && (
        <Tab
          label="Admin"
          active={pathname.includes("admin")}
          onPress={() => router.push("/admin")}
        />
      )}
    </View>
  );
}

/* TAB */
function Tab({ label, active, onPress }: any) {
  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Text style={[styles.text, active && styles.active]}>
        {label}
      </Text>
    </Pressable>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  tab: {
    alignItems: "center",
  },

  text: {
    color: "#6b7280",
  },

  active: {
    color: "#000",
    fontWeight: "700",
  },
});