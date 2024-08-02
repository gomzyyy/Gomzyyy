import "./styles/posts.css"
import "./styles/comments.css"
import "./styles/universal.css"
import MiniProfile from "./mini-profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faChartSimple, faBookmark, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from "react";
import { useContext } from "react"
import Data from "./contextAPI"

const Post = ({ data }) => {

  const comments = data.comments;
  //contextAPI value
  const imageURL = data.image;
  const videoURL = data.video;

  const Likes = data.likeCount;
  const Comments = data.comments.length;

  //Hooks
  const [visible, setVisible] = useState(false);
  const [like, setLike] = useState(false);
  const [commentSection, setCommentSection] = useState(false);

  //functions
  const getYouTubeEmbedUrl = (link) => {
    const shortUrlPattern = /youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const longUrlPattern = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;

    let videoId = '';

    if (shortUrlPattern.test(link)) {
      videoId = link.match(shortUrlPattern)[1];
    } else if (longUrlPattern.test(link)) {
      videoId = link.match(longUrlPattern)[1];
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return "";
    }
  };

  const countConvert = (count, val) => {
    let num = count;
    let newNum;
    if (num > 999999) {
      newNum = num / 100000
      let roundedNum = Math.round(newNum * val) / val
      return roundedNum + "M";
    } else if (num >= 999) {
      newNum = num / 1000;
      let roundedNum = Math.round(newNum * val) / val;
      return roundedNum + "k";
    } else if (count < 1000) {
      return count;
    } else if (count === 0) {
      console.log(count)
      return 0;
    }
  };

  const { createComment } = useContext(Data);

  const commentEl = useRef("");

  const comment = commentEl.current.value;

  const CreateComment = () => {

    if (comment === "") {
      return;
    }
    createComment(comment);
  };

  //render handling
  const handleLike = () => { setLike(!like); }
  const handleVisible = () => { setVisible(!visible) }
  const handleComments = () => { setCommentSection(!commentSection) }
  const handleCloseComments = () => { setCommentSection(false) }


  return (
    <>
      <div className="post-card">
        <div className="post-profile">
          <MiniProfile posts={data} />
        </div>
        <div className={`post-description ${!visible && "txtOverflowManage"}`} >
          <span className="load-more" >{data.description}</span>
          {!visible && <div className="visible" onClick={handleVisible}>more</div>}
        </div>
        {!imageURL && !videoURL && <div className="post-media flex-JusAliCenter"><span className="post-empty">No media available for this post.</span></div>}
        {imageURL && <div className="post-media"><img src={`${imageURL}`} /></div>}
        {videoURL && <div className="post-media"><iframe src={`${videoURL ? getYouTubeEmbedUrl(videoURL) : videoURL}`} allowFullScreen></iframe></div>}

        <div className="post-operations">
          <div className="post-reaction">
            <div className="post-like" onClick={handleLike}><FontAwesomeIcon icon={faThumbsUp} className={`post-icon ${like ? "col-pink" : "col-icon"}`} />
              <span className="like-count">{countConvert(Likes, 10)}</span>
            </div>
            <div className="post-comment" onClick={handleComments}><FontAwesomeIcon icon={faComment} className="post-icon col-icon" />
              <span className="comment-count">{countConvert(Comments, 10)}</span>
            </div>
          </div>
          <div className="post-behaviour">
            <div className="post-reach"><FontAwesomeIcon icon={faChartSimple} className="post-icon col-icon" /></div>
            <div className="post-save"><FontAwesomeIcon icon={faBookmark} className="post-icon col-icon" /></div>
          </div>
        </div>
      </div>



      {commentSection && <div className="comments-container">
        <div className="create-comment"><input type="text" placeholder="Add comment." ref={commentEl} />
          <FontAwesomeIcon icon={faArrowRight} className="icon-arrow-create" onClick={CreateComment} />
        </div>
        <ul className="comments">
          {comments.map((comment, i) => (
            <li className="comment" key={i}>
              <span className="user-name-comment">{data.userName}</span>
              {comment}
            </li>
          ))}
          </ul>
          </div>}
    </>
  )
}
export default Post;