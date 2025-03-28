import { Meteor } from "meteor/meteor";
import { InsertPost } from "/imports/api/Posts/methods";
import { PostData } from "/imports/api/interaces";

Meteor.methods({
    async InsertPost(post:PostData){
        return await InsertPost(post)
    },
})