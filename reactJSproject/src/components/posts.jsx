import "./styles/posts.css"
import Post from "./post";
import Data from "./contextAPI";
import { useContext } from "react";

const Posts = () => {

    const { posts, user } = useContext(Data);


    return (
        <div className="posts">
            {posts.map((data, i) => <Post key={i} data={data} />)}
        </div>
    )
}
export default Posts;