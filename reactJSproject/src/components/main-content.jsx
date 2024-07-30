import "./styles/main.css"
import "./styles/universal.css"
import NavbarMain from "./navbar-main";
import Posts from "./posts";


const MainContent = () => {

    return (

        <div className="main-content">
            <NavbarMain />
            <div className="posts-content">
                <Posts />
            </div>
        </div>

    )
}
export default MainContent;
     {/* {posts ? <Posts/>: <span className="text-center fetching-noPost">No Posts Available</span> }  */}