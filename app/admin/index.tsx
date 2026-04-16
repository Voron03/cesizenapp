import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAdminActions } from "./hooks/useAdminActions";
import { useAdminData } from "./hooks/useAdminData";

import MenuSection from "./components/MenuSection";
import PagesSection from "./components/PageSection";
import UsersSection from "./components/UserSection";

import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [selectedMenuId, setSelectedMenuId] = useState<string>("");

  const getAuthHeader = async () => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) return null;

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const { users, menu, pages, loading, refreshAll } =
    useAdminData(getAuthHeader);

  const actions = useAdminActions(getAuthHeader, refreshAll);

  const handleDeleteMenu = async (id: string) => {
    await actions.deleteMenu(id);

    if (selectedMenuId === id) {
      setSelectedMenuId("");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Tableau de bord d'administration
          </Text>

          <View style={styles.status}>
            <View style={styles.dot} />
            <Text style={styles.statusText}>System online</Text>
          </View>
        </View>

        {/* USERS */}
        <View style={styles.card}>
          <UsersSection
            users={users}
            loading={loading}
            toggleUser={actions.toggleUser}
            deleteUser={actions.deleteUser}
          />
        </View>

        {/* MENU */}
        <View style={styles.card}>
          <MenuSection
            menu={menu}
            loading={loading}
            createMenu={actions.createMenu}
            deleteMenu={handleDeleteMenu}
          />
        </View>

        {/* PAGES */}
        <View style={styles.card}>
          <PagesSection
            menu={menu}
            loading={loading}
            pages={pages}
            selectedMenuId={selectedMenuId}
            setSelectedMenuId={setSelectedMenuId}
            createPage={() => actions.createPage(selectedMenuId)}
            deletePage={actions.deletePage}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 8,
  },

  statusText: {
    fontSize: 12,
    color: "#6b7280",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});