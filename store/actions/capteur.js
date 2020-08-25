import { addDocument } from "../../helpers/firebase";
import Capteur from "../../models/capteur";

export const CLEAR_CAPTEUR = "CLEAR_CAPTEUR";
export const ADD_CAPTEUR = "ADD_CAPTEUR";
export const UPDATE_CAPTEUR = "UPDATE_CAPTEUR";
export const SELECT_CAPTEUR = "SELECT_CAPTEUR";
export const SET_DEFAULT = "SET_DEFAULT";

export const setDefault = (capteurData) => {
  return (dispatch) => {
    dispatch({
      type: SET_DEFAULT,
      data: capteurData,
    });
  };
};

export const clearCapteurs = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CAPTEUR,
    });
  };
};

/**
 * ajoute un capteur identifié dans la liste
 * @param {Object} capteurData data du capteur récupéré
 */
export const addCapteur = (capteurData) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_CAPTEUR,
      data: capteurData,
    });
  };
};

/**
 * mise à jour capteur
 * @param {Object} capteurData met à jour le capteur dans la liste et sur le serveur
 */
export const updateCapteur = (capteurData) => {
  return async (dispatch) => {
    const res = await addDocument("capteur", capteurData.macAddress, {...new Capteur(
      capteurData.macAddress,
      capteurData.nom,
      capteurData.materiau,
      capteurData.description,
      capteurData.vitesseProp,
      capteurData.zone,
      capteurData.alerte,
      capteurData.photo,
      capteurData.debutA,
      capteurData.largeurA,
      capteurData.seuilA,
      capteurData.debutB,
      capteurData.largeurB,
      capteurData.seuilB
    )});
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