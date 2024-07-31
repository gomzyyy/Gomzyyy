import "./styles/main.css"
import Sidebar from "./sidebar";
import Content from "./content";
import CreatePost from './create-post';
import { useState } from "react";


const Main1 = () => {
  const [create, setCreate] = useState(false);

  const handleCreate = () => {
    setCreate(!create);
    console.log("clicked");
  };
 

  return (
    <>
      <main className="main1">
        {create && <CreatePost setCreate={setCreate} />}
        <Sidebar handleCreate={handleCreate} />
        <Content />
      </main>
    </>
  )
}
export default Main1;