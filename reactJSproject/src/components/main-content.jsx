import "./styles/main.css"
import "./styles/universal.css"
import NavbarMain from "./navbar-main";
import Posts from "./posts";
import { useState } from "react";
import Post from "./post";


const MainContent = () => {

    const [posts, setPosts] = useState(false)

    return (

        <div className="main-content">
            <NavbarMain />
            <div className="posts-content">
                <Post />
            </div>
        </div>

    )
}
export default MainContent;
     {/* {posts ? <Posts/>: <span className="text-center fetching-noPost">No Posts Available</span> }  */}