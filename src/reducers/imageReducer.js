import createReducer from './createReducer';
import * as actionTypes from 'src/actions/actionTypes';



const initialState = {
  imageCollection: [],
  spinner: false,
  imageIsAdded: false,
  data:'', 
  uri:''

}
 export const imageReducer = createReducer(initialState, {
    [actionTypes.ADD_IMAGE](state,action) {
        return {
            ...state,
            imageIsAdded: true,
            spinner: false,
            data:action.data,
            uri:action.uri
        };
    },
});


// const imageReducer = (state = initialState, action) => {
//   switch(action.type){

//     case 'ADD_IMAGE': 
//       return{
//         ...state,
//         imageIsAdded: true,
//         spinner: false,
//         data:action.data,
//         uri:action.uri
//       }
//     case 'SET_SPINNER':
//       return {
//         ...state,
//         spinner: true
//       }
//     case 'SET_SPINNER_TO_FALSE':
//       return {
//         ...state,
//         spinner: false
//       }
//     case 'GET_IMAGE': 
//       return {
//         ...state,
//         imageIsAdded: false,
//         imageCollection: action.payload
//       }
//     default: return state
//   }
// }

