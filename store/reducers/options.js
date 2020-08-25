import { GET_OPTIONS, SAVE_OPTIONS } from "../actions/options";

const initialState = {
  freqEch: 100,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_OPTIONS: {
      return state;
    }
    case SAVE_OPTIONS: {
      return { ...state, ...action.options };
    }
    default:
      return state;
  }
};
