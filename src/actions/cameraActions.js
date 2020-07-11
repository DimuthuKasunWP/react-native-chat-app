import * as types from './actionTypes';

// export const addImage = (data) => {
//   return dispatch => {
//     dispatch(setSpinner())
//     fetch('', {
//       method: "POST", 
//       body: JSON.stringify({
//         imageId: data.base64
//       })
//     })
//     .catch(err => console.log('the error', err))
//     .then(res => {
//         return res.json()
//     })
//     .then(parsedRes => {
//       // console.log(parsedRes)
//       const imageData = {
//         imageName: 'No image name',
//         imageUrl: parsedRes.imageUrl,
//         imagePath: parsedRes.imagePath
//       }
//       return fetch('', {
//         method: 'POST',
//         body: JSON.stringify(imageData)
//       })
//     })
//     .then(res => res.json())
//     .then(parsedRes => {
//         dispatch(imageIsAdded())
//         return parsedRes
//     })
//     .catch(err => console(err))
//   }
// }

export function imageIsAdded(values){
  return {
    type: types.ADD_IMAGE,
    data:values.data,
    uri:values.uri
  };
}

// export const setSpinner = () => {
//   return {
//     type: 'SET_SPINNER',
//   }
// }

// export const setImageAddedHandlerToFalse = () => {
//   return {
//     type: 'SET_SPINNER_TO_FALSE',
//   }
// }

// export const getImageHandler = () => {
//   return dispatch => {
//     fetch('')
//     .catch(err => console.log(err))
//     .then(res => {
//       return res.json()
//     })
//     .then(parsedRes => {
//       const imageList = Object.keys(parsedRes).map(key  => {
//         return {
//           imageId: key,
//           name: parsedRes[key].imageName,
//           url: parsedRes[key].imageUrl,
//           path: parsedRes[key].imagePath
//         }
//       })
//       dispatch(getImage(imageList))
//     })
//   }
// }

// const getImage = (imageList) => {
//   return {
//     type: 'GET_IMAGE',
//     payload: imageList
//   }
// }

// export const changeImageName = (id, name) => {
  
//   return dispatch => {
//     fetch(''+ id +'/imageName' +'.json/', {
//       method: "PUT",
//       body: JSON.stringify(name)
//     })
//     .catch(err=> console.log(err))
//     .then(res => {return res.json()})
//     .then(parsedRes => {
//       dispatch(getImageHandler())
//     })
    
//   }
// }

// export const deleteImage = (imageId) => {
//   return dispatch => {
//     fetch('' + imageId + '.json/', {
//       method: 'DELETE'
//     })
//     .catch(err=> console.log(err))
//       .then(res => {return res.json()})
//       .then(parsedRes => {
//         // console.log('parsed', parsedRes)
//         dispatch(getImageHandler())
//       }
//     )
//   }
// }