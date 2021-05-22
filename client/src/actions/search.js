import { APIurls } from "../helpers/urls";
import { UPDATE_SEARCH } from "./actionTypes";

export const updateSearch = (results) => ({
    type: UPDATE_SEARCH,
    results,
});

export const searchUsers =
    (query, pageNumber = 1, limit = 1) =>
    (dispatch) => {
        fetch(APIurls.searchUser(query, pageNumber, limit), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(updateSearch(data.users));
            });
    };
