import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import MenuScreen from "../screens/MenuScreen";
import ConfigScreen from "../screens/ConfigCapteurScreen";
import RechercheCapteursScreen from "../screens/RechercheCapteursScreen";
import { ConfigMesure, CourbeMesure } from "../screens/MesureScreen";
import { JournalMesures } from "../screens/JournalScreen"
import Colors from "../constants/Colors";

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
      <MesureStackNavigator.Screen name="Journal" component={JournalMesures} />
      <MesureStackNavigator.Screen name="Mesure" component={MesureNavigator} />
      <MesureStackNavigator.Screen name="Config" component={ConfigScreen} />
    </MesureStackNavigator.Navigator>
  );
};

const MesureTabNavigator = createBottomTabNavigator();

export const MesureNavigator = () => {
  return (
    <MesureTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "md-close-circle";
          if (route.name === "config")
            iconName =
              Platform.OS === "android" ? "md-settings" : "ios-settings";
          else if (route.name === "courbe")
            iconName = Platform.OS === "android" ? "md-stats" : "ios-stats";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.accent,
        inactiveTintColor: "gray",
      }}
    >
      <MesureTabNavigator.Screen name="config" component={ConfigMesure} />
      <MesureTabNavigator.Screen
        name="courbe"
        component={CourbeMesure}
      />
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
