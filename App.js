import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { YellowBox } from "react-native";

import authReducers from "./store/reducers/auth";
import captReducers from "./store/reducers/capteur";
import mesuresReducers from "./store/reducers/mesure";
import optionsReducers from "./store/reducers/options";

import AppNavigator from "./navigation/AppNavigator";
import { init } from "./helpers/db";

import "./helpers/firebase";

init()
  .then(console.log("Databse ok"))
  .catch((err) => {
    console.log("Databse failed", err);
  });

const rootReducer = combineReducers({
  capteurs: captReducers,
  mesures: mesuresReducers,
  auth: authReducers,
  options: optionsReducers,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
    ...Ionicons.font,
  });
};

export default function App() {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
