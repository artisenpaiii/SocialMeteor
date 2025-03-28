import { publishComposite } from 'meteor/reywood:publish-composite';
import { Meteor } from 'meteor/meteor';
import { PostCollection } from './posts';
import { Post } from './posts';

publishComposite('ForU', {
  find() {
    if (!this.userId) return this.ready();

    return PostCollection.find({}, {
      sort: { created_At: -1 },
      limit: 50,
    });
  },
  children: [
    {
      find(post: Post) {
        return Meteor.users.find(
          { _id: post.author },
          {
            fields: {
              username: 1,
              'profile.name': 1,
              'profile.profile_pic': 1
            }
          }
        );
      }
    }
  ]
  

});
