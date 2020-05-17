import {createStore , combineReducers} from "redux";
import { listTypesReducer ,MODULE_NAME as projectsModuleName } from "./listTypes";
import {userInfoReducer , MODULE_NAME as userSettingsModuleName} from "./userInfo"

export const rootReducer = combineReducers( { 
  [projectsModuleName]  :  listTypesReducer,
  [userSettingsModuleName] : userInfoReducer,
} )

export  const store = createStore(rootReducer);

export default store ;  