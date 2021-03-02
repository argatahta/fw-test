/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const API_ERRORS = require('../constants/APIErrors');
const validator = require('validator');
const passValidator = require('password-validator');
const _ = require('@sailshq/lodash');

const passSchema = new passValidator();
const passMinLen = 6;
const passMaxLen = 24;

// Scheme for password validation
// See ref https://github.com/tarunbatra/password-validator
passSchema
	.is().min(passMinLen)
	.is().max(passMaxLen)
	.has().letters()
	.has().digits();


module.exports = {

	/**
	 * Action for /user
	 * @param req
	 * @param res
	 */
	index: function (req, res) {

		// We use here req.userInfo which is set in policies/jwtAuth.js
		res.ok({
			id: req.userInfo.id,
			email: req.userInfo.email
		});
	},


	/**
	 * Action for /user/register
	 * @param req
	 * @param res
	 * @returns {*}
	 */
	register: function (req, res) {
		if(!req.body) {
			return res.badRequest(Utils.jsonErr('Empty body'));
		}

		const email = req.body.email;
		const password = req.body.password;
		const passwordConfirm = req.body.password_confirm;

		if (!email || !validator.isEmail(email)) {
			return res.badRequest(Utils.jsonErr('Invalid email'));
		}

		if (password !== passwordConfirm) {
			return res.badRequest(Utils.jsonErr('Password does not match'));
		}

		if (!passSchema.validate(password)) {
			return res.badRequest(Utils.jsonErr('Password must be 6-24 characters, including letters and digits'));
		}

		UserManager
			.createUser(req.body)
			.then(data => {
				res.created(data);
			})
			.catch(err => {
				if (err === API_ERRORS.EMAIL_IN_USE) {
					return res.badRequest(Utils.jsonErr('This email is already in use'));
				}
				/* istanbul ignore next */
				return res.serverError(Utils.jsonErr(err));
			});
	},

		/**
	 * Action for /user/create
	 * @param req
	 * @param res
	 * @returns {*}
	 */
	createUser: function (req, res) {
		if(!req.body) {
			return res.badRequest(Utils.jsonErr('Empty body'));
		}

		const email = req.body.email;
		const password = req.body.password;
		const passwordConfirm = req.body.password_confirm;
		const isAdmin = req.body.isAdmin;

		if(isAdmin) {
			return res.badRequest(Utils.jsonErr('Add new user with isAdmin: false'));
		}

		if (!email || !validator.isEmail(email)) {
			return res.badRequest(Utils.jsonErr('Invalid email'));
		}
		
		if (password !== passwordConfirm) {
			return res.badRequest(Utils.jsonErr('Password does not match'));
		}

		if (!passSchema.validate(password)) {
			return res.badRequest(Utils.jsonErr('Password must be 6-24 characters, including letters and digits'));
		}

		UserManager
			.createUser(req.body)
			.then(data => {
				res.created(data);
			})
			.catch(err => {
				if (err === API_ERRORS.EMAIL_IN_USE) {
					return res.badRequest(Utils.jsonErr('This email is already in use'));
				}
				/* istanbul ignore next */
				return res.serverError(Utils.jsonErr(err));
			});
	},


	/**
	 * Action for /user/login
	 * @param req
	 * @param res
	 * @returns {*}
	 */
	login: function (req, res) {
		if(!req.body) {
			return res.badRequest(Utils.jsonErr('Empty body'));
		}

		const email = req.body.email;
		const password = req.body.password;

		if (!email || !validator.isEmail(email)) {
			return res.badRequest(Utils.jsonErr('Invalid email'));
		}

		if (!password) {
			return res.badRequest(Utils.jsonErr('Invalid email or password'));
		}

		UserManager.authenticateUserByPassword(email, password)
			.then(response => {
				res.ok(response);
			})
			.catch(err => {
				switch (err) {
					case API_ERRORS.INVALID_EMAIL_PASSWORD:
					case API_ERRORS.USER_NOT_FOUND:
						return res.badRequest(Utils.jsonErr('Invalid email or password'));
					case API_ERRORS.USER_LOCKED:
						return res.forbidden(Utils.jsonErr('Account locked'));
					default:
						/* istanbul ignore next */
						return res.serverError(Utils.jsonErr(err));
				}
			});
	},

    	/**
	 * Action for PUT /user
	 * @param req
	 * @param res
	 * @returns {*}
	 */
	update: function (req, res) {
		if(!req.body) {
			return res.badRequest(Utils.jsonErr('Empty body'));
		}
        if(!req.body.id) {
            return res.badRequest(Utils.jsonErr('Please input id'));
        }

		UserManager
			.updateUser(req.body)
			.then(user => {
				res.ok(user);
			})
			.catch(err => {
				/* istanbul ignore next */
				return res.serverError(Utils.jsonErr(err));
			});
	},
      	/**
	 * Action for get /user
	 * @param req
	 * @param res
	 * @returns {*}
	 */
	users: function (req, res) {
		UserManager
			.getUsers({page: req.query.page || 1, limit: req.query.limit || 30})
			.then(user => {
				res.ok(user);
			})
			.catch(err => {
				/* istanbul ignore next */
				return res.serverError(Utils.jsonErr(err));
			});
	},

	   	/**
	 * Action for DELETE /user
	 * @param req
	 * @param res
	 * @returns {*}
	 */
	delete: function (req, res) {
		if(!req.body) {
			return res.badRequest(Utils.jsonErr('Empty body'));
		}

		if(_.isArray(!req.body)) {
			return res.badRequest(Utils.jsonErr('Body must be an array'));
		}

		UserManager
			.delete(req.body)
			.then(deleted => {
				res.ok(deleted);
			})
			.catch(err => {
				/* istanbul ignore next */
				return res.serverError(Utils.jsonErr(err));
			});
	},
};

