import createReducer from './createReducer';
import * as actionTypes from 'src/actions/actionTypes';

const initialState = {
            _id: '',
            name: '',
            firstName:'',
            lastName: '',
            roomName: '',
            avatar: `https://firebasestorage.googleapis.com/v0/b/chat-app-71bd1.appspot.com/o/images%2Fme.jpg?alt=media&token=bc48310f-6dea-436f-b09d-9d3f5c57b126`
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