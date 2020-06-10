import { SET_APP_DATA } from "../utils/AS_utils";

// Action Types

const ADD_NEW_LIST = "ADD_NEW_LIST";
const TOGGLE_ITEM_TO_BUY = "TOGGLE_ITEM_TO_BUY";
const RESET_SHOPLIST = "RESET_SHOPLIST";
const DELETE_SHOPLIST = "DELETE_SHOPLIST";
const DELETE_ITEM_TO_BUY = "DELETE_ITEM_TO_BUY";
const ADD_ITEM_TO_BUY = "ADD_ITEM_TO_BUY";
const EDIT_ITEM_TO_BUY = "EDIT_ITEM_TO_BUY";

// Selectors
export const MODULE_NAME = "shopList";

export const getListTypes = (state) => state[MODULE_NAME].listTypes;
export const getItemsToBuy = (state, route) =>
  state[MODULE_NAME].listTypes
    .filter((listType) => listType.name === route.params.listType)[0]
    .shopLists.filter((item) => item.id === route.params.listId)[0]?.itemsToBuy;

// REDUCERS

let initialState = {
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
              completed: false,
              unitType: "kg",
            },
            {
              id: `${Math.random()}${Date.now()}`,
              name: "Avacado",
              amount: 0.5,
              completed: false,
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

export function listTypesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_APP_DATA:
      return {
        ...state,
        ...payload.lists,
      };

    case ADD_NEW_LIST:
      return {
        ...state,
        listTypes: state.listTypes.map((item) => {
          if (payload.sectionName === item.name) {
            return {
              ...item,
              shopLists: [
                ...item.shopLists,
                {
                  id: payload.listId,
                  name: payload.name,
                  completed: false,
                  itemsToBuy: [],
                },
              ],
            };
          }
          return item;
        }),
      };
    case RESET_SHOPLIST: {
      return {
        ...state,
        listTypes: state.listTypes.map((listType) => {
          if (listType.id === payload.sectionId) {
            return {
              ...listType,
              shopLists: listType.shopLists.map((shopList) => {
                if (shopList.id === payload.listId) {
                  return {
                    ...shopList,
                    itemsToBuy: shopList.itemsToBuy.map((listItem) => {
                      return {
                        ...listItem,
                        completed: false,
                      };
                    }),
                  };
                }
              }),
            };
          }
          return listType;
        }),
      };
    }
    case DELETE_SHOPLIST:
      return {
        ...state,

        listTypes: state.listTypes.map((listType) => {
          if (listType.name === payload.listType) {
            return {
              ...listType,
              shopLists: listType.shopLists.filter(
                (shopList) => shopList.id !== payload.listId
              ),
            };
          }
          return listType;
        }),
      };

    case TOGGLE_ITEM_TO_BUY:
      return {
        ...state,
        listTypes: state.listTypes.map((listType) => {
          if (listType.name === payload.listType) {
            return {
              ...listType,
              shopLists: listType.shopLists.map((shopList) => {
                if (shopList.id === payload.listId) {
                  return {
                    ...shopList,
                    itemsToBuy: shopList.itemsToBuy.map((itemToBuy) => {
                      if (itemToBuy.id === payload.listItemId) {
                        return {
                          ...itemToBuy,
                          completed: !itemToBuy.completed,
                        };
                      }
                      return itemToBuy;
                    }),
                  };
                }
                return shopList;
              }),
            };
          }
          return listType;
        }),
      };
    case DELETE_ITEM_TO_BUY:
      return {
        ...state,
        listTypes: state.listTypes.map((listType) => {
          if (listType.name === payload.listType) {
            return {
              ...listType,
              shopLists: listType.shopLists.map((shopList) => {
                if (shopList.id === payload.listId) {
                  return {
                    ...shopList,
                    itemsToBuy: shopList.itemsToBuy.filter(
                      (itemToBuy) => itemToBuy.id !== payload.listItemId
                    ),
                  };
                }
                return shopList;
              }),
            };
          }
          return listType;
        }),
      };
    case ADD_ITEM_TO_BUY:
      return {
        ...state,
        listTypes: state.listTypes.map((listType) => {
          if (listType.name === payload.listType) {
            return {
              ...listType,
              shopLists: listType.shopLists.map((shopList) => {
                if (shopList.id === payload.listId) {
                  return {
                    ...shopList,
                    itemsToBuy: [
                      ...shopList.itemsToBuy,
                      {
                        id: `${Math.random()}${Date.now()}`,
                        name: payload.name,
                        amount: payload.amount,
                        unitType: payload.unitType,
                        completed: false,
                      },
                    ],
                  };
                }
                return shopList;
              }),
            };
          }
          console.log("returned wekwek");
          return listType;
        }),
      };
    case EDIT_ITEM_TO_BUY:
      return {
        ...state,
        listTypes: state.listTypes.map((listType) => {
          if (listType.name === payload.listType) {
            return {
              ...listType,
              shopLists: listType.shopLists.map((shopList) => {
                if (shopList.id === payload.listId) {
                  return {
                    ...shopList,
                    itemsToBuy: shopList.itemsToBuy.map((itemToBuy) => {
                      if (itemToBuy.id === payload.listItemId) {
                        return {
                          ...itemToBuy,
                          name: payload.name,
                          amount: payload.amount,
                          unitType: payload.unitType,
                        };
                      }
                      return itemToBuy;
                    }),
                  };
                }
                return shopList;
              }),
            };
          }
          return listType;
        }),
      };
    default:
      return state;
  }
}

//ACTION CREATORS

export const addNewList = (payload) => {
  return {
    type: ADD_NEW_LIST,
    payload,
  };
};

export const resetShoplist = (payload) => {
  return {
    type: RESET_SHOPLIST,
    payload,
  };
};

export const deleteShoplist = (payload) => {
  return {
    type: DELETE_SHOPLIST,
    payload,
  };
};

export const toggleItemToBuy = (payload) => {
  return {
    type: TOGGLE_ITEM_TO_BUY,
    payload,
  };
};

export const deleteItemToBuy = (payload) => {
  return {
    type: DELETE_ITEM_TO_BUY,
    payload,
  };
};

export const addItemToBuy = (payload) => {
  return {
    type: ADD_ITEM_TO_BUY,
    payload,
  };
};

export const editItemToBuy = (payload) => {
  return {
    type: EDIT_ITEM_TO_BUY,
    payload,
  };
};
