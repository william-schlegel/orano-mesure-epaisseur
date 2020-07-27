import { AsyncStorage } from "react-native";

import { DEBUG, SERVEUR } from "../../constants/Server";
import { fetchUser } from "../../data/user";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, userName) => {
  return (dispatch) => {
    console.log("authenticate - userId", userId);
    dispatch({ type: AUTHENTICATE, userId, userName });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    console.log("login", `${SERVEUR}/login`);
    let resData;
    if (DEBUG) {
      resData = await fetchUser();
    } else {
      const response = await fetch(`${SERVEUR}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log("response", JSON.stringify(response));
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        throw new Error(errorId);
      }

      resData = await response.json();
    }
    console.log(resData);
    dispatch(authenticate(resData.userId, resData.username));
    console.log("save data");
    saveDataToStorage(resData.userId, resData.username);
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const saveDataToStorage = (userId, userName) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId,
      userName,
    })
  );
};
