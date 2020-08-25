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
import { useDispatch } from "react-redux";
import moment from "moment"

import ImageTop from "../components/UI/ImageTop";
import { DEBUG } from "../constants/Server";
import { Capteurs } from "../data/capteurs";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import {
  selectCapteur,
  addCapteur,
  clearCapteurs,
} from "../store/actions/capteur";
import defStyle from "../constants/Style";
import { firestoreQuery, useFirestoreQuery } from "../helpers/hooks";

export default function RechercheCapteursScreen({ navigation }) {
  const dispatch = useDispatch();
  const [recherche, setRecherche] = useState(true);
  const [capteurs, setCapteurs] = useState([]);

  useEffect(() => {
    dispatch(clearCapteurs())
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

  return (
    <SafeAreaView style={styles.screen}>
      <ImageTop />
      <View style={styles.container}>
        {recherche && <Text style={styles.h1}>Recherche de capteurs</Text>}
        <Text style={styles.h1}>Capteurs détectés</Text>
        <FlatList
          data={capteurs}
          renderItem={({ item }) => <Capteur macAddress={item.macAddress} navigation={navigation}/>}
          keyExtractor={(item) => item.macAddress}
        />
      </View>
    </SafeAreaView>
  );
}

const Capteur = ({ macAddress, navigation }) => {
  const dispatch = useDispatch();
  const { data, status, error } = useFirestoreQuery(
    firestoreQuery("capteur", macAddress)
  );

  const selectCapt = useCallback((macAddress) => {
    dispatch(selectCapteur(macAddress));
    navigation.navigate("Mesure", { macAddress });
  }, []);

  const configure = useCallback((macAddress) => {
    dispatch(selectCapteur(macAddress));
    navigation.navigate("Config", { macAddress });
  }, []);

  useEffect(() => {
    if (data) dispatch(addCapteur(data));
  }, [status, data]);

  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          {status === "loading" && <Text>chargement...</Text>}
          {status === "success" && data && (
            <View>
              <View style={styles.ligneTexte}>
                <Text>{data.nom}</Text>                
                <Text>{data.description}</Text>
                <Text>{data.dernierReleve ? moment(data.dernierReleve).format("DD/MM/YYYY") : "jamais relevé"}</Text>
              </View>
              <Text style={styles.textLight}>{data.macAddress}</Text>
              <View style={styles.buttons}>
                <Button
                  color={Colors.primary}
                  onPress={() => selectCapt(macAddress)}
                  title="Sélectionner"
                  style={styles.button}
                />
                <Button
                  color={Colors.accent}
                  onPress={() => configure(macAddress)}
                  title="Configurer"
                  style={styles.button}
                />
              </View>
            </View>
          )}
          {status === "success" && !data && (
            <View>
              <Text>Capteur inconnu <Text style={styles.textLight}>  ({macAddress})</Text></Text>
              <Button
                color={Colors.accent}
                onPress={() => configure(macAddress)}
                title="Configurer"
              />
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};

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
