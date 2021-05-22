import { useEffect } from "react";
import { logOutUser } from "../actions/auth";
import { Redirect } from "react-router-dom";
const Logout = ({ dispatch }) => {
    useEffect(() => {
        window.localStorage.removeItem("token");
        dispatch(logOutUser());
    }, [dispatch]);
    return <Redirect to="/" />;
};
export default Logout;
