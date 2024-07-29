import "./styles/main.css"
import "./styles/universal.css"
import NavbarMain from "./navbar-main";
import Posts from "./posts";
import { useState } from "react";


const MainContent = () => {

    const [posts, setPosts] = useState(false)

    return (

        <div className="main-content">
            <NavbarMain />
          {posts ? <Posts/>: <span className="text-center fetching-noPost">No Posts Available</span> } 
        </div>

    )
}
export default MainContent;