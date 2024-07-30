import "./styles/mini-profile.css"


const MiniProfile = ({data}) => {
    
    const profileImage = data.profileImage;

    return (
        <div className="mini-profile">
            <img src={`${profileImage}`} className="mini-profile-image" />
            <div className="mini-profile-data">
                <div className="mini-profile-name"><h4>{data.name}</h4><span className="mini-profile-username">~@{data.userName}</span></div>
                <div className="mini-profile-title"><div>"{data.title}"</div></div>
            </div>
        </div>
    )
}
export default MiniProfile;