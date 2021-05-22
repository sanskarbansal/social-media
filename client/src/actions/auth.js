import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, RESET_SIGNUP, SIGNUP_FAILED, SIGNUP_START, SIGNUP_SUCCESS, LOGOUT_USER } from "./actionTypes";
import { APIurls } from "../helpers/urls";
import jwtdecode from "jwt-decode";
import { fetchPosts } from "./posts";
export const startLogin = () => ({
    type: LOGIN_START,
});
export const login = (username, password) => (dispatch) => {
    dispatch(startLogin());
    fetch(APIurls.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) return dispatch(loginFailed(data.error));
            const user = jwtdecode(data.token);
            window.localStorage.setItem("token", data.token);
            dispatch(setUser(user));
        })
        .catch((error) => {
            dispatch(loginFailed("SERVER DOWN"));
        });
};

export const loginFailed = (error) => ({
    type: LOGIN_FAILED,
    error,
});

export const setUser = (user) => (dispatch) => {
    dispatch(fetchPosts(1));
    dispatch({
        type: LOGIN_SUCCESS,
        user,
    });
};

export const signUpStart = () => ({
    type: SIGNUP_START,
});
export const signUpFailed = (error) => ({
    type: SIGNUP_FAILED,
    error,
});

export const signUpSuccess = () => ({
    type: SIGNUP_SUCCESS,
    message: "SIGNED UP SUCCESSFULLY",
});
export const signup = (userDetails) => (dispatch) => {
    const { firstName, lastName, username, email, number, password } = userDetails;
    dispatch(signUpStart());
    fetch(APIurls.signup, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, username, email, mobileNumber: number, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) return dispatch(signUpFailed(data.error));
            dispatch(signUpSuccess(data.message));
        })
        .catch((error) => {
            dispatch(signUpFailed("SERVER DOWN"));
        });
};

export const resetSignup = () => ({
    type: RESET_SIGNUP,
    message: "SIGNED UP SUCCESSFULLY",
});

export const logOutUser = () => ({
    type: LOGOUT_USER,
});
