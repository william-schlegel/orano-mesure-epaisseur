import React, { useLayoutEffect, useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import ImageTop from "../components/UI/ImageTop";
import * as capteurActions from "../store/actions/capteur";
import defStyle from "../constants/Style";
import { DEBUG } from "../constants/Server";
import { courbe } from "../data/courbe";
import DessinCourbe from "../components/DessinCourbe";

const ConfigSchema = Yup.object().shape({
  debutA: Yup.number(),
  largeurA: Yup.number(),
  seuilA: Yup.number(),
  debutB: Yup.number(),
  largeurB: Yup.number(),
  seuilB: Yup.number(),
});

export const ConfigMesure = ({ navigation }) => {
  const dispatch = useDispatch();
  const SelectedCapteur = useSelector((state) => {
    return state.capteurs.selected;
  });

  useLayoutEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    if (parent)
      parent.setOptions({
        headerTitle: `Mesure capteur ${SelectedCapteur.id}`,
      });
  }, [navigation, SelectedCapteur]);

  const lanceMesure = (values) => {
    // TODO : valeur par défaut     dispatch(capteurActions.setDefault(values));
    // enregistrer les valeurs dans le capteur
    dispatch(
      capteurActions.updateCapteur({
        ...SelectedCapteur,
        debutA: values.debutA,
        largeurA: values.largeurA,
        seuilA: values.seuilA,
        debutB: values.debutB,
        largeurB: values.largeurB,
        seuilB: values.seuilB,
      })
    );
    navigation.navigate("courbe", { mesure: true });
  };

  return (
    <>
      <ImageTop />
      <Formik
        initialValues={{
          debutA: SelectedCapteur.debutA.toString(),
          largeurA: SelectedCapteur.largeurA.toString(),
          seuilA: SelectedCapteur.seuilA.toString(),
          debutB: SelectedCapteur.debutB.toString(),
          largeurB: SelectedCapteur.largeurB.toString(),
          seuilB: SelectedCapteur.seuilB.toString(),
        }}
        validationSchema={ConfigSchema}
        onSubmit={lanceMesure}
      >
        {({ handleSubmit }) => (
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <ScrollView>
                <View style={styles.row}>
                  <Input
                    name="debutA"
                    label="Début porte A"
                    keyboardType="decimal-pad"
                    unite="µs"
                    half
                  />
                  <Input
                    name="largeurA"
                    label="Largeur porte A"
                    keyboardType="decimal-pad"
                    unite="µs"
                    half
                  />
                </View>
                <Input
                  name="seuilA"
                  label="Seuil porte A"
                  keyboardType="decimal-pad"
                  unite="%"
                  half
                />
                <View style={styles.row}>
                  <Input
                    name="debutB"
                    label="Début porte B"
                    keyboardType="decimal-pad"
                    unite="µs"
                    half
                  />
                  <Input
                    name="largeurB"
                    label="Largeur porte B"
                    keyboardType="decimal-pad"
                    unite="µs"
                    half
                  />
                </View>
                <Input
                  name="seuilB"
                  label="Seuil porte B"
                  keyboardType="decimal-pad"
                  half
                  unite="%"
                />
                <View style={{ marginTop: 10 }}>
                  <Button
                    title="Lancer la mesure"
                    color={Colors.accent}
                    onPress={handleSubmit}
                  />
                </View>
              </ScrollView>
            </Card>
          </View>
        )}
      </Formik>
    </>
  );
};

export const CourbeMesure = ({ navigation, route }) => {
  const [mesure, setMesure] = useState(route.params && route.params.mesure);
  const [points, setPoints] = useState([]);
  const [freqEchMHz, setFreqEchMHz] = useState(125);

  useEffect(() => {
    if (mesure) {
      // TODO: lancer la mesure
      if (DEBUG) {
        setPoints(courbe.points);
        setFreqEchMHz(courbe.freqEchMHz);
      }
    }
    setMesure(false);
  }, [mesure]);

  const handleMesure = () => {
    setMesure(true);
  };

  const saveMesure = () => {
    
    navigation.goBack()
  }

  return (
    <>
      {/* <ImageTop /> */}
      {mesure && <ActivityIndicator size="large" style={styles.activity} />}
      {!mesure && (
        <>
          <DessinCourbe
            points={points}
            freqEchMHz={freqEchMHz}
            vertical={false}
            height={300}
            width={0}
          />
          <Text style={styles.h2}>Mesure: 4.98mm</Text>
          <View style={styles.button}>
            <Button
              title="relancer une mesure"
              color={Colors.accent}
              onPress={handleMesure}
            />
            <Button
              title="Enregistrer la mesure"
              color={Colors.primary}
              onPress={saveMesure}
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ...defStyle,
  container: {
    ...defStyle.container,
    alignItems: "stretch",
  },
  button: {
    marginHorizontal: 10,
  },
});
