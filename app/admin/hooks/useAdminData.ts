import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

type HeaderFn = () => Promise<any>;

export function useAdminData(getAuthHeader: HeaderFn) {
  const [users, setUsers] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) console.log("users error:", error);

    setUsers(data || []);
    console.log("DATA LENGTH:", data?.length);
    console.log("DATA:", data);
    console.log("ERROR:", error);
  };

  const loadMenu = async () => {
    const { data, error } = await supabase.from("menu").select("*");

    if (error) console.log("menu error:", error);

    setMenu(data || []);
  };

  const loadPages = async () => {
    const { data, error } = await supabase.from("pages").select("*");

    if (error) console.log("pages error:", error);

    setPages(data || []);
  };

  const refreshAll = async () => {
    setLoading(true);
    try {
      await Promise.all([loadUsers(), loadMenu(), loadPages()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return {
    users,
    menu,
    pages,
    loading,
    refreshAll,
  };
}