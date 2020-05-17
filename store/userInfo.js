
// ACTION TYPES
const CHANGE_USERNAME = "CHANGE_USERNAME";
const CHANGE_IMAGE = "CHANGE_IMAGE";

// SELECTORS

export const MODULE_NAME = "userSettings" ;

export const getUserInfo = (state) =>   state[MODULE_NAME].userInfo ; 

// REDUCERS

const initialState = {
  userInfo: {
    username: "guest_00",
    imageURL: "https://www.pinclipart.com/picdir/middle/148-1486972_mystery-man-avatar-circle-clipart.png" ,
  },
};

export function userInfoReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_USERNAME : 
      return {
        ...state , 
        userInfo: {
          ...state.userInfo ,
          username : payload ,
        }
      }
    case CHANGE_IMAGE : 
      return {
        ...state,
        userInfo: {
          ...state.userInfo ,
          imageURL : payload ,
        }
      }
    default:
      return state;
  }
}

// ACTION CREATERS


export const changeUsername = (payload) => ({
    type : CHANGE_USERNAME , 
    payload ,
})

export const changeImageURL = (payload) => ( {
  type : CHANGE_IMAGE ,
  payload ,
} )