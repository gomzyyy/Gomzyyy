import "./styles/comments.css"
import "./styles/universal.css"
import { useRef } from "react"
import { useContext } from "react"
import Data from "./contextAPI"

const CommentSection = ({ comments, newComment, handleCommentChange, data, commentWidth }) => {

    const { createComment } = useContext(Data);

    const commentEl = useRef("");

    const comment = commentEl.current.value;

    const CreateComment = () => {

        if (comment === "") {
            return;
        }
        createComment(comment);
    };
    return (
        <div className={`comments-container ${commentWidth}`}>
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
    )

}
export default CommentSection;