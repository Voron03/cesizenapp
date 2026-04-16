import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      
      {/* Spinner */}
      <ActivityIndicator size="large" color="#10b981" />

      {/* Text */}
      <Text style={styles.text}>
        Chargement en cours...
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  text: {
    marginTop: 16,
    fontSize: 14,
    color: "#6b7280",
  },
});
