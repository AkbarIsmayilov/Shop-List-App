// Action Types

import { AsyncStorage } from "react-native";

const ADD_NEW_LIST = "ADD_NEW_LIST";

// Selectors
export const MODULE_NAME = "shopList";

export const getListTypes = (state) => state[MODULE_NAME].listTypes;

// REDUCERS


  let  initialState =  {
    listTypes: [
      {
        id: `${Math.random()}${Date.now()}`,
        name: "Regular",
        completed: false,
        shopLists: [
          {
            id: `${Math.random()}${Date.now()}`,
            name: "Everything for Breakfast",
            completed: false,
            itemsToBuy: [
              {
                id: `${Math.random()}${Date.now()}`,
                name: "Apple",
                amount: 2,
                unitType: "kg",
                completed: true,
              },
              {
                id: `${Math.random()}${Date.now()}`,
                name: "Avacado",
                amount: 0.5,
                unitType: "kg",
                completed: true,
              },
              {
                id: `${Math.random()}${Date.now()}`,
                name: "Rye",
                completed: true,
                amount: 3,
                unitType: "pkg",
              },
              {
                id: `${Math.random()}${Date.now()}`,
                completed: true,
                name: "Orangejuice",
                amount: 1,
                unitType: "litr",
              },
            ],
          },
        ],
      },
      {
        id: `${Math.random()}${Date.now()}`,
        name: "One Time",
        completed: false,
        shopLists: [
          {
            id: `${Math.random()}${Date.now()}`,
            name: "Everything for Breakfast",
            completed: false,
            itemsToBuy: [
              {
                id: `${Math.random()}${Date.now()}`,
                name: "Apple",
                amount: 2,
                completed: true,
                unitType: "kg",
              },
              {
                id: `${Math.random()}${Date.now()}`,
                name: "Avacado",
                amount: 0.5,
                completed: true,
  
                unitType: "kg",
              },
              {
                id: `${Math.random()}${Date.now()}`,
                name: "Rye",
                amount: 3,
                completed: true,
                unitType: "pkg",
              },
              {
                id: `${Math.random()}${Date.now()}`,
                name: "Orangejuice",
                amount: 1,
                completed: true,
                unitType: "litr",
              },
            ],
          },
        ],
      },
    ],
  };

const _loadInitialState = async () => {
  try {
    let raw_value = await AsyncStorage.getItem('listTypeState') ;
    let value = await raw_value.json() ;
    if (value != null){
      initialState = { ...value} ;
    }
    else {
      _storeData();
     }
    }
  catch (error) {

  }
} 

const _storeData = async (state) => {
  try {
    await AsyncStorage.setItem('listTypeState', JSON.stringify( state ? state : initialState));
  } catch (error) {
    // Error saving data
  }
};

_loadInitialState();


export function listTypesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_NEW_LIST:
      return {
        ...state ,
        listTypes: 
          state.listTypes.map((item) => {
            if (payload.sectionId === item.id) {
              return {
                ...item,
                shopLists: [
                  ...item.shopLists,
                  {
                    id: `${Math.random()}${Date.now()}`,
                    name : payload.name ,
                    completed: false,
                    itemsToBuy: [],
                  },
                ],
              };
            }
            return item ;
          }),
        
      }
    default:
      return state;
  }

}



//ACTION CREATERS

export const addNewList = (payload) => {
  return {
    type: ADD_NEW_LIST ,
    payload,
  };
};
