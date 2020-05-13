import {createStore , combineReducers} from "redux";
import { listTypesReducer } from "./listTypes";
import {userInfoReducer} from "./userInfo"

export const rootReducer = combineReducers( { 
  shopList  :  listTypesReducer,
  userSettings : userInfoReducer,
} )

export  const store = createStore(rootReducer);

export default store ;