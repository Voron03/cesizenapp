import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function MenuSection({
  menu,
  createMenu,
  deleteMenu,
  loading,
}: any) {
  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#64748B" }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Menu</Text>
          <Text style={styles.subtitle}>
            Organisation des sections du site
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {menu?.length || 0}
          </Text>
        </View>
      </View>

      {/* ADD BUTTON */}
      <Pressable
        onPress={createMenu}
        style={({ pressed }) => [
          styles.addBtn,
          pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
        ]}
      >
        <Text style={styles.addText}>+ Nouveau menu</Text>
      </Pressable>

      {/* LIST */}
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id_menu}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item: m }) => (
          <View style={styles.card}>
            {/* LEFT */}
            <View style={styles.left}>
              <View style={styles.icon}>
                <Text style={styles.iconText}>
                  {m.title?.charAt(0).toUpperCase() || "?"}
                </Text>
              </View>

              <View>
                <Text style={styles.menuTitle}>{m.title}</Text>
                <Text style={styles.menuId}>
                  ID: {m.id_menu}
                </Text>
              </View>
            </View>

            {/* DELETE */}
            <Pressable
              onPress={() => deleteMenu(m.id_menu)}
              style={({ pressed }) => [
                styles.deleteBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    padding: 20,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 3,
  },

  badge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4F46E5",
  },

  addBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,

    shadowColor: "#3B82F6",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },

  addText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 1,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },

  iconText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },

  menuTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },

  menuId: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 2,
  },

  deleteBtn: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  deleteText: {
    color: "#EF4444",
    fontSize: 11,
    fontWeight: "700",
  },
});
