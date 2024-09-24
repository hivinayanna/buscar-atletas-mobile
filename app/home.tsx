import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import axios from "axios";
import { Button, StyleSheet, TextInput, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";

interface Atleta {
  player_id: number;
  team_id: number;
  country_id: number;
  position_id: number;
  common_name: string;
  display_name: string;
  fullname: string;
  firstname: string;
  lastname: string;
  nationality: string;
  birthdate: string;
  birthcountry: string;
  birthplace: string;
  height: string;
  weight: string;
  image_path: string;
}

export default function HomeScreen() {
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [favoritos, setFavoritos] = useState<Atleta[]>([]);
  const [nomeAtleta, setNomeAtleta] = useState("");

  const buscarAtletas = async () => {
    const options = {
      method: "GET",
      url: `https://soccer.sportmonks.com/api/v2.0/players/search/${nomeAtleta}?api_token=${process.env.EXPO_PUBLIC_API_KEY}`,
    };

    const response = await axios.request<{ data: Atleta[] }>(options);
    console.log(response);
    if (response.data.data.length === 0) {
      return setAtletas([]);
    }
    return setAtletas(response.data.data);
  };

  const adicionarFavorito = (atleta: Atleta) => {
    setFavoritos((prev) => [...prev, atleta]);
  };

  const removerFavorito = (atleta: Atleta) => {
    setFavoritos((prev) => prev.filter((item) => item !== atleta));
  };

  const arr = atletas.length > 6 ? atletas.slice(0, 6) : atletas;

  return (
    <ThemedView style={styles.view}>
      <ThemedText>Home</ThemedText>
      <TextInput
        style={styles.input}
        value={nomeAtleta}
        onChange={(e) => {
          setNomeAtleta(e.nativeEvent.text);
        }}
      />
      <Button title="Buscar" onPress={buscarAtletas} />
      <ThemedText>Atletas</ThemedText>
      <PagerView style={{ width: "100%", height: "20%" }} initialPage={0}>
        {arr.map((atleta, index) => (
          <View
            key={index}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View>
              <Image
                source={atleta.image_path}
                contentFit="cover"
                transition={1000}
                style={{ width: "100%" }}
              />
            </View>
            <ThemedText>{atleta.common_name}</ThemedText>
            <Button
              title="Adicionar"
              onPress={() => adicionarFavorito(atleta)}
            />
          </View>
        ))}
      </PagerView>
      <ThemedText>Favoritos</ThemedText>
      {favoritos.map((atleta) => (
        <View key={atleta.player_id}>
          <ThemedText>{atleta.common_name}</ThemedText>
          <Button title="Remover" onPress={() => removerFavorito(atleta)} />
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    paddingLeft: 10,
    color: "white",
    borderWidth: 1,
  },
  view: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
