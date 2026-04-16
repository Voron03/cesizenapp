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
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Menu</Text>
          <Text style={styles.subtitle}>
            Organisation des sections du site
          </Text>
        </View>

        <Text style={styles.count}>
          Total: {menu?.length || 0}
        </Text>
      </View>

      {/* ADD BUTTON */}
      <Pressable onPress={createMenu} style={styles.addBtn}>
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
                  {m.title?.charAt(0).toUpperCase()}
                </Text>
              </View>

              <View>
                <Text style={styles.menuTitle}>{m.title}</Text>
                <Text style={styles.menuId}>ID: {m.id_menu}</Text>
              </View>
            </View>

            {/* DELETE */}
            <Pressable
              onPress={() => deleteMenu(m.id_menu)}
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

  addBtn: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  iconText: {
    color: "#fff",
    fontWeight: "700",
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  menuId: {
    fontSize: 10,
    color: "#9ca3af",
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
