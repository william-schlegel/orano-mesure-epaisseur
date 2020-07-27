import {
  ADD_CAPTEUR,
  SELECT_CAPTEUR,
  CLEAR_CAPTEUR,
  UPDATE_CAPTEUR,
} from "../actions/capteur";
import Capteur from "../../models/capteur";

const initialState = {
  liste: [],
  selected: new Capteur(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAPTEUR: {
      const liste = state.liste;
      liste.push(
        new Capteur(
          action.macAddress,
          action.id,
          action.materiau,
          action.description,
          parseFloat(action.vitesseProp),
          action.zone,
          parseFloat(action.alerte),
          action.photo
        )
      );
      return { ...state, liste };
    }
    case UPDATE_CAPTEUR: {
      const liste = state.liste;
      const id = liste.findById((l) => l.macAddress === action.macAddress);
      if (id < 0) return state;
      liste[id] = new Capteur(
        action.macAddress,
        action.id,
        action.materiau,
        action.description,
        parseFloat(action.vitesseProp),
        action.zone,
        parseFloat(action.alerte),
        action.photo
      );
      return { ...state, liste };
    }
    case SELECT_CAPTEUR: {
      const capteur = state.liste.find(
        (c) => c.macAddress === action.macAddress
        );

      return {
        ...state,
        selected: new Capteur(
          capteur.macAddress,
          capteur.id,
          capteur.materiau,
          capteur.description,
          capteur.vitesseProp,
          capteur.zone,
          capteur.alerte,
          capteur.photo
        ),
      };
    }
    case CLEAR_CAPTEUR:
      return initialState;
    default:
      return state;
  }
};
