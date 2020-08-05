import moment from "moment";

import { INIT_MESURES, ADD_MESURE, SELECT_MESURES } from "../actions/mesure";
import Mesure from "../../models/mesure";
import { DEBUG } from "../../constants/Server";
import { MesuresData } from "../../data/mesures";
import { courbe } from "../../data/courbe";

const initialState = {
  listeCapteurs: [],
  liste: [],
  selected: [],
  minDate: new Date(),
  maxDate: new Date(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_MESURES: {
      // TODO : lire les mesures sur localstorage
      if (DEBUG) {
        const liste = MesuresData.map((l) => {
          return { ...l, points: { ...courbe } };
        });
        const listeCapteurs = MesuresData.map((l) => l.idCapteur);
        const dates = MesuresData.map((l) =>
          moment(l.dateMesure, "DD/MM/YYYY")
        );
        return {
          ...state,
          liste,
          listeCapteurs: [...new Set(listeCapteurs)],
          minDate: moment.min(dates).toDate(),
          maxDate: moment.max(dates).toDate(),
        };
      }
      return state;
    }
    case ADD_MESURE: {
      const liste = state.liste;
      liste.push(
        new Mesure(
          action.data.idCapteur,
          action.data.debutA,
          action.data.largeurA,
          action.data.seuilA,
          action.data.debutB,
          action.data.largeurB,
          action.data.seuil,
          action.dateMesure,
          action.epaisseur,
          action.points
        )
      );
      return { ...state, liste };
    }
    case SELECT_MESURES: {
      const liste = state.liste;
      const selected = liste.filter((l) => {
        let ok = true;
        if (action.dateDebut && moment.isDate(action.dateDebut))
          ok =
            ok &&
            moment(l.dateMesure, "DD/MM/YYYY").toDate() >= action.dateDebut;
        if (action.dateFin && moment.isDate(action.dateFin))
          ok =
            ok && moment(l.dateMesure, "DD/MM/YYYY").toDate() <= action.dateFin;
        if (action.idCapteur) ok = ok && l.idCapteur === action.idCapteur;
        return ok;
      });
      return {
        ...state,
        selected: [...selected],
      };
    }
    default:
      return state;
  }
};
