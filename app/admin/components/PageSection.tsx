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
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Pages</Text>
          <Text style={styles.subtitle}>
            Gestion des contenus
          </Text>
        </View>

        <Text style={styles.count}>
          Total: {pages?.length || 0}
        </Text>
      </View>

      {/* MENU SELECT */}
      <FlatList
        horizontal
        data={menu}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, marginBottom: 15 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedMenuId(item.id)}
            style={[
              styles.menuBtn,
              selectedMenuId === item.id && styles.menuActive,
            ]}
          >
            <Text
              style={[
                styles.menuText,
                selectedMenuId === item.id && styles.menuTextActive,
              ]}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />

      {/* CREATE BUTTON */}
      <Pressable style={styles.createBtn} onPress={createPage}>
        <Text style={styles.createText}>+ Create Page</Text>
      </Pressable>

      {/* PAGES LIST */}
      <FlatList
        data={pages?.filter((p: any) =>
          selectedMenuId ? p.menu_id === selectedMenuId : true
        )}
        keyExtractor={(item) => item.id_page}
        contentContainerStyle={{ gap: 10, marginTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* LEFT */}
            <View style={{ flex: 1 }}>
              <Text style={styles.pageTitle}>{item.title}</Text>

              <Text numberOfLines={2} style={styles.desc}>
                {item?.data?.blocks?.find(
                  (b: any) => b.type === "text"
                )?.content || "No description"}
              </Text>
            </View>

            {/* ACTIONS */}
            <Pressable
              onPress={() => deletePage(item.id_page)}
              style={styles.deleteBtn}
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
  container: {
    padding: 16,
  },

  center: {
    padding: 20,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "flex-end",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },

  count: {
    fontSize: 12,
    color: "#9ca3af",
  },

  menuBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
  },

  menuActive: {
    backgroundColor: "#10b981",
  },

  menuText: {
    fontSize: 12,
    color: "#374151",
  },

  menuTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  createBtn: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  createText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    alignItems: "center",
    gap: 10,
  },

  pageTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  desc: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 4,
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  deleteText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
});
