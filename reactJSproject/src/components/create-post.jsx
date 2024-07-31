import "./styles/create-post.css"
import { useRef, useState } from "react";
import Data from "./contextAPI";
import { useContext } from "react";

const CreatePost = ({ setCreate }) => {

    const { CreatePost } = useContext(Data);
    const titleEl = useRef("");
    const descriptionEl = useRef("");
    const signatureEl = useRef("");
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
        titleEl.current.value = "";
        descriptionEl.current.value = "";
        signatureEl.current.value = "";
        if (mediaType === "image") { imageEl.current.value = ""; }
        if (mediaType === "video") { videoEl.current.value = ""; }
        setTimeout(() => setCreate(false), 200);
    };

    const handleOnSubmitCreate = (e) => {
        e.preventDefault();
        const signature = signatureEl.current.value;
        const title = titleEl.current.value;
        const description =  descriptionEl.current.value;
        const image = imageEl.current.value;
        const video = videoEl.current.value;

        CreatePost(signature, title, description, image, video);
        setTimeout(() => setCreate(false), 800);    
    }

    return (
        <div className="container-createpost">
            <form className="create-post" onSubmit={(e) => handleOnSubmitCreate(e)}>
                <div className="create-signature"><input type="text" ref={signatureEl} placeholder="Your signature here!" /></div>
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