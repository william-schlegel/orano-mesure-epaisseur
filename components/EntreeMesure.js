import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Card from "./UI/Card";
import IconButton from "./UI/IconButton";
import defStyle from "../constants/Style";
import DessinCourbe from "../components/DessinCourbe";

export default function EntreeMesure({ item }) {
  const [detail, setDetail] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.ligneTexte}>
            <Text>{item.idCapteur}</Text>
            <Text>{item.dateMesure}</Text>
            <Text>{item.epaisseur}</Text>
            <IconButton
              icon={detail ? "md-eye-off" : "md-eye"}
              onPress={() => setDetail(!detail)}
            />
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  ...defStyle,
  cardContainer: {
    ...defStyle.cardContainer,
    justifyContent: "flex-start",
  },
  ligneTexte: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
