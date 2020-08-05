import { AsyncStorage } from "react-native";

export const CLEAR_CAPTEUR = "CLEAR_CAPTEUR";
export const ADD_CAPTEUR = "ADD_CAPTEUR";
export const UPDATE_CAPTEUR = "UPDATE_CAPTEUR";
export const SELECT_CAPTEUR = "SELECT_CAPTEUR";
export const SET_DEFAULT = "SET_DEFAULT";

export const setDefault = (capteurData) => {
  return (dispatch) => {
    dispatch({
      type: SET_DEFAULT,
      data: capteurData
    })
  }
}


export const clearCapteurs = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CAPTEUR,
    });
  };
};

export const addCapteur = (capteurData) => {
  return async (dispatch) => {
    // TODO: enregistre le capteur sur le serveur
    dispatch({
      type: ADD_CAPTEUR,
      data: capteurData,
    });
  };
};

export const updateCapteur = (capteurData) => {
  return async (dispatch) => {
    // TODO: enregistre le capteur sur le serveur

    dispatch({
      type: UPDATE_CAPTEUR,
      data: capteurData,
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

const saveDataToStorage = (capteurData) => {
  AsyncStorage.setItem(
    "capteurs",
    JSON.stringify({
      ...capteurData,
    })
  );
};
