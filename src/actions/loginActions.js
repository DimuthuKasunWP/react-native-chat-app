/*
 * Reducer actions related with login
 */
import * as types from './actionTypes';

export function requestLogin() {
    return {
        type: types.LOGIN_REQUEST
       
    };
}

export function loginFailed(ttl,msg) {
    return {
        type: types.LOGIN_FAILED,
        title:ttl,
        message:msg
    };
}


export function loginSuccess() {
    return {
        type: types.LOGIN_SUCCESS
    };
}