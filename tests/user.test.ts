import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { RegisterInfo, LoginInfo } from '/imports/api/interaces';

if (Meteor.isServer) {
  describe('User Registration', function () {
    const validUser: RegisterInfo = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpass123',
    };

    before(async function () {
      // Clean up test user using removeAsync
      await Meteor.users.removeAsync({ username: validUser.username });
    });

    it('should succeed with valid data', async function () {
      const [success, msg] = await Meteor.callAsync('InsertUser', validUser);
      assert.isTrue(success, msg);
    });

    it('should fail with invalid email', async function () {
      const badUser = { ...validUser, email: 'invalid-email', username: 'user1' };
      const [success, msg] = await Meteor.callAsync('InsertUser', badUser);
      assert.isFalse(success);
      assert.match(msg, /Invalid email address/);
    });

    it('should fail with short username', async function () {
      const badUser = { ...validUser, username: 'ab', email: 'short@example.com' };
      const [success, msg] = await Meteor.callAsync('InsertUser', badUser);
      assert.isFalse(success);
      assert.match(msg, /Name must be at least 3 characters long./);
    });

    it('should fail with duplicate username or email', async function () {
      const [success, msg] = await Meteor.callAsync('InsertUser', validUser);
      assert.isFalse(success);
      assert.match(msg, /already exists/i);
    });
  });

  describe('User Login', function () {
    const loginUser: LoginInfo = {
      username: 'testuser',
      password: 'testpass123',
    };

    it('should succeed with correct credentials', async function () {
      const [success, msg] = await Meteor.callAsync('AuthenticateUser', loginUser);
      assert.isTrue(success, msg);
    });

    it('should fail with incorrect password', async function () {
      const [success, msg] = await Meteor.callAsync('AuthenticateUser', {
        ...loginUser,
        password: 'wrongpassword',
      });
      assert.isFalse(success);
      assert.match(msg, /login failed/i);
    });

    it('should fail with non-existent user', async function () {
      const [success, msg] = await Meteor.callAsync('AuthenticateUser', {
        username: 'nonexistentuser',
        password: 'whatever',
      });
      assert.isFalse(success);
      assert.match(msg, /login failed/i);
    });

    it('should fail with empty username', async function () {
      const [success, msg] = await Meteor.callAsync('AuthenticateUser', {
        username: '',
        password: 'pass',
      });
      assert.isFalse(success);
    });

    it('should fail with empty password', async function () {
      const [success, msg] = await Meteor.callAsync('AuthenticateUser', {
        username: 'testuser',
        password: '',
      });
      assert.isFalse(success);
    });
  });
}
