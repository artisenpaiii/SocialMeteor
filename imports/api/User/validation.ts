import { z } from "zod";

export const UserSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
    username: z.string().min(3, { message: "Username must be at least 3 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    bio: z.string().max(160, { message: "Bio can't be longer than 160 characters." }).optional(),
    profile_pic: z.string().url({ message: "Invalid profile picture URL." }).optional(),
    background_pic: z.string().url({ message: "Invalid background picture URL." }).optional(),
    followers: z.array(z.string()),
    following: z.array(z.string()),
    verified: z.boolean(),
    likedTweets: z.array(z.string()),
  });