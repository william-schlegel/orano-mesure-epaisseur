import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";

// affichage logos 1500 x 250

const largeur = Dimensions.get("screen").width;

export default function ImageTop() {
  const [hauteur, setHauteur] = useState(50);
  
  useEffect(() => {
    const h = largeur;
    const ratio = 250 / 1500;
    setHauteur(Math.ceil(h * ratio));
  });

  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../../assets/logo_orano_stimshop.png")}
        style={{
          width: largeur,
          height: hauteur,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
});
