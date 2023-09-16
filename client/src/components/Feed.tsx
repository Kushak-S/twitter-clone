import React from "react";
import AppBar from "./Appbar";
import Post from "./post";
// import Logo from "../logo.svg";
import Pic from "../pic.png";

export interface IFeedProps {}

const Feed:React.FunctionComponent<IFeedProps> = (props) => {
  return (
    <>
      <AppBar/>
      <Post
        profilePic = {Pic}
        username = "temp"
        displayName = "Name"
        content =  "this is content"
        timestamp = "timestamp"
      />
      <div>Feed</div>
    </>
  )
};

export default Feed;