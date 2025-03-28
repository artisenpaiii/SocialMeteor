import { Meteor } from 'meteor/meteor';
import { AuthenticateUser, InsertUser } from '/imports/api/User/methods';
import { RegisterInfo } from '/imports/api/interaces';

Meteor.methods({
    async InsertUser(userInfo: RegisterInfo) {
      return await InsertUser(userInfo);
    },
    async AuthenticateUser(userInfo: RegisterInfo) {
      return await AuthenticateUser(userInfo);
    }
  });
  