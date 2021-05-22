import { UPDATE_POSTS, SET_LOADING, ADD_POST, TOGGLE_LIKE, DELETE_POST, LOGOUT_USER, ADD_COMMENT } from "../actions/actionTypes";
export default function posts(state = { posts: [], loading: false }, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case LOGOUT_USER:
            return {
                ...state,
                posts: [],
                loading: false,
            };
        case ADD_POST:
            return {
                posts: [action.post, ...state.posts],
                loading: false,
            };
        case DELETE_POST:
            return {
                ...state,
                posts: [...state.posts.filter((post) => post._id !== action.postId)],
            };
        case TOGGLE_LIKE:
            const { likeOf } = action.paylod;
            let posts;
            if (likeOf === "comment") {
                posts = state.posts.map((post) => {
                    if (post._id === action.paylod.pId) {
                        post.comments.map((comment) => {
                            if (comment._id === action.paylod.likeOfId) {
                                if (action.paylod.deleted) comment.likes = comment.likes.filter((like) => like._id !== action.paylod.like._id);
                                else comment.likes = [action.paylod.like, ...comment.likes];
                            }
                            return comment;
                        });
                    }
                    return post;
                });
            } else {
                posts = state.posts.map((post) => {
                    if (post._id === action.paylod.likeOfId) {
                        if (!action.paylod.deleted) post["likes"] = [action.paylod.like, ...post.likes];
                        else {
                            post["likes"] = post["likes"].filter((like) => like._id !== action.paylod.like._id);
                        }
                    }
                    return post;
                });
            }
            return { ...state, posts };
        case ADD_COMMENT:
            let psts = state.posts.map((post) => {
                if (post._id === action.comment.post) {
                    post.comments = [action.comment, ...post.comments];
                    return post;
                } else {
                    return post;
                }
            });
            return {
                ...state,
                posts: psts,
            };
        case UPDATE_POSTS:
            return { ...state, posts: [...state.posts, ...action.posts], loading: false };
        default:
            return state;
    }
}
