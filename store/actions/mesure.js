import { addDocument, getDocuments } from "../../helpers/firebase";

export const ADD_MESURE = "ADD_MESURE";
export const INIT_MESURES = "INIT_MESURES";
export const SELECT_MESURES = "SELECT_MESURES";

export const addMesure = (capteurData, dateMesure, epaisseur, points) => {
  return async (dispatch) => {
    await addDocument("capteur", capteurData.macAddress, {
      dernierReleve: dateMesure.toISOString(),
    });
    await addDocument("mesure", undefined, {
      idCapteur: capteurData.macAddress,
      nomCapteur: capteurData.nomCapteur,
      debutA: parseFloat(capteurData.debutA),
      largeurA: parseFloat(capteurData.largeurA),
      seuilA: parseFloat(capteurData.seuilA),
      debutB: parseFloat(capteurData.debutB),
      largeurB: parseFloat(capteurData.largeurB),
      seuilB: parseFloat(capteurData.seuilB),
      dateMesure: dateMesure.toISOString(),
      epaisseur,
      points,
    });
    dispatch({
      type: ADD_MESURE,
      data: capteurData,
      dateMesure,
      epaisseur,
      points,
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
  return async (dispatch) => {
    const liste = await getDocuments("mesure");
    dispatch({
      type: INIT_MESURES,
      liste,
    });
  };
};
