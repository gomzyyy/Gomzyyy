import "./styles/posts.css";
import "./styles/comments.css";
import "./styles/universal.css";
import MiniProfile from "./mini-profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faChartSimple, faBookmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useContext } from "react";
import Data from "./contextAPI";

const Post = ({ data }) => {
  const { createComment, comments } = useContext(Data);

  const imageURL = data.image;
  const videoURL = data.video;
  const Likes = data.likeCount;

  const [visible, setVisible] = useState(false);
  const [like, setLike] = useState(false);
  const [commentSection, setCommentSection] = useState(false);
  const [newComment, setNewComment] = useState("");

  const getYouTubeEmbedUrl = (link) => {
    const shortUrlPattern = /youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const longUrlPattern = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;

    let videoId = "";

    if (shortUrlPattern.test(link)) {
      videoId = link.match(shortUrlPattern)[1];
    } else if (longUrlPattern.test(link)) {
      videoId = link.match(longUrlPattern)[1];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  const countConvert = (count, val) => {
    if (count === 0) {
      return 0;
    } else if (count > 999999) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 999) {
      return `${(count / 1000).toFixed(1)}k`;
    } else {
      return count;
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const CreateComment = () => {
    if (newComment.trim() === "") return;
    createComment(newComment);
    setNewComment("");
  };

  const CommentCount = data.comments?.length || 0;

  const handleLike = () => setLike(!like);
  const handleVisible = () => setVisible(!visible);
  const handleComments = () => setCommentSection(!commentSection);
  const handleCloseComments = () => setCommentSection(false);

  return (
    <>
      <div className="post-card">
        <div className="post-profile">
          <MiniProfile posts={data} />
        </div>
        <div className={`post-description ${!visible && "txtOverflowManage"}`}>
          <span className="load-more">{data.description}</span>
          {!visible && <div className="visible" onClick={handleVisible}>more</div>}
        </div>
        {!imageURL && !videoURL && (
          <div className="post-media flex-JusAliCenter">
            <span className="post-empty">No media available for this post.</span>
          </div>
        )}
        {imageURL && <div className="post-media"><img src={imageURL} alt="Post media" /></div>}
        {videoURL && (
          <div className="post-media">
            <iframe src={getYouTubeEmbedUrl(videoURL)} allowFullScreen></iframe>
          </div>
        )}
        <div className="post-operations">
          <div className="post-reaction">
            <div className="post-like" onClick={handleLike}>
              <FontAwesomeIcon icon={faThumbsUp} className={`post-icon ${like ? "col-pink" : "col-icon"}`} />
              <span className="like-count">{countConvert(Likes, 10)}</span>
            </div>
            <div className="post-comment" onClick={handleComments}>
              <FontAwesomeIcon icon={faComment} className="post-icon col-icon" />
              <span className="comment-count">{countConvert(CommentCount, 10)}</span>
            </div>
          </div>
          <div className="post-behaviour">
            <div className="post-reach">
              <FontAwesomeIcon icon={faChartSimple} className="post-icon col-icon" />
            </div>
            <div className="post-save">
              <FontAwesomeIcon icon={faBookmark} className="post-icon col-icon" />
            </div>
          </div>
        </div>
      </div>

      {commentSection && (
        <div className="comments-container">
          <div className="create-comment">
            <input
              type="text"
              placeholder="Add comment."
              value={newComment}
              onChange={handleCommentChange}
            />
            <FontAwesomeIcon icon={faArrowRight} className="icon-arrow-create" onClick={CreateComment} />
          </div>
          <ul className="comments">
            {comments.map((comment, i) => (
              comment && (
                <li className="comment" key={i}>
                  <span className="user-name-comment">{data.userName}</span>
                  {comment}
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Post;