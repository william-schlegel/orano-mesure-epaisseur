import React from "react";
import { StyleSheet, View, Button, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import ImageTop from "../components/UI/ImageTop";
import defStyle from "../constants/Style";
import { saveOptions } from "../store/actions/options";

const ConfigSchema = Yup.object().shape({
  freqEch: Yup.number(),
});

const OptionsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const Options = useSelector((state) => {
    return state.options;
  });

  const submit = (values) => {
    dispatch(saveOptions({ freqEch: parseFloat(values.freqEch) }));
    navigation.goBack();
  };

  return (
    <>
      <ImageTop />
      <Formik
        initialValues={{
          freqEch: Options.freqEch.toString(),
        }}
        validationSchema={ConfigSchema}
        onSubmit={submit}
      >
        {({ handleSubmit }) => (
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <ScrollView>
                <Input
                  name="freqEch"
                  label="Fréquence d'échantillonage"
                  keyboardType="decimal-pad"
                  unite="MHZ"
                />
                <View style={{ marginTop: 10 }}>
                  <Button
                    title="Enregistrer"
                    color={Colors.primary}
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

const styles = StyleSheet.create({
  ...defStyle,
});

export default OptionsScreen;
