/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  if (await User.count() > 0) {
    return;
  }
  //
  await User.createEach([{
    "email": "admin@admin.com",
    "username": "admin1",
    "password": "123qwe",
    "password_confirm" : "123qwe",
    "firstName": "Admin",
    "lastName": "1",
    "company": "caiho",
    "website": "www.google.com",
    "theme": "#00ff00",
    "isAdmin": true
},
{
  "email": "user1@user.com",
  "username": "user1",
  "password": "123qwe",
  "password_confirm" : "123qwe",
  "firstName": "User",
  "lastName": "1",
  "company": "supersoccer",
  "website": "www.google.com",
  "theme": "#ff0000",
  "isAdmin": false
},
{
  "email": "user2@user.com",
  "username": "user2",
  "password": "123qwe",
  "password_confirm" : "123qwe",
  "firstName": "User",
  "lastName": "2",
  "company": "henzo ltd",
  "website": "www.google.com",
  "theme": "#0000ff",
  "isAdmin": false
},
{
  "email": "user3@user.com",
  "username": "user3",
  "password": "123qwe",
  "password_confirm" : "123qwe",
  "firstName": "User",
  "lastName": "3",
  "company": "supersoccer1",
  "website": "www.google.com",
  "theme": "#00ff00",
  "isAdmin": false
},
{
  "email": "user4@user.com",
  "username": "user4",
  "password": "123qwe",
  "password_confirm" : "123qwe",
  "firstName": "User",
  "lastName": "4",
  "company": "supersoccer2",
  "website": "www.google.com",
  "theme": "#ff0000",
  "isAdmin": false
}]);
  // ```

};
