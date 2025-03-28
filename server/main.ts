import { Meteor } from "meteor/meteor";
import '/server/methods/user';
import '/server/methods/posts';
import '/imports/api/User/publications'
import '/imports/api/Posts/publications'



Meteor.startup(async () => {

});
