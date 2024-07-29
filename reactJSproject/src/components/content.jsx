import "./styles/main.css"
import MainContent from "./main-content";
import MessagePanel from "./message-panel";

const Content = () =>{

    return(
        <>
        <div className="content">
        <MainContent/>
        <MessagePanel/>
        </div>
        </>
    )
}
export default Content;