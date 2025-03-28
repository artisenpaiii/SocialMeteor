import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function () {
  if (!this.userId) return this.ready();

  return Meteor.users.find(
    { _id: this.userId },
    {
      fields: {
        username: 1,
        email: 1,
        profile: 1
      }
    }
  );
});