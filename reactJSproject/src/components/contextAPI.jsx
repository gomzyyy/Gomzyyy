import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    posts: [],
    users: [],
    comments: [],
    error: null
};

const postReducer = (state, action) => {
    switch (action.type) {
        case "CREATE_VIDEO_POST":
        case "CREATE_IMAGE_POST":
            return {
                ...state,
                posts: [...state.posts, action.payload],
                error: null
            };
        case "CREATE_COMMENT":
            return {
                ...state,
                comments: [action.payload , ...state.comments],
                error: null
            };
        case "SET_USERS":
            return {
                ...state,
                users: action.payload,
                error: null
            };
        case "SET_POSTS":
            return {
                ...state,
                posts: action.payload,
                error: null
            };
        case "SET_COMMENTS":
            return {
                ...state,
                comments: [ action.payload , ...state.comments],
                error: null
            };
        default:
            return state;
    }
};

const Data = createContext({
    users: [],
    posts: [],
    comments: [],
    createVideoPost: () => {},
    createImagePost: () => {},
    createComment: () => {}
});

export const PostDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

    useEffect(() => {
        const postsFetching = async () => {
            try {
                const fetching = await fetch("./data.json");
                if (!fetching.ok) {
                    console.log("Error occurred while fetching data.");
                    return;
                }
                const res = await fetching.json();
                dispatch({ type: "SET_USERS", payload: res.users });
                dispatch({ type: "SET_POSTS", payload: res.posts });
                dispatch({ type: "SET_COMMENTS", payload: res.comments });
            } catch (e) {
                console.error("Error during fetch:", e);
            }
        };
        postsFetching();
    }, []);

    const createVideoPost = (name, userName, title, description, video) => {
        dispatch({
            type: "CREATE_VIDEO_POST",
            payload: {
                name,
                userName,
                title,
                description,
                video,
            }
        });
    };

    const createImagePost = (name, userName, title, description, image) => {
        dispatch({
            type: "CREATE_IMAGE_POST",
            payload: {
                name,
                userName,
                title,
                description,
                image
            }
        });
    };

    const createComment = (comment) => {
        dispatch({
            type: "CREATE_COMMENT",
            payload: comment // Directly pass the comment
        });
    };

    return (
        <Data.Provider value={{
            posts: state.posts,
            users: state.users,
            comments: state.comments,
            createVideoPost,
            createImagePost,
            createComment
        }}>
            {children}
        </Data.Provider>
    );
};

export default Data;
