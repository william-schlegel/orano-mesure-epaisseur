import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Picker,
  FlatList,
  Modal,
  Text,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LineChart } from "react-native-chart-kit";

import IconButton from "../components/UI/IconButton";
import Colors from "../constants/Colors";
import ImageTop from "../components/UI/ImageTop";
import * as mesuresActions from "../store/actions/mesure";
import defStyle from "../constants/Style";
import EntreeMesure from "../components/EntreeMesure";

export const JournalMesures = ({ navigation }) => {
  const [showDate, setShowDate] = useState(0);
  const [dateDeb, setDateDeb] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [idCapteur, setIdCapteur] = useState("");
  const [showModal, setShowModal] = useState({id: ""});

  const dispatch = useDispatch();

  const minDate = useSelector((state) => state.mesures.minDate);
  const maxDate = useSelector((state) => state.mesures.maxDate);
  const listeMesures = useSelector((state) => state.mesures.liste);
  const listeSelected = useSelector((state) => state.mesures.selected);
  const listeCapteurs = useSelector((state) => state.mesures.listeCapteurs);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Journal des mesures",
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(mesuresActions.initMesures());
  }, [dispatch]);

  useEffect(() => {
    setDateDeb(minDate);
    setDateFin(maxDate);
  }, [minDate, maxDate]);

  const selectMesures = () => {
    dispatch(mesuresActions.selectMesures(dateDeb, dateFin, idCapteur));
  };

  const show = (value) => {
    setShowDate(value);
  };

  const onChange = (event, selectedDate) => {
    setShowDate(0);
    if (showDate === 1) setDateDeb(selectedDate || dateDeb);
    else setDateFin(selectedDate || dateFin);
  };

  const evolutionCapteur = (idCapteur) => {
    setShowModal(idCapteur);
  };

  const findData = (idCapteur) => {
    const mesures = listeMesures
      .filter((lm) => lm.idCapteur === idCapteur)
      .map((lm) => {
        return { dateMesure: lm.dateMesure, epaisseur: lm.epaisseur };
      });
    const labels = [];
    const data = [];
    for (const m of mesures) {
      labels.push(moment(m.dateMesure).format("MM/YY"));
      data.push(m.epaisseur);
    }
    return {
      labels,
      datasets: [{ data }],
    };
  };

  return (
    <View style={styles.screen}>
      <Modal visible={showModal.id !== ""}>
        <Text style={styles.h1}>Evolution capteur {showModal.nom}</Text>
        <LineChart
          data={findData(showModal.id)}
          width={Dimensions.get("window").width - 10}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: () => Colors.accent,
            labelColor: () => Colors.primary,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: Colors.primary,
              fill: Colors.primary,
            },
          }}
          bezier
          style={{
            margin: 5,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          <Button
            title="Fermer"
            onPress={() => setShowModal({id: ""})}
            color={Colors.primary}
            style={{ witdh: "100%" }}
          />
        </View>
      </Modal>
      <ImageTop />
      <View style={styles.row}>
        <View style={styles.button}>
          <Button
            title={`Début : ${moment(dateDeb).format("DD/MM/YYYY")}`}
            onPress={() => show(1)}
            color={Colors.primary}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={`Fin : ${moment(dateFin).format("DD/MM/YYYY")}`}
            onPress={() => show(2)}
            color={Colors.primary}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Picker
          selectedValue={idCapteur}
          onValueChange={(value) => setIdCapteur(value)}
          style={{ width: "70%" }}
        >
          <Picker.Item key="TOUT" label="Tous les capteurs" value="" />
          {listeCapteurs.map((c) => (
            <Picker.Item key={c.idCapteur} label={c.nomCapteur} value={c.idCapteur} />
          ))}
        </Picker>
        <IconButton
          icon="md-search"
          onPress={selectMesures}
          color={Colors.accent}
        />
      </View>
      <FlatList
        data={listeSelected}
        renderItem={({ item }) => (
          <EntreeMesure
            item={item}
            onClickId={() => evolutionCapteur({id: item.idCapteur, nom: item.nomCapteur})}
          />
        )}
        keyExtractor={(item) => `K-${item.id}`}
      />
      {showDate > 0 && (
        <DateTimePicker
          value={showDate === 1 ? dateDeb : dateFin}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ...defStyle,
  cardContainer: {
    ...defStyle.cardContainer,
    justifyContent: "flex-start",
  },
  cardCentered: {
    ...defStyle.cardContainer,
  },
  row: {
    ...defStyle.row,
    justifyContent: "space-between",
  },
  button: {
    margin: 5,
    width: "45%",
  },
});
