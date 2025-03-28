import { z } from "zod";
import { LoginInfo, RegisterInfo } from "../interaces";

import { UserSchema } from "./validation";
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from "meteor/meteor";

export const InsertUser = async (userInfo: RegisterInfo): Promise<[boolean, string]> => {
  try {
    // Validate custom fields (e.g., username format, email)
    const validData = UserSchema.parse({
      name: userInfo.username,
      username: userInfo.username,
      email: userInfo.email,
      followers: [],
      following: [],
      verified: false,
      likedTweets: []
    });

    const userId = Accounts.createUser({
      username: validData.username,
      email: validData.email,
      password: userInfo.password,
      profile: {
        name: userInfo.username,
        bio: "",
        profile_pic: "",
        background_pic: "",
        followers: [],
        following: [],
        likedTweets: [],
        verified: false
      }
    });

    return [true, "User successfully created"];
  } catch (err) {
    if (err instanceof z.ZodError) {
      return [false, err.errors[0].message];

    } else if (err instanceof Meteor.Error) {
      return [false, err.reason || "Account creation failed"];
    } else {
      return [false, "Unexpected error. Please try again later"];
    }
  }
};

export const AuthenticateUser = (userData: LoginInfo): Promise<[boolean, string]> => {
    return new Promise((resolve) => {
      Meteor.loginWithPassword(userData.username, userData.password, (err) => {
        if (err) {
          resolve([false, err.message || "Login failed"]);
        } else {
          resolve([true, "Login successful"]);
        }
      });
  });
  };