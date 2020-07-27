import { AsyncStorage } from "react-native";

export const CLEAR_CAPTEUR = "CLEAR_CAPTEUR";
export const ADD_CAPTEUR = "ADD_CAPTEUR";
export const UPDATE_CAPTEUR = "UPDATE_CAPTEUR";
export const SELECT_CAPTEUR = "SELECT_CAPTEUR";

export const clearCapteurs = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CAPTEUR,
    });
  };
};

export const addCapteur = (
  macAddress,
  id,
  materiau,
  description,
  vitesseProp,
  zone,
  alerte
) => {
  return async (dispatch) => {
    // TODO: enregistre le capteur sur le serveur

    dispatch({
      type: ADD_CAPTEUR,
      macAddress,
      id,
      materiau,
      description,
      vitesseProp,
      zone,
      alerte,
    });
  };
};

export const updateCapteur = (
  macAddress,
  id,
  materiau,
  description,
  vitesseProp,
  zone,
  alerte
) => {
  return async (dispatch) => {
    // TODO: enregistre le capteur sur le serveur

    dispatch({
      type: UPDATE_CAPTEUR,
      macAddress,
      id,
      materiau,
      description,
      vitesseProp,
      zone,
      alerte,
    });
  };
};

export const selectCapteur = (macAddress) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_CAPTEUR,
      macAddress,
    });
  };
};

const saveDataToStorage = (
  macAddress,
  id,
  materiau,
  description,
  vitesseProp,
  zone,
  alerte
) => {
  AsyncStorage.setItem(
    "capteurs",
    JSON.stringify({
      macAddress,
      id,
      materiau,
      description,
      vitesseProp,
      zone,
      alerte,
    })
  );
};
