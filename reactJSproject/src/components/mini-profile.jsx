import "./styles/mini-profile.css"
import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Data from "./contextAPI"


const MiniProfile = ({posts}) => {


    const verifiedUser = posts.verified;

    const profileImage = posts.profileImage;

    return (
        <div className="mini-profile">
            <img src={`${posts.profileImage}`} className="mini-profile-image" />
            <div className="mini-profile-data">
                <div className="mini-profile-name"><h4>{posts.name}</h4><span className="mini-profile-username">~@{posts.userName}</span> {verifiedUser && <span className="verified"><FontAwesomeIcon icon={faCircleCheck} className="post-icon" /></span>}</div>
                <div className="mini-profile-title"><div>"{posts.title}"</div></div>
            </div>
        </div>
    )
}
export default MiniProfile;