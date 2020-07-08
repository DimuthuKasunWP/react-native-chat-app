const initialState = {
  imageCollection: [],
  spinner: false,
  imageIsAdded: false

}

const image = (state = initialState, action) => {
  switch(action.type){

    case 'ADD_IMAGE': 
      return{
        ...state,
        imageIsAdded: true,
        spinner: false
      }
    case 'SET_SPINNER':
      return {
        ...state,
        spinner: true
      }
    case 'SET_SPINNER_TO_FALSE':
      return {
        ...state,
        spinner: false
      }
    case 'GET_IMAGE': 
      return {
        ...state,
        imageIsAdded: false,
        imageCollection: action.payload
      }
    default: return state
  }
}

export default image