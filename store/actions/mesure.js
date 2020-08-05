import { AsyncStorage } from "react-native";

export const ADD_MESURE = "ADD_MESURE";
export const INIT_MESURES = "INIT_MESURES";
export const SELECT_MESURES = "SELECT_MESURES";

export const addMesure = (capteurData, dateMesure, epaisseur, points) => {
  return async (dispatch) => {
    // TODO: enregistre la mesure sur le serveur
    dispatch({
      type: ADD_MESURE,
      data: capteurData,
      dateMesure,
      epaisseur,
      points
    });
  };
};

export const selectMesures = (dateDebut, dateFin, idCapteur) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_MESURES,
      dateDebut,
      dateFin,
      idCapteur,
    });
  };
};

export const initMesures = () => {
  return (dispatch) => {
    dispatch({
      type: INIT_MESURES,
    });
  };
};

const saveDataToStorage = (mesureData) => {
  AsyncStorage.setItem(
    "mesures",
    JSON.stringify({
      ...mesureData,
    })
  );
};
