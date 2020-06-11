import { AsyncStorage } from "react-native";

export const SET_APP_DATA = "SET_APP_DATA";
const setAppData = (payload) => ({
  type: SET_APP_DATA,
  payload,
});

const AS_DATA_KEY = "shop-lists-data";

export async function updateAS(store) {
  console.log(
    "updtetd -------------------------------- ---------------- --      -----------"
  );

  const state = store.getState();
  await AsyncStorage.setItem(AS_DATA_KEY, JSON.stringify(state));
}

export async function getDataFromAS(store) {
  const dataJSON = await AsyncStorage.getItem(AS_DATA_KEY);
  if (dataJSON) {
    const data = JSON.parse(dataJSON);
    store.dispatch(setAppData(data));
  }
}
