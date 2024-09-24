import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.view}>
      <View style={styles.button}>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate("home");
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    width: "30%",
  },
  view: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
