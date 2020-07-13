// creating action creators
import * as loginActions from './loginActions';
import * as cameraActions from './cameraActions';
import * as chatRoomActions from './chatRoomActions';

export const ActionCreators = Object.assign(
    {},
    loginActions,
    cameraActions,
    chatRoomActions
  
);
