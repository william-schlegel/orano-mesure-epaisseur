import React, { useState } from "react";
import { StyleSheet, Text, View, Platform, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "./UI/Card";
import Colors from "../constants/Colors";
import MainButton from "./UI/MainButton";
import SegmentItem from "./SegmentItem";

const SondageItem = (props) => {
  const [detail, setDetail] = useState(false);

  const toggleDetails = () => {
    setDetail((value) => !value);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MainButton onPress={() => props.editSondage(props.sondage.id_sondage)}>
          <Text>{props.sondage.id_sondage}</Text>
        </MainButton>
        <Text style={styles.texte}>Alt.: {props.sondage.z}</Text>
        <Text style={styles.texte}>Méth.: {props.sondage.methode}</Text>
        <MainButton onPress={toggleDetails}>
          <Ionicons
            name={detail ? "md-remove" : "md-add"}
            size={24}
            color="white"
          />
        </MainButton>
      </View>
      {detail &&
        props.sondage.segments.map((seg) => (
          <SegmentItem key={props.sondage + "_" + seg.segment} segment={seg} />
        ))}
    </Card>
  );
};

export default SondageItem;

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  sondage: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    color: "white",
    padding: 5,
  },
  texte: {
    paddingHorizontal: 10,
  },
});
