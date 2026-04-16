import { supabase } from "@/lib/supabaseClient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function PageScreen() {
  const { id } = useLocalSearchParams();

  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        if (!id) return;

        const { data, error } = await supabase
          .from("pages")
          .select("*")
          .eq("id_page", String(id));

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
          setErrorMsg(error.message);
        }

        setPage(data?.[0] || null);
      } catch (e: any) {
        setErrorMsg(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{errorMsg}</Text>
      </View>
    );
  }

  if (!page) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Aucune page trouvée</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>

      {/* TITLE */}
      <Text style={{ fontSize: 26, fontWeight: "700" }}>
        {page.title}
      </Text>

      {/* BLOCKS */}
      <View style={{ marginTop: 20 }}>
        {page.data?.blocks?.map((block: any, index: number) => {
          switch (block.type) {
            case "title":
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    marginTop: 12,
                  }}
                >
                  {block.content}
                </Text>
              );

            case "text":
              return (
                <Text
                  key={index}
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    color: "#4b5563",
                    lineHeight: 22,
                  }}
                >
                  {block.content}
                </Text>
              );

            case "image":
              return (
                <Image
                  key={index}
                  source={{ uri: block.url }}
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 12,
                    marginTop: 12,
                  }}
                />
              );

            default:
              return null;
          }
        })}
      </View>
    </ScrollView>
  );
}