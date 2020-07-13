import * as types from './actionTypes';


export function setupRoom(values) {
    return {
        type: types.SETUP_ROOM,
           _id: values._id,
           name:values.name,
           firstName:values.firstName,
           lastName:values.lastName,
           roomName:values.roomName,
           avatar:values.avatar
    };
}