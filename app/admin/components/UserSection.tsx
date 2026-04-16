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
        <Text style={{ color: "#64748B" }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Utilisateurs</Text>
          <Text style={styles.subtitle}>
            Gestion des comptes et permissions
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {users?.length || 0}
          </Text>
        </View>
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
              {/* AVATAR */}
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {(u.first_name?.charAt(0) ||
                    u.email?.charAt(0) ||
                    "?").toUpperCase()}
                </Text>
              </View>

              {/* INFO */}
              <View>
                <Text style={styles.name}>
                  {u.first_name || u.email}
                </Text>

                <Text style={styles.email}>
                  {u.email}
                </Text>
              </View>
            </View>

            {/* RIGHT */}
            <View style={styles.right}>
              
              {/* STATUS */}
              <View
                style={[
                  styles.status,
                  u.is_active ? styles.active : styles.disabled,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    u.is_active ? styles.activeText : styles.disabledText,
                  ]}
                >
                  {u.is_active ? "Active" : "Disabled"}
                </Text>
              </View>

              {/* ACTIONS */}
              <View style={styles.actions}>
                <Pressable
                  onPress={() => toggleUser(u.id, u.is_active)}
                  style={[
                    styles.actionBtn,
                    u.is_active
                      ? styles.disableBtn
                      : styles.enableBtn,
                  ]}
                >
                  <Text style={styles.actionText}>
                    {u.is_active ? "Disable" : "Enable"}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => deleteUser(u.id)}
                  style={[styles.actionBtn, styles.deleteBtn]}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </Pressable>
              </View>
            </View>
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

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "800",
  },

  name: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },

  email: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  right: {
    alignItems: "flex-end",
    gap: 8,
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },

  active: {
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
  },

  disabled: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },

  activeText: {
    color: "#059669",
  },

  disabledText: {
    color: "#EF4444",
  },

  actions: {
    flexDirection: "row",
    gap: 6,
  },

  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  enableBtn: {
    backgroundColor: "#10B981",
  },

  disableBtn: {
    backgroundColor: "#6B7280",
  },

  deleteBtn: {
    backgroundColor: "#F43F5E",
  },

  actionText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});
