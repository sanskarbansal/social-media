import posts from "./posts";
import auth from "./auth";
import { combineReducers } from "redux";
import search from "./search";
export default combineReducers({
    posts,
    auth,
    search,
});
