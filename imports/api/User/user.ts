import { Mongo } from "meteor/mongo";

export interface User {
    _id: string; 
    username: string;
    email: string;
    profile: {
        name: string;
        bio?: string;
        profile_pic?: string;
        background_pic?: string;
        followers: string[]; 
        following: string[];
        verified: boolean;
        likedTweets: string[]; 
    }
}

export const UserCollection = new Mongo.Collection<User>('users');