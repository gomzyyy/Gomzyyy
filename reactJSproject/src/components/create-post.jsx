import "./styles/create-post.css"
import { useRef, useState } from "react";
import Data from "./contextAPI";
import { useContext } from "react";

const CreatePost = ({ setCreate }) => {
    const { createVideoPost, createImagePost } = useContext(Data);

    const titleEl = useRef("");
    const descriptionEl = useRef("");
    const imageEl = useRef("");
    const videoEl = useRef("");
    const media = useRef("image");
    const [mediaType, setMediaType] = useState("video");

    const handleMediaType = () => {

        if (mediaType === "image") {
            setMediaType("video");
            media.current = "image"
        } else if (mediaType === "video") {
            setMediaType("image");
            media.current = "video"
        };
    };

    const handleDiscardbtn = () => {
        // titleEl.current.value = "";
        // descriptionEl.current.value = "";
        // signatureEl.current.value = "";
        // if (mediaType === "image") { imageEl.current.value = ""; }
        // if (mediaType === "video") { videoEl.current.value = ""; }
        setTimeout(() => setCreate(false), 100);
    };

    const handleOnSubmitCreate = (e) => {
        e.preventDefault();
        const name = "Gomzy Dhingra";
        const userName = "gomzyyy";
        const title = titleEl.current.value;
        const description = descriptionEl.current.value;


        if (mediaType === "image") {
            const image = imageEl.current.value;
            createImagePost(name, userName, title, description, image); // Correct function call
        } else if (mediaType === "video") {
            const video = videoEl.current.value;
            createVideoPost(name, userName, title, description, video); // Correct function call
        }
        setTimeout(() => setCreate(false), 400);
    }

    return (
        <div className="container-createpost">
            <form className="create-post" onSubmit={(e) => handleOnSubmitCreate(e)}>
                <div className="create-title"><input type="text" ref={titleEl} placeholder="Your title here!" required /></div>
                <div className="create-description"> <textarea type="text" cols={10} maxLength={400} ref={descriptionEl} placeholder="Description" required /></div>
                <div className="create-media-container"><div className="create-media">{mediaType === "image" ? <input type="text" ref={imageEl} placeholder="Paste URL here(Image)" /> :
                    <input type="text" ref={videoEl} placeholder="Paste URL here(Video)" />}
                </div> <div className="toggle-media" onClick={handleMediaType}>change: {media.current}</div></div>
                <div className="form-option"><div className="discard-btn" onClick={handleDiscardbtn}>Discard</div><div className="create-btn"><button type="submit">create</button></div></div>
            </form>
        </div>
    )
}
export default CreatePost;