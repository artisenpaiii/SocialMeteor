import React from "react";
import { Post } from "/imports/api/Posts/posts";
import { Meteor } from "meteor/meteor";
import { User } from "/imports/api/User/user";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const author: User | undefined = Meteor.users.findOne(post.author) as User;

  const profilePic =
    author?.profile?.profile_pic === ""
      ? "/uploads/default-pic.jpg"
      : author?.profile?.profile_pic;

  const createdAt = new Date(post.created_At);

  const date = createdAt.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short", // Mar, Apr, etc.
  });

  const time = createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="w-full h-[240px] bg-background-200 rounded-lg flex flex-row p-2 space-x-2 relative">
      <div className="h-14 w-14 overflow-hidden rounded-full flex-none">
        <img src={profilePic} />
      </div>
      <div className="w-full py-2 flex flex-col">
        <div className="flex flex-row items-center space-x-3 w-fit px-1">
          <h1 className="text-xl font-semibold text-text-main">
            {author.profile.name}
          </h1>
          <Link
            className="text-gray-700 transition-colors hover:text-primary-300"
            to={`/profile/${author.username}`}
          >
            @{author.username}
          </Link>
        </div>
        <p className="whitespace-pre-wrap break-words text-text-main">
          {post.content}
        </p>
        <span className="text-text-secondary text-sm absolute left-5 bottom-5">
          {date} - {time}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
