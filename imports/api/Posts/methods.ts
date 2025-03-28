import { z } from "zod";
import { PostSchema } from "./validation";
import { PostData } from "../interaces";
import { Meteor } from "meteor/meteor";
import { PostCollection } from "./posts";

export const InsertPost = async (post: PostData): Promise<[boolean, string]> => {
  try {
    const validData = PostSchema.parse({
      author: post.author,
      content: post.content,
      imageUrl: post.imageUrl,
      gifUrl: post.gifUrl,
      created_At: new Date(), // optional, fallback to now
    });

    const postId = await PostCollection.insertAsync({
      author: validData.author,
      content: validData.content,
      created_At: validData.created_At,
      imageUrl: validData.imageUrl || "",
      gifUrl: validData.gifUrl || "",
    });

    return [true, postId]; // success, return post ID

  } catch (err) {
    if (err instanceof z.ZodError) {
      return [false, err.errors[0].message];
    } else if (err instanceof Meteor.Error) {
      return [false, err.reason || "Post creation failed"];
    } else {
      return [false, "Unexpected error. Please try again later"];
    }
  }
};
