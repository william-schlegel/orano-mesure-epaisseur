import { AsyncStorage } from "react-native";

export const GET_OPTIONS = "GET_OPTIONS";
export const SAVE_OPTIONS = "SAVE_OPTIONS";

export const getOptions = () => {
  return async (dispatch) => {
    const options = await AsyncStorage.getItem("options");
    dispatch({
      type: GET_OPTIONS,
      options: options ? JSON.parse(options) : {},
    });
  };
};

export const saveOptions = (options) => {
  return (dispatch) => {
    dispatch({ type: SAVE_OPTIONS, options });
    AsyncStorage.setItem("options", JSON.stringify(options));
  };
};
