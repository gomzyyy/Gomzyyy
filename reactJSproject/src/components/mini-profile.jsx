import "./styles/mini-profile.css"


const MiniProfile = () => {

    return (
        <div className="mini-profile">
            <img src="./profile.png" className="mini-profile-image" />
            <div className="mini-profile-data">
                <div className="mini-profile-name"><h4>Gomzy Dhingra</h4><span className="mini-peofile-username">~@gomzyyy</span></div>
                <div className="mini-profile-title"><div>"World tour in 80 days"</div></div>
            </div>
        </div>
    )
}
export default MiniProfile;