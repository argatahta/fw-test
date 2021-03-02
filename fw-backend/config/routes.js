/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'POST /user/register': "UserController.register",
    'POST /user/create': "UserController.createUser",
    'POST /user/login': "UserController.login",
    'PUT /user': "UserController.update",
    'GET /user': "UserController.users",
    'DELETE /user': "UserController.delete",
};
