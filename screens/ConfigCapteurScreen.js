import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  ScrollView,
  ActivityIndicator,
  Button,
  Picker,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import useFetch from "use-http";
import { useSelector } from "react-redux";

import Input from "../components/UI/Input";
import ImageTop from "../components/UI/ImageTop";
import * as capteurActions from "../store/actions/capteur";
import { SERVEUR, DEBUG } from "../constants/Server";
import { Materiaux } from "../data/materiaux";
import Colors from "../constants/Colors";

const CapteurSchema = Yup.object().shape({
  id: Yup.string().required("id obligatoire"),
  materiau: Yup.string(),
  description: Yup.string(),
  vitesseProp: Yup.number(),
  zone: Yup.string(),
  alerte: Yup.number(),
});

export default function ConfigCapteurScreen({ navigation }) {
  const dispatch = useDispatch();
  const { post, response, loading, error } = useFetch(`${SERVEUR}/capteurs`);
  const [materiaux, setMateriaux] = useState([]);
  const selectedCapteur = useSelector((state) => {
    return state.capteurs.selected;
  });
  useEffect(() => {
    if (DEBUG) setMateriaux(Materiaux);
    else {
      // TODO: fetch materiaux
    }
  }, [Materiaux]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCapteur.id
        ? `Configuration capteur ${selectedCapteur.id}`
        : "Configuration nouveau capteur",
    });
  }, [navigation]);

  const submitHandler = async (values) => {
    await dispatch(
      capteurActions.updateCapteur(
        values.macAddress,
        values.id,
        values.materiau,
        values.description,
        values.vitesseProp,
        values.zone,
        values.alerte
      )
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <ImageTop />
      <Formik
        initialValues={{
          macAddress: selectedCapteur.macAddress,
          id: selectedCapteur.id,
          description: selectedCapteur.description,
          materiau: selectedCapteur.materiau,
          vitesseProp: selectedCapteur.vitesseProp.toString(),
          zone: selectedCapteur.zone,
          alerte: selectedCapteur.alerte.toString(),
        }}
        validationSchema={CapteurSchema}
        onSubmit={submitHandler}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <ScrollView>
            <View style={styles.container}>
              <Input name="macAddress" label="Adresse MAC" editable={false} />
              <View style={styles.row}>
                <Input
                  name="id"
                  label="Id capteur"
                  half
                  autoCapitalize="characters"
                />
                <View
                  style={{
                    width: "50%",
                    paddingHorizontal: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Matériau mesuré</Text>
                  <Picker
                    selectedValue={values.materiau}
                    onValueChange={(value, index) => {
                      setFieldValue("materiau", value);
                      const mat = materiaux.find((m) => m.id === value);
                      if (mat)
                        return setFieldValue(
                          "vitesseProp",
                          mat.vitesseProp.toString()
                        );
                    }}
                  >
                    {materiaux &&
                      materiaux.map((m) => (
                        <Picker.Item
                          key={m.id}
                          label={m.description}
                          value={m.id}
                        />
                      ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.row}>
                <Input
                  name="description"
                  label="Description"
                  keyboardType="default"
                  half
                />
                <Input
                  name="vitesseProp"
                  label="Vitesse de propagation"
                  keyboardType="decimal-pad"
                  half
                />
              </View>
              <View style={styles.row}>
                <Input
                  name="zone"
                  label="Zone"
                  half
                  autoCapitalize="sentences"
                />
                <Input
                  name="alerte"
                  label="Seuil d'alerte"
                  keyboardType="decimal-pad"
                  half
                />
              </View>
              <View style={styles.buttonContainer}>
                {loading ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                  <Button
                    title={"Enregistrer"}
                    color={Colors.primary}
                    onPress={handleSubmit}
                  />
                )}
              </View>
              {error && (
                <Text style={{ color: "red" }}>
                  Erreur lors de l'enregistrement
                </Text>
              )}
            </View>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  row: {
    flexDirection: "row",
  },
  h1: {
    width: "100%",
    fontSize: 25,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
