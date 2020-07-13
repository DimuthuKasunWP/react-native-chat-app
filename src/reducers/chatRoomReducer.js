import createReducer from './createReducer';
import * as actionTypes from 'src/actions/actionTypes';

const initialState = {
            _id: '',
            name: '',
            firstName:'',
            lastName: '',
            roomName: '',
            avatar: `https://firebasestorage.googleapis.com/v0/b/chat-app-71bd1.appspot.com/o/images%2F2d4b3495-ba64-434b-b801-155c9d3c6749.content%3A%2Fmedia%2Fexternal%2Fimages%2Fmedia%2F28876?alt=media&token=d50db69f-4318-47b6-ac1c-0a3413446c08`
};

export const chatRoomReducer = createReducer(initialState, {
    [actionTypes.SETUP_ROOM](state,action) {
        return {
            ...state,
            _id: action._id,
            name:action.name,
           firstName:action.firstName,
           lastName:action.lastName,
           roomName:action.roomName,
           avatar:action.avatar
        };
    }
});