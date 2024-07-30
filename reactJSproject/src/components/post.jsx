import "./styles/posts.css"
import "./styles/universal.css"
import MiniProfile from "./mini-profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faChartSimple, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";


const Post = () => {

  const [visible, setVisible] = useState(true);

  const handleVisible = () =>{setVisible(!visible)}

  return (

    <div className="post-card">
      <div className="post-profile">
        <MiniProfile />
      </div>
      <div className={`post-description ${visible && "txtOverflowManage"}`} onClick={handleVisible}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab non atque blanditiis consequuntur rem debitis ea, iusto inventore molestias commodi dicta ratione accusamus officia repellendus accusantium possimus, incidunt perspiciatis veniam?
      </div>
      <div className="post-operations">
        <div className="post-reaction">
          <div className="post-like"><FontAwesomeIcon icon={faThumbsUp} className="post-icon"/></div>
          <div className="post-comment"><FontAwesomeIcon icon={faComment} className="post-icon"/></div>
        </div>
        <div className="post-behaviour">
          <div className="post-reach"><FontAwesomeIcon icon={faChartSimple} className="post-icon"/></div>
          <div className="post-save"><FontAwesomeIcon icon={faBookmark} className="post-icon"/></div>
        </div>
      </div>
    </div>

  )
}
export default Post;