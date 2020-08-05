import React, { useLayoutEffect } from "react";
import { StyleSheet, Button, View } from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import { logout } from "../store/actions/auth";
import ImageTop from "../components/UI/ImageTop";
import defStyle from "../constants/Style";

export default function MenuScreen({ navigation }) {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Menu principal",
    });
  }, [navigation]);

  const handleButton = (menu) => {
    navigation.navigate(menu);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.screen}>
      <ImageTop />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <ButtonMenu
            title={"Recherche capteurs"}
            onPress={() => handleButton("Recherche")}
          />
          <ButtonMenu
            title={"Journal des mesures"}
            onPress={() => handleButton("Journal")}
          />
          <ButtonMenu
            title={"Synchroniser avec le serveur"}
            onPress={() => handleButton("Synchro")}
          />
          <ButtonMenu
            title={"Se déconnecter"}
            onPress={handleLogout}
            color={Colors.accent}
          />
        </View>
      </View>
    </View>
  );
}

const ButtonMenu = ({ title, onPress, color }) => {
  return (
    <View style={styles.button}>
      <Button
        title={title}
        color={color || Colors.primary}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ...defStyle,
  buttonContainer: {
    width: "80%",
  },
  button: {
    marginVertical: 10,
  },
});
