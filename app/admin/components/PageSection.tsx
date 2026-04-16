import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function PagesSection({
  menu,
  pages,
  loading,
  selectedMenuId,
  setSelectedMenuId,
  createPage,
  deletePage,
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
          <Text style={styles.title}>Pages</Text>
          <Text style={styles.subtitle}>
            Gestion des contenus
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {pages?.length || 0}
          </Text>
        </View>
      </View>

      {/* MENU FILTER */}
      <FlatList
        horizontal
        data={menu}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, marginBottom: 14 }}
        renderItem={({ item }) => {
          const active = selectedMenuId === item.id;

          return (
            <Pressable
              onPress={() => setSelectedMenuId(item.id)}
              style={({ pressed }) => [
                styles.menuBtn,
                active && styles.menuActive,
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text
                style={[
                  styles.menuText,
                  active && styles.menuTextActive,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* CREATE BUTTON */}
      <Pressable
        onPress={createPage}
        style={({ pressed }) => [
          styles.createBtn,
          pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 },
        ]}
      >
        <Text style={styles.createText}>+ Create Page</Text>
      </Pressable>

      {/* LIST */}
      <FlatList
        data={pages?.filter((p: any) =>
          selectedMenuId ? p.menu_id === selectedMenuId : true
        )}
        keyExtractor={(item) => item.id_page}
        contentContainerStyle={{ gap: 10, marginTop: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* LEFT */}
            <View style={{ flex: 1 }}>
              <Text style={styles.pageTitle}>
                {item.title}
              </Text>

              <Text numberOfLines={2} style={styles.desc}>
                {item?.data?.blocks?.find(
                  (b: any) => b.type === "text"
                )?.content || "No description"}
              </Text>
            </View>

            {/* DELETE */}
            <Pressable
              onPress={() => deletePage(item.id_page)}
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
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#059669",
  },

  menuBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  menuActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },

  menuText: {
    fontSize: 12,
    color: "#334155",
    fontWeight: "600",
  },

  menuTextActive: {
    color: "#fff",
  },

  createBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#3B82F6",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },

  createText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },

  card: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 1,

    alignItems: "center",
    gap: 10,
  },

  pageTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },

  desc: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 16,
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
