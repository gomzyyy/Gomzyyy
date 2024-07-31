import "./styles/mini-profile.css"



const MiniProfile = ({user}) => {

    
    const profileImage = user.profileImage;

    return (
        <div className="mini-profile">
            <img src={`${user.profileImage}`} className="mini-profile-image" />
            <div className="mini-profile-data">
                <div className="mini-profile-name"><h4>{user.name}</h4><span className="mini-profile-username">~@{user.userName}</span></div>
                <div className="mini-profile-title"><div>"{user.title}"</div></div>
            </div>
        </div>
    )
}
export default MiniProfile;