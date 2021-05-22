import { START_SEARCH, UPDATE_SEARCH } from "../actions/actionTypes";

const searchReducer = (
    state = {
        loading: false,
        results: [],
    },
    action
) => {
    switch (action.type) {
        case START_SEARCH:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_SEARCH:
            return {
                ...state,
                results: action.results,
                loading: false,
            };
        default:
            return state;
    }
};

export default searchReducer;
