import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS, SIGNUP_START, SIGNUP_FAILED, SIGNUP_SUCCESS, RESET_SIGNUP, LOGOUT_USER } from "../actions/actionTypes";
const initAuthState = {
    user: {},
    error: null,
    isLoggedIn: false,
    inProgress: false,
    signUpSuccess: false,
};
export default function authReducer(state = initAuthState, action) {
    switch (action.type) {
        case LOGIN_START:
        case SIGNUP_START:
            return {
                ...state,
                inProgress: true,
                message: "",
                error: "",
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true,
                inProgress: false,
                error: null,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                message: action.message,
                inProgress: false,
                error: null,
                isLoggedIn: false,
                signUpSuccess: true,
            };
        case LOGOUT_USER:
            return {
                ...state,
                message: "",
                inProgress: false,
                error: null,
                user: {},
                isLoggedIn: false,
            };
        case RESET_SIGNUP:
            return {
                ...state,
                signUpSuccess: false,
                message: action.message,
            };
        case LOGIN_FAILED:
        case SIGNUP_FAILED:
            return {
                ...state,
                error: action.error,
                inProgress: false,
            };

        default:
            return state;
    }
}
