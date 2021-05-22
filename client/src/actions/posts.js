import { APIurls } from "../helpers/urls";
import { ADD_COMMENT, ADD_POST, DELETE_POST, SET_LOADING, TOGGLE_LIKE, UPDATE_POSTS } from "./actionTypes";
// export const fetchPosts = () => {
//     return (dispatch) => {
//         const url = "https://jsonplaceholder.typicode.com/posts";
//         dispatch(setLoading(true));
//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 dispatch(updatePosts(data));
//             });
//     };
// };

export const setLoading = (flag) => ({
    type: SET_LOADING,
    loading: flag,
});

export const updatePosts = (posts) => {
    return {
        type: UPDATE_POSTS,
        posts,
    };
};

export const addPost = (post) => ({
    type: ADD_POST,
    post,
});

export const createPost = (post) => (dispatch) => {
    fetch(`${APIurls.createPost}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify(post),
    })
        .then((res) => res.json())
        .then((data) => {
            dispatch(addPost(data));
        });
};
export const fetchPosts =
    (page, limit = 5) =>
    (dispatch) => {
        fetch(APIurls.getPosts(limit, page), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => dispatch(updatePosts(data.posts)))
            .catch((err) => console.log(err));
    };

// export const

export const updateLike = (paylod) => ({
    type: TOGGLE_LIKE,
    paylod,
});

export function toggleLike(likeOfId) {
    const pId = arguments[1];
    return (dispatch) => {
        fetch(APIurls.toggleLike, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                likeOfId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(updateLike({ ...data, likeOfId, pId }));
            });
    };
}

export const updateDeletedPost = (postId) => ({
    type: DELETE_POST,
    postId,
});

export const deletePost = (postId) => (dispatch) => {
    fetch(APIurls.deletePost, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ postId }),
    })
        .then((res) => res.json())
        .then((data) => {
            dispatch(updateDeletedPost(postId));
        });
};

export const updateComment = (comment) => ({
    type: ADD_COMMENT,
    comment,
});

export const postComment = (postId, comment) => (dispatch) => {
    fetch(APIurls.createComment, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ postId, body: comment }),
    })
        .then((res) => res.json())
        .then((data) => {
            dispatch(updateComment(data.comment));
        });
};
