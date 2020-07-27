import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import LoginScreen from "../screens/LoginScreen";
import MenuScreen from "../screens/MenuScreen";
import ConfigScreen from "../screens/ConfigCapteurScreen";
import RechercheCapteursScreen from "../screens/RechercheCapteursScreen";
import {
  ConfigMesure,
  CourbeMesure,
  OptionsMesure,
} from "../screens/MesureScreen";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import { TabActions } from "@react-navigation/native";

/*------------- Stack navigator -----------------------*/

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "Roboto_medium",
  },
  headerBackTitleStyle: {
    fontFamily: "Roboto",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const MesureStackNavigator = createStackNavigator();

export const MainNavigator = () => {
  return (
    <MesureStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MesureStackNavigator.Screen name="Menu" component={MenuScreen} />
      <MesureStackNavigator.Screen
        name="Recherche"
        component={RechercheCapteursScreen}
      />
      <MesureStackNavigator.Screen
        name="Mesure"
        component={MesureNavigator}
        screenOptions={OptionsMesure}
      />
      <MesureStackNavigator.Screen name="Config" component={ConfigScreen} />
    </MesureStackNavigator.Navigator>
  );
};

const MesureTabNavigator = createBottomTabNavigator();

export const MesureNavigator = () => {
  return (
    <MesureTabNavigator.Navigator>
      <MesureTabNavigator.Screen name="config" component={ConfigMesure} />
      <MesureTabNavigator.Screen name="courbe" component={CourbeMesure} />
    </MesureTabNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen name="Auth" component={LoginScreen} />
    </AuthStackNavigator.Navigator>
  );
};
