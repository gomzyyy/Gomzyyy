import "./styles/posts.css";
import "./styles/comments.css";
import "./styles/universal.css";
import MiniProfile from "./mini-profile";
import CommentSection from "./comment-section";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faChartSimple, faBookmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from "react";
import Data from "./contextAPI";

const Post = ({ data }) => {
  const { createComment, comments } = useContext(Data);

  let imageURL = data.image;
  let videoURL = data.video;

  const [visible, setVisible] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [commentWidth, setCommentWidth] = useState("height0")
  const [commentSection, setCommentSection] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [saved, setSaved] = useState(false);

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

  const handleLike = () => {
    if (!like) {
      setLikeCount(a => a + 1)
      setLike(true);
    } else {
      setLikeCount(a => a - 1)
      setLike(false);
    }
  };
  const handleVisible = () => setVisible(!visible);
  const handleSaved = () => setSaved(!saved);

  const handleComments = () => {
    if (!commentSection) {
      setCommentSection(true)
      return setCommentWidth("height100");
    } else {
      setCommentSection(false)
      return setTimeout(setCommentWidth("height0"), 200);
    }
  }

  const CreateComment = () => {
    if (newComment.trim() === "") return;
    handleComments();
    createComment(newComment);
    setCommentCount(c => c + 1)
    setNewComment("");
  };

  const toggleComments = () => {

    setCommentSection(!commentSection)
    handleComments();
  };

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
              <span className="like-count">{countConvert(likeCount, 10)}</span>
            </div>
            <div className="post-comment" onClick={toggleComments}>
              <FontAwesomeIcon icon={faComment} className="post-icon col-icon" />
              <span className="comment-count">{countConvert(commentCount, 10)}</span>
            </div>
          </div>
          <div className="post-behaviour">
            <div className="post-reach">
              <FontAwesomeIcon icon={faChartSimple} className="post-icon col-icon" />
            </div>
            <div className="post-save" onClick={handleSaved}>
              <FontAwesomeIcon icon={faBookmark} className={`post-icon ${saved ? "col-white" : "col-icon"}`} />
            </div>
          </div>
        </div>
      </div>
      <div className="create-comment">
        <input
          type="text"
          placeholder="Add comment."
          value={newComment}
          onChange={handleCommentChange} />
        <FontAwesomeIcon icon={faArrowRight} className="icon-arrow-create" onClick={CreateComment} />
      </div>

      <CommentSection comments={comments} handleCommentChange={handleCommentChange} data={data} commentWidth={commentWidth} />
    </>
  );
};

export default Post;