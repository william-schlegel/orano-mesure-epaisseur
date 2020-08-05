import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  Button,
} from "react-native";
import useFetch from "use-http";
import { useDispatch } from "react-redux";

import ImageTop from "../components/UI/ImageTop";
import { SERVEUR, DEBUG } from "../constants/Server";
import { Capteurs, CapteursData } from "../data/capteurs";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import {
  selectCapteur,
  addCapteur,
  clearCapteurs,
} from "../store/actions/capteur";
import defStyle from "../constants/Style";

export default function RechercheCapteursScreen({ navigation }) {
  const [recherche, setRecherche] = useState(true);
  const [capteurs, setCapteurs] = useState([]);
  const [capteursData, setCapteursData] = useState([]);
  const { get, response, loading, error } = useFetch(`${SERVEUR}/capteurs`);
  const dispatch = useDispatch();

  useEffect(() => {
    if (DEBUG) {
      setCapteurs(Capteurs);
      setRecherche(false);
    }

    // TODO: recherche via bluetooth
  }, [Capteurs, DEBUG]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Recherche de capteurs",
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(clearCapteurs());
    const dataCapteur = async (mac) => {
      let info;
      if (DEBUG) {
        info = CapteursData.find((c) => c.macAddress === mac) || {
          macAddress: mac,
        };
      } else {
        info = await get(`/${mac}`);
        if (!response.ok) info = { macAddress: mac };
      }
      dispatch(addCapteur(info));
      return info;
    };

    const infos = [];
    const searchInfos = async () => {
      for (const c of capteurs) {
        const info = await dataCapteur(c);
        infos.push(info);
      }
      setCapteursData(infos);
    };
    searchInfos();
  }, [capteurs]);

  const selectCapt = useCallback((macAddress) => {
    dispatch(selectCapteur(macAddress));
    navigation.navigate("Mesure", { macAddress });
  }, []);
  const configure = useCallback((macAddress) => {
    dispatch(selectCapteur(macAddress));
    navigation.navigate("Config", { macAddress });
  }, []);

  const renderItem = ({ item }) => {
    // item contient la mac address
    return (
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            {item.id && (
              <View>
                <View style={styles.ligneTexte}>
                  <Text>{item.id}</Text>
                  <Text>{item.description}</Text>
                  <Text>{item.dernierReleve}</Text>
                </View>
                <View style={styles.buttons}>
                  <Button
                    color={Colors.primary}
                    onPress={() => selectCapt(item.macAddress)}
                    title="Sélectionner"
                    style={styles.button}
                  />
                  <Button
                    color={Colors.accent}
                    onPress={() => configure(item.macAddress)}
                    title="Configurer"
                    style={styles.button}
                  />
                </View>
              </View>
            )}
            {!item.id && (
              <View>
                <Text>Inconnu</Text>
                <Button
                  color={Colors.accent}
                  onPress={() => configure(item.macAddress)}
                  title="Configurer"
                />
              </View>
            )}
          </View>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ImageTop />
      <View style={styles.container}>
        {loading && <Text style={styles.h1}>Recherche de capteurs</Text>}
        {error && (
          <Text style={{ color: "red" }}>
            Erreur lors de la récupération des capteurs
          </Text>
        )}
        {recherche && <Text>Recherche de capteurs</Text>}
        <Text style={styles.h1}>Capteurs détectés</Text>
        <FlatList
          data={capteursData}
          renderItem={renderItem}
          keyExtractor={(item) => item.macAddress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ...defStyle,
  ligneTexte: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  button: {
    width: "100%",
    marginHorizontal: 5,
  },
});
