import "./styles/main.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBell, faCirclePlus, faFire, faReply, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () =>{

    return(
        <>
        <header className="sidebar">
        <div className="side-menu">
        <div className="nav-logo">OpenChat</div>
        <ul className="sidebar-options">
            <li className="option no-decoration"><FontAwesomeIcon icon={faHouse} className="option-icon"/>Home</li>
            <li className="option no-decoration"><FontAwesomeIcon icon={faFire} className="option-icon"/>Popular</li>
            <li className="option no-decoration"><FontAwesomeIcon icon={faReply} className="option-icon"/>Responses</li>
            <li className="option no-decoration"><FontAwesomeIcon icon={faCirclePlus} className="option-icon"/>Create</li>
            <li className="option no-decoration"><FontAwesomeIcon icon={faBell} className="option-icon"/>Notifications</li>
            <li className="option no-decoration"><FontAwesomeIcon icon={faRightFromBracket} className="option-icon"/>Logout</li>
        </ul>
        <div className="sidebar-profile">
            <img src="./profile.png" className="profile-image" />
            <div className="profile-data">
                <div className="profile-name"><h3>Gomzy Dhingra</h3></div>
                <div className="profile-link"><span>visit profile</span></div>
            </div>
        </div>
        </div>
        </header>
        </>
    )
}
export default Sidebar;