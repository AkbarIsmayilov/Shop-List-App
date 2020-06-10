import { createStore, combineReducers } from "redux";

import {
  listTypesReducer,
  MODULE_NAME as projectsModuleName,
} from "./listTypes";
import {
  userInfoReducer,
  MODULE_NAME as userSettingsModuleName,
} from "./userInfo";

import { getDataFromAS, updateAS } from "../utils/AS_utils";

export const rootReducer = combineReducers({
  [projectsModuleName]: listTypesReducer,
  [userSettingsModuleName]: userInfoReducer,
});

export const store = createStore(rootReducer);

store.subscribe(() => {
  updateAS(store);
  console.log(store.getState());
});
// Init getting data from AsyncStorage & put it to store
getDataFromAS(store);

export default store;
