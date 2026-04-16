import { Ionicons } from "@expo/vector-icons";
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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Admin Dashboard</Text>
            <Text style={styles.subtitle}>
              Control center for CESIZen system
            </Text>
          </View>

          {/* STATUS CHIP */}
          <View style={styles.statusChip}>
            <View style={styles.dot} />
            <Text style={styles.statusText}>System online</Text>
          </View>
        </View>

        {/* USERS */}
        <SectionCard
          icon="people-outline"
          title="Users"
          subtitle="Manage registered users"
        >
          <UsersSection
            users={users}
            loading={loading}
            toggleUser={actions.toggleUser}
            deleteUser={actions.deleteUser}
          />
        </SectionCard>

        {/* MENU */}
        <SectionCard
          icon="grid-outline"
          title="Menu"
          subtitle="Navigation structure"
        >
          <MenuSection
            menu={menu}
            loading={loading}
            createMenu={actions.createMenu}
            deleteMenu={handleDeleteMenu}
          />
        </SectionCard>

        {/* PAGES */}
        <SectionCard
          icon="document-text-outline"
          title="Pages"
          subtitle="Content management"
        >
          <PagesSection
            menu={menu}
            loading={loading}
            pages={pages}
            selectedMenuId={selectedMenuId}
            setSelectedMenuId={setSelectedMenuId}
            createPage={() => actions.createPage(selectedMenuId)}
            deletePage={actions.deletePage}
          />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

/* SECTION WRAPPER */
function SectionCard({ icon, title, subtitle, children }: any) {
  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={18} color="#3B82F6" />

        <View style={{ marginLeft: 8 }}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={{ marginTop: 12 }}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    gap: 6,
  },

  statusText: {
    fontSize: 11,
    color: "#059669",
    fontWeight: "600",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  sectionSubtitle: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },
});
