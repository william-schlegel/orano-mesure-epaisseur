import React, { useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, View, Button, Picker, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const dispatch = useDispatch();

  const minDate = useSelector((state) => state.mesures.minDate);
  const maxDate = useSelector((state) => state.mesures.maxDate);
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

  return (
    <View style={styles.screen}>
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
            <Picker.Item key={c} label={c} value={c} />
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
        renderItem={({ item }) => <EntreeMesure item={item} />}
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
  row: {
    ...defStyle.row,
    justifyContent: "space-between",
  },
  button: {
    margin: 5,
    width: "45%",
  },
});
