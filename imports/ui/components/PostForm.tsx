import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { User } from "/imports/api/User/user";
import { Link } from "react-router-dom";
import { Image, ImagePlay, Smile } from "lucide-react";
import HoverIcon from "./HoverIcon";
import { PostData } from "/imports/api/interaces";
import { Meteor } from "meteor/meteor";

interface PostFormProps {
  user: User;
}

const PostForm = ({ user }: PostFormProps) => {

  const [postContent, setPostContent] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setErrorMessage("")
    const postData:PostData = {author: user._id, content: postContent}
    const response = await Meteor.callAsync("InsertPost", postData)
    const [success, message] = response;
    if (!success) setErrorMessage(message)
    setPostContent("")

  }

  return (
    <div className="w-[65%] h-[200px] flex flex-col  space-x-1 bg-background-200 rounded-lg p-3 mb-[50px]">
      <div className="flex flex-row items-center space-x-3 border-b border-text-main w-fit px-1">
        <h1 className="text-xl font-semibold text-text-main">
          {user.profile.name}
        </h1>
        <Link
          className="text-gray-700 transition-colors hover:text-primary-300"
          to={`/profile/${user.username}`}
        >
          @{user.username}
        </Link>
      </div>
      <form onSubmit={(e) => handlePost(e)} className="w-full h-full flex flex-col space-y-2">
        <textarea
          className="w-full h-[120px] text-white p-3 resize-none outline-none focus:ring-0 focus:border-none"
          placeholder="Bla bla bla..."
          name="content"
          id="content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <div className="flex flex-row justify-around ">
          <div className="flex flex-row gap-x-2.5">
            <HoverIcon Icon={Image} size={37} innerText="Image" />
            <HoverIcon Icon={ImagePlay} size={37} innerText="GIF" />
            <HoverIcon Icon={Smile} size={37} innerText="Emoji" />
          </div>
          <input
            className="bg-primary-200 rounded-sm text-2xl transition-colors cursor-pointer hover:bg-primary-hover text-text-main font-bold uppercase w-fit px-3 py-2"
            type="submit"
            value="Launch"
          />
        </div>
      </form>
      <h1 className="text-red-600">{errorMessage}</h1>
    </div>
  );
};

export default PostForm;
