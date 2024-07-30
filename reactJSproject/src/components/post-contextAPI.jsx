import { createContext, useEffect, useState } from "react";

const PostData = createContext({
    data:[],
    loading:false,
})

export const PostDataProvider = ({children}) =>{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const postsFetching = async () => {

            try {
                setLoading(true);
                const fetching = await fetch("./data.json");
                if (!fetching.ok) {
                    console.log("Error occured while fetching data.");
                }
                const res = await fetching.json();
                setData(res.mediaPostData);
            } catch (e) {
                console.error(e);
            }
            finally{
                setLoading(false);
            }
        }
        postsFetching();
    }, [])

    return(
         <PostData.Provider value={{data, loading}}>{children}</PostData.Provider>

    )
}
export default PostData;