import { supabase } from "@/lib/supabaseClient";
import { Ionicons } from "@expo/vector-icons";
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
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Tab
          label="Home"
          icon="home-outline"
          iconActive="home"
          active={pathname === "/"}
          onPress={() => router.push("/")}
        />

        <Tab
          label="Exercices"
          icon="leaf-outline"
          iconActive="leaf"
          active={pathname.includes("exercices")}
          onPress={() => router.push("/exercices")}
        />

        <Tab
          label="Profile"
          icon="person-outline"
          iconActive="person"
          active={pathname.includes("profile")}
          onPress={() => router.push("/profile")}
        />

        {isAdmin && (
          <Tab
            label="Admin"
            icon="settings-outline"
            iconActive="settings"
            active={pathname.includes("admin")}
            onPress={() => router.push("/admin")}
            danger
          />
        )}
      </View>
    </View>
  );
}

/* TAB */
function Tab({
  label,
  icon,
  iconActive,
  active,
  onPress,
  danger,
}: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tab,
        pressed && { transform: [{ scale: 0.95 }] },
      ]}
    >
      <View style={[styles.item, active && styles.itemActive]}>
        <Ionicons
          name={active ? iconActive : icon}
          size={20}
          color={
            active
              ? "#3B82F6"
              : danger
              ? "#ef4444"
              : "#94A3B8"
          }
        />

        <Text
          style={[
            styles.label,
            active && styles.labelActive,
            danger && !active && { color: "#ef4444" },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F6F7FB",
    paddingBottom: 18,
    paddingTop: 8,
  },

  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 6,

    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },

  tab: {
    flex: 1,
    alignItems: "center",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    gap: 3,
  },

  itemActive: {
    backgroundColor: "#E8F0FF",
  },

  label: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
  },

  labelActive: {
    color: "#3B82F6",
    fontWeight: "700",
  },
});
