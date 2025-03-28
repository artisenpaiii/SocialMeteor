import React, { useState } from "react";
import PostForm from "../components/PostForm";
import { User } from "/imports/api/User/user";
import { useOutletContext } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import {PostCollection} from "/imports/api/Posts/posts";
import { Meteor } from "meteor/meteor";
import DisplayFeed from "../components/DisplayFeed";

type ContextType = { user: User };

const Home = () => {
  const { user } = useOutletContext<ContextType>();
  const [forUFeed, setForUFeed] = useState<boolean>(true);

  const { posts, loading } = useTracker(() => {
    const handle = Meteor.subscribe("ForU");
    const loading = !handle.ready();
    const posts = PostCollection.find({}, { sort: { created_At: -1 } }).fetch();
    console.log(posts)
    return { posts, loading };
  }, []);

  return (
    <section className="flex flex-col bg-background-100 col-span-3 p-5 items-center overflow-auto no-scrollbar">
      <div className="flex flex-row w-[50%] text-text-main justify-between">
        <button
          onClick={() => setForUFeed(true)}
          className={`uppercase text-2xl  font-bold transition-colors cursor-pointer ${
            forUFeed
              ? "text-text-main"
              : "text-gray-700 hover:text-primary-hover"
          }`}
        >
          For you
        </button>
        <button
          onClick={() => setForUFeed(false)}
          className={`uppercase text-2xl  font-bold transition-colors cursor-pointer ${
            forUFeed
              ? "text-gray-700 hover:text-primary-hover"
              : "text-text-main"
          }`}
        >
          Following
        </button>
      </div>
      <PostForm user={user} />
      {!loading && (
        <DisplayFeed posts={posts}/>
      )}
    </section>
  );
};

export default Home;
