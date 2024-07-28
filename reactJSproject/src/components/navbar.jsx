import "./styles/navbar.css"
import { useState } from "react";

const Navbar = () => {

    const [login, setLogin] = useState(false)

    return (
    <nav className="navbar0">
        <div className="nav-logo"><h1>OpenChat</h1></div>
        <div className="nav-menu">
<div className="nav-menuLinks nav-menu1">
    <div className="menu-links"><span className="links">Home</span></div>
    <div className="menu-links"><span className="links">Create</span></div>
    <div className="menu-links"><span className="links">Options</span></div>
</div>
<div className="nav-menuLinks nav-menu2">
<div className="menu-links"><span className="links">{login ? "SignUp" : "login"}</span></div>
<div className="menu-links"><span className="links">About</span></div>
</div>
        </div>
    </nav>)

}
export default Navbar;
