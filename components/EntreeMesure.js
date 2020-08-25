import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import moment from "moment"

import Card from "./UI/Card";
import IconButton from "./UI/IconButton";
import defStyle from "../constants/Style";
import DessinCourbe from "../components/DessinCourbe";
import Colors from "../constants/Colors";

export default function EntreeMesure({ item, onClickId }) {
  const [detail, setDetail] = useState(false);
  const [largCanvas, setLargCanvas] = useState(0);

  useEffect(() => {
    const dim = Dimensions.get("window");
    const w = dim.width;
    const prct = parseFloat(styles.card.width.slice(0, 2));
    const pad = parseFloat(styles.card.padding);
    const margin = parseFloat(styles.cardContent.margin);
    setLargCanvas(w * (prct / 100) - (margin + pad) * 2);
  }, [Dimensions]);

  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.ligneTexte}>
            <Button
              title={item.nomCapteur}
              onPress={onClickId}
              color={Colors.accent}
            />
            <Text>{moment(item.dateMesure).format("DD/MM/YYYY")}</Text>
            <Text>{item.epaisseur} mm</Text>
            <IconButton
              icon={detail ? "md-arrow-dropup" : "md-arrow-dropdown"}
              onPress={() => setDetail(!detail)}
              color={Colors.primary}
            />
          </View>
          {detail && (
            <View style={{ width: "100%", height: 230 }}>
              <DessinCourbe
                points={item.points}
                freqEchMHz={item.freqEchMHz}
                dataMesure={{
                  debutA: item.debutA,
                  largeurA: item.largeurA,
                  seuilA: item.seuilA,
                  debutB: item.debutB,
                  largeurB: item.largeurB,
                  seuilB: item.seuilB,
                }}
                vertical={false}
                width={largCanvas}
                height={180}
              />
              <Text>
                Porte A : {item.debutA.toFixed(1)} -{">"}{" "}
                {item.largeurA.toFixed(1)} µs ({item.seuilA.toFixed(1)}%)
              </Text>
              <Text>
                Porte B : {item.debutB.toFixed(1)} -{">"}{" "}
                {item.largeurB.toFixed(1)} µs ({item.seuilB.toFixed(1)}%)
              </Text>
            </View>
          )}
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
