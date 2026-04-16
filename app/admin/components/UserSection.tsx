import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function UsersSection({
  users,
  toggleUser,
  deleteUser,
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
          <Text style={styles.title}>Utilisateurs</Text>
          <Text style={styles.subtitle}>
            Gestion des comptes et permissions
          </Text>
        </View>

        <Text style={styles.count}>
          Total: {users?.length || 0}
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item: u }) => (
          <View style={styles.card}>
            {/* LEFT */}
            <View style={styles.left}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {u.email?.charAt(0).toUpperCase()}
                </Text>
              </View>

              <View>
                <Text style={styles.id}>ID: {u.first_name} {u.last_name}</Text>

              </View>
            </View>

            {/* RIGHT */}
            <View style={styles.right}>
              <View
                style={[
                  styles.badge,
                  u.is_active ? styles.active : styles.disabled,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    u.is_active ? styles.activeText : styles.disabledText,
                  ]}
                >
                  {u.is_active ? "Active" : "Disabled"}
                </Text>
              </View>

              <Pressable
                onPress={() => toggleUser(u.id, u.is_active)}
                style={[
                  styles.btn,
                  u.is_active ? styles.btnGray : styles.btnGreen,
                ]}
              >
                <Text style={styles.btnText}>
                  {u.is_active ? "Disable" : "Enable"}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => deleteUser(u.id)}
                style={[styles.btn, styles.btnRed]}
              >
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
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
    marginBottom: 16,
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

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },

  left: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
  },

  email: {
    fontSize: 14,
    fontWeight: "600",
  },

  id: {
    fontSize: 10,
    color: "#9ca3af",
  },

  right: {
    gap: 6,
    alignItems: "flex-end",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },

  active: {
    backgroundColor: "#d1fae5",
  },

  disabled: {
    backgroundColor: "#fee2e2",
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "600",
  },

  activeText: {
    color: "#059669",
  },

  disabledText: {
    color: "#ef4444",
  },

  btn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  btnGreen: {
    backgroundColor: "#10b981",
  },

  btnGray: {
    backgroundColor: "#6b7280",
  },

  btnRed: {
    backgroundColor: "#ef4444",
  },

  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
