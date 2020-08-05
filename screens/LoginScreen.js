import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import ImageTop from "../components/UI/ImageTop"
import * as authActions from "../store/actions/auth";
import defStyle from "../constants/Style";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("merci de saisir un email valide"),
  password: Yup.string(),
});

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async (values) => {
    let action;
    action = authActions.login(values.email, values.password);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
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
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={authHandler}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <Text style={styles.h1}>Mesure d'épaisseur de cuves</Text>
            <Text style={styles.h2}>Connectez-vous pour commencer</Text>
            <Card style={styles.authContainer}>
              <ScrollView>
                <Input
                  name="email"
                  label="E-Mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Input
                  name="password"
                  label="Password"
                  keyboardType="default"
                  secureTextEntry
                  autoCapitalize="none"
                />
                <View style={styles.buttonContainer}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : (
                    <Button
                      title={"Login"}
                      color={Colors.primary}
                      onPress={handleSubmit}
                    />
                  )}
                </View>
              </ScrollView>
            </Card>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ...defStyle,
  h1: {
    ...defStyle.h1,
    textAlign: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
});

export default LoginScreen;
