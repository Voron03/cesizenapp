import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function PagesList() {
    const [pages, setPages] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPages = async () => {
            const { data, error } = await supabase
                .from("pages")
                .select("*");

            if (error) {
                console.log("Supabase error:", error);
            }

            setPages(data || []);
        };

        fetchPages();
    }, []);

    return (
        <View style={styles.grid}>
            {pages.map((page) => {
                const description =
                    page.data?.blocks?.find((b: any) => b.type === "text")?.content ||
                    "Aucune description disponible";

                const image =
                    page.image_url ||
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d";

                return (
                    <Pressable
                        key={page.id_page}
                        style={styles.card}
                        onPress={() =>
                            router.push(`/pages/${page.id_page}` as any)
                        }
                    >
                        {/* IMAGE */}
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: image }} style={styles.image} />

                            <View style={styles.overlay} />
                        </View>

                        {/* CONTENT */}
                        <View style={styles.content}>
                            <Text style={styles.title}>{page.title}</Text>

                            <Text style={styles.description} numberOfLines={3}>
                                {description}
                            </Text>

                            <View style={styles.bottom}>
                                <Text style={styles.hint}>Lecture guidée</Text>
                                <Text style={styles.open}>Ouvrir →</Text>
                            </View>
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        width: "100%",
    },

    card: {
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#fff",
        marginBottom: 16,
    },

    imageWrapper: {
        height: 180,
        position: "relative",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    content: {
        padding: 16,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },

    description: {
        marginTop: 8,
        fontSize: 13,
        color: "#6b7280",
    },

    bottom: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    hint: {
        fontSize: 11,
        color: "#9ca3af",
    },

    open: {
        fontSize: 11,
        color: "#10b981",
        fontWeight: "600",
    },
});
