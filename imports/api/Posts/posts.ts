import { Mongo } from "meteor/mongo";

export interface Post {
    _id?: string;
    author: string;        // user _id
    content: string;
    created_At: Date;
    imageUrl?: string;
    gifUrl?: string;
  }
  

export const PostCollection = new Mongo.Collection<Post>('posts');