import { supabase } from "@/lib/supabaseClient";

type HeaderFn = () => Promise<any>;

export function useAdminActions(getAuthHeader: HeaderFn, refreshAll: () => Promise<void>) {

  const deleteUser = async (id: string) => {
    await supabase.from("profiles").delete().eq("id", id);
    refreshAll();
  };

  const toggleUser = async (id: string, current: boolean) => {
    await supabase
      .from("profiles")
      .update({ is_active: !current })
      .eq("id", id);

    refreshAll();
  };

  const createMenu = async () => {
    const title = prompt("Menu title?");
    if (!title) return;

    await supabase.from("menu").insert([{ title }]);

    refreshAll();
  };

  const deleteMenu = async (id: string) => {
    await supabase.from("menu").delete().eq("id_menu", id);
    refreshAll();
  };

  const createPage = async (menuId: string) => {
    const title = prompt("Page title?");
    if (!title) return;

    await supabase.from("pages").insert([
      {
        title,
        menu_id: menuId,
        data: {},
      },
    ]);

    refreshAll();
  };

  const deletePage = async (id: string) => {
    await supabase.from("pages").delete().eq("id_page", id);
    refreshAll();
  };

  return {
    deleteUser,
    toggleUser,
    createMenu,
    deleteMenu,
    createPage,
    deletePage,
  };
}