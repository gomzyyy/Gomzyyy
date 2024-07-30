import "./styles/posts.css"
import Post from "./post";
import PostData from "./post-contextAPI";
import { useContext } from "react";

const Posts = () => {

    const {data} = useContext(PostData)

    return (
        <div className="posts">
         {data.map((data, i)=><Post key={i} data={data}/>)}
        </div>
    )
}
export default Posts;