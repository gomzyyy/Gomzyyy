import "./styles/comments.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useRef } from "react"
import { useContext } from "react"
import Data from "./contextAPI"

const CommentSection = ({ data }) => {

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
        <div className="comments-container">
            <div className="create-comment"><input type="text" placeholder="Add comment." ref={commentEl} />
                <FontAwesomeIcon icon={faArrowRight} className="icon-arrow-create" onClick={CreateComment} />
            </div>
            <ul className="comments">
                {data.map((comment, i) => (
                    <li className="comment" key={i}>
                        <span className="user-name-comment">{data.userName}</span>
                        {comment}
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default CommentSection;