import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import ImageTop from "../components/UI/ImageTop";
import Capteur from "../models/capteur";

const initialState = {};

export const OptionsMesure = ({}) => {
  const SelectedCapteur = useSelector((state) => {
    return state.capteurs.selected;
  });
  return {
    title: "Mesure capteur" + SelectedCapteur.id,
  };
};

export const ConfigMesure = () => {
  return <Text>config</Text>;
};

export const CourbeMesure = () => {
  return <Text>courbe</Text>;
};

const styles = StyleSheet.create({});
