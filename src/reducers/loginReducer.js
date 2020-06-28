/* Login Reducer
 * handles login states in the app
 */
import createReducer from './createReducer';
import * as actionTypes from 'src/actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    username: '',
    password: '',
    message:'',
    title:'',
    isLoading:false
};

export const loginReducer = createReducer(initialState, {
    [actionTypes.LOGIN_REQUEST](state) {
        return {
            isLoading:true,
            isLoggedIn:false,
            title:'',
            message:''
        };
    },
    [actionTypes.LOGIN_FAILED](state,action) {
        return {
            isLoggedIn: false,
            isLoading:false,
            title:action.title,
            message:action.message
        };
    },
     [actionTypes.LOGIN_SUCCESS](state) {
        return {
            isLoggedIn: false,
            isLoading:false,
            title:'',
            message:''
        };
    }
});
