import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Button,
  Picker,
  ToastAndroid,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import Input from "../components/UI/Input";
import ImageTop from "../components/UI/ImageTop";
import * as capteurActions from "../store/actions/capteur";
import Colors from "../constants/Colors";
import defStyle from "../constants/Style";
import { firestoreQuery, useFirestoreQuery } from "../helpers/hooks";

const CapteurSchema = Yup.object().shape({
  nom: Yup.string().required("nom obligatoire"),
  materiau: Yup.string(),
  description: Yup.string(),
  vitesseProp: Yup.number(),
  zone: Yup.string(),
  alerte: Yup.number(),
});

export default function ConfigCapteurScreen({ navigation }) {
  const dispatch = useDispatch();
  const [materiaux, setMateriaux] = useState([]);
  const selectedCapteur = useSelector((state) => {
    return state.capteurs.selected;
  });
  const { data, status, error } = useFirestoreQuery(firestoreQuery("materiau"));

  useEffect(() => {
    if (status === "success" && data) {
      setMateriaux(data);
    }
  }, [data, status, setMateriaux]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCapteur.nom
        ? `Configuration capteur ${selectedCapteur.nom}`
        : "Configuration nouveau capteur",
    });
  }, [navigation]);

  const submitHandler = (values) => {
    values.photo = "";
    dispatch(capteurActions.updateCapteur(values));
    ToastAndroid.show("Configuration enregistrée", ToastAndroid.SHORT);
    navigation.goBack();
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
          nom: selectedCapteur.nom,
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
                  name="nom"
                  label="Nom capteur"
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

                  {status === "success" && data && (
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
                  )}
                  {status === "loading" && <Text>chargement...</Text>}
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
                <Button
                  title={"Enregistrer"}
                  color={Colors.primary}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  ...defStyle,
  container: { ...defStyle.container, marginHorizontal: 15 },
});
