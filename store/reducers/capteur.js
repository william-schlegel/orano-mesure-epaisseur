import {
  ADD_CAPTEUR,
  SELECT_CAPTEUR,
  CLEAR_CAPTEUR,
  UPDATE_CAPTEUR,
  SET_DEFAULT,
} from "../actions/capteur";
import Capteur from "../../models/capteur";

const initialState = {
  liste: [],
  selected: new Capteur(),
  configDefaut: {
    debutA: 9.3,
    largeurA: 6,
    seuilA: 6,
    debutB: 10.2,
    largeurB: 6,
    seuilB: 5,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT: {
      return {
        ...state,
        configDefaut: {
          debutA: action.data.debutA,
          largeurA: action.data.largeurA,
          seuilA: action.data.seuilA,
          debutB: action.data.debutB,
          largeurB: action.data.largeurB,
          seuilB: action.data.seuilB,
        },
      };
    }
    case ADD_CAPTEUR: {
      const liste = state.liste;
      liste.push(
        new Capteur(
          action.data.macAddress,
          action.data.id,
          action.data.materiau,
          action.data.description,
          parseFloat(action.data.vitesseProp),
          action.data.zone,
          parseFloat(action.data.alerte),
          action.data.photo,
          action.data.debutA || state.configDefaut.debutA,
          action.data.largeurA || state.configDefaut.largeurA,
          action.data.seuilA || state.configDefaut.seuilA,
          action.data.debutB || state.configDefaut.debutB,
          action.data.largeurB || state.configDefaut.largeurB,
          action.data.seuil || state.configDefaut.seuilB
        )
      );
      return { ...state, liste };
    }
    case UPDATE_CAPTEUR: {
      const liste = state.liste;
      const id = liste.findIndex((l) => l.macAddress === action.macAddress);
      if (id < 0) return state;
      liste[id] = new Capteur(
        action.data.macAddress,
        action.data.id,
        action.data.materiau,
        action.data.description,
        parseFloat(action.data.vitesseProp),
        action.data.zone,
        parseFloat(action.data.alerte),
        action.data.photo,
        action.data.debutA || state.configDefaut.debutA,
        action.data.largeurA || state.configDefaut.largeurA,
        action.data.seuilA || state.configDefaut.seuilA,
        action.data.debutB || state.configDefaut.debutB,
        action.data.largeurB || state.configDefaut.largeurB,
        action.data.seuil || state.configDefaut.seuilB
      );
      const selected = (state.selected.macAddress === action.data.macAddress) ? liste[id] : state.selected        
      return { ...state, selected, liste };
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
          capteur.photo,
          capteur.debutA || state.configDefaut.debutA,
          capteur.largeurA || state.configDefaut.largeurA,
          capteur.seuilA || state.configDefaut.seuilA,
          capteur.debutB || state.configDefaut.debutB,
          capteur.largeurB || state.configDefaut.largeurB,
          capteur.seuil || state.configDefaut.seuilB
        ),
      };
    }
    case CLEAR_CAPTEUR:
      return initialState;
    default:
      return state;
  }
};
