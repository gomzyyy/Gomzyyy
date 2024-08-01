import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    posts: [],
    users: [],
    error: null
};

const postReducer = (state, action) => {

    if (action.type === "CREATE_VIDEO_POST") {
        return {
            ...state,
            posts: [...state.posts, action.payload],
            error: null
        }
    } else if (action.type === "CREATE_IMAGE_POST") {
        return {
            ...state,
            posts: [...state.posts, action.payload],
            error: null
        }
    }  else if (action.type === "SET_USERS") {
        return {
            ...state, users: action.payload,
            error: null
        }
    }  else if (action.type === "SET_POSTS") {
        return {
            ...state, posts: action.payload,
            error: null
        }
    }

    else { return state; }
}

const Data = createContext({
    users: [],
    posts: [],
    CreateVideoPost: () => { },
    CreateImagePost: () => { }
})

export const PostDataProvider = ({ children }) => {

    useEffect(() => {
        const postsFetching = async () => {

            try {
                const fetching = await fetch("./data.json");
                if (!fetching.ok) {
                    console.log("Error occured while fetching data.");
                }
                const res = await fetching.json()
                dispatch({type:"SET_USERS", payload: res.users})
                dispatch({ type: "SET_POSTS", payload: res.posts });
            } catch (e) {
                console.error(e);
            }
        }
        postsFetching();
    }, [])

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

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
        })
    };
    const createImagePost = (name, userName, title, description, image) => {
        console.log("called")
        dispatch({
            type: "CREATE_IMAGE_POST",
            payload: {
                name,
                userName,
                title,
                description,
                image
            }
        })
    }
    return (
        <Data.Provider value={{ posts: state.posts, users: state.users, createVideoPost, createImagePost }}>{children}</Data.Provider>

    )
}
export default Data;
