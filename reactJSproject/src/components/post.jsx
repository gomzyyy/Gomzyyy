import "./styles/posts.css"
import "./styles/universal.css"
import MiniProfile from "./mini-profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faChartSimple, faBookmark, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

const Post = ({data}) => {


const imageURL = data.image;
const videoURL = data.video;

  const [visible, setVisible] = useState(false);

  const handleVisible = () => { setVisible(!visible) }

  return (

    <div className="post-card">
      <div className="post-profile">
        <MiniProfile user={data} />
      </div>
      <div className={`post-description ${!visible && "txtOverflowManage"}`} >
        <span className="load-more" >{data.description}</span>
        {!visible && <div className="visible" onClick={handleVisible}>Load more...</div>}
      </div>
      {!imageURL && !videoURL && <div className="post-media flex-JusAliCenter"><span className="post-empty">No media available for this post.</span></div>}
      {imageURL && <div className="post-media"><img src={`${imageURL}`} /></div>}
      {videoURL && <div className="post-media"><video src={`${videoURL}`} autoPlay controls muted loop></video></div>}

      <div className="post-operations">
        <div className="post-reaction">
          <div className="post-like"><FontAwesomeIcon icon={faThumbsUp} className="post-icon" /></div>
          <div className="post-comment"><FontAwesomeIcon icon={faComment} className="post-icon" /></div>
        </div>
        <div className="post-behaviour">
          <div className="post-reach"><FontAwesomeIcon icon={faChartSimple} className="post-icon" /></div>
          <div className="post-save"><FontAwesomeIcon icon={faBookmark} className="post-icon" /></div>
        </div>
      </div>
    </div>
  )
}
export default Post;