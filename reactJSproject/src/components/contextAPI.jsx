import { createContext, useEffect, useState, useReducer } from "react";

const INITIAL_STATE={
    posts:[],
    error:null
};

const postReducer = (state, action)=>{

    if(action.type === "CREATE_POST"){
        return {
            ...state,
            posts: [...state.posts, action.payload],
            error: null
        }
    }else if(action.type === "SET_POSTS"){
        return{
            ...state, posts:action.payload,
            error:null
        }
    }
    
    else{return state;}
}

const Data = createContext({
    user: [],
    posts: [],
    CreatePost:()=>{}
})

export const PostDataProvider = ({ children }) => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        const postsFetching = async () => {

            try {
                const fetching = await fetch("./data.json");
                if (!fetching.ok) {
                    console.log("Error occured while fetching data.");
                }
                const res = await fetching.json()
                setUser(res.users);
                dispatch({ type: "SET_POSTS", payload: res.posts });
            } catch (e) {
                console.error(e);
            }
        }
        postsFetching();
    }, [])

     const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

     const CreatePost = (signature, title, description, image, video) => {
        console.log("called")
        dispatch({
            type:"CREATE_POST",
            payload:{
                signature,
                title,
                description,
                image,
                video
            }
        })
    }
    return (
        <Data.Provider value={{ posts:state.posts, user, CreatePost }}>{children}</Data.Provider>

    )
}
export default Data;
