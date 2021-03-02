const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const moment = require('moment');
const farmhash = require('farmhash');

const API_ERRORS = require('../constants/APIErrors');
const Utils = require('./Utils');

function doesUsernameExist(email) {
	return new Promise((resolve, reject) => {
		User
			.findOne({ email: email })
			.exec((err, user) => {
				if (err) return reject(err);
				return resolve(!!user);
			});
	});
}

module.exports = {

	/**
	 * Creates a new user
	 * @param values
	 * @returns {Promise}
	 */
	createUser: (values) => {
		const email = values.email;

		return new Promise((resolve, reject) => {
			doesUsernameExist(email)
				.then(async exists => {
					if (exists) {
						return reject(API_ERRORS.EMAIL_IN_USE);
					}

					const user = await User.create(values).exec((createErr, user) => {
						if (createErr) return reject(createErr);
						UserManager._generateUserToken(values, token => {
							resolve({
								user: values,
								token
							});
						});
					});
				})
				.catch(reject);
		});
	},

	/**
 * Update a user
 * @param values
 * @returns {Promise}
 */
	updateUser: (values) => {
		const userId = values.id

		return new Promise(async (resolve, reject) => {

			try {
				const updatedUser = await User.updateOne({ id: userId })
					.set(values)
				if (updatedUser) {
					resolve(updatedUser);
				} else {
					reject("The database does not contain a user with id " + userId);
				}

			} catch (error) {
				reject(error)
			}
		});
	},

	/**
	* Get Users
	* @param values
	* @returns {Promise}
	*/
	getUsers: (values) => {
		return new Promise(async (resolve, reject) => {
			const skips = values.limit * (values.page - 1)
			try {
				const users = await User.find({ limit: values.limit, skip: skips }).sort('createdAt DESC')
				const total = await User.count()
				if (users) {
					resolve({
						data: users,
						total
					});
				} else {
					reject("No data user");
				}

			} catch (error) {
				reject(error)
			}
		});
	},

	/**
* Get a user
* @param values
* @returns {Promise}
*/
	getUser: (values) => {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await User.findOne({ id: values.id })
				if (user) {
					resolve(user);
				} else {
					reject("No data user");
				}

			} catch (error) {
				reject(error)
			}
		});
	},

	/**
* Get a user
* @param values
* @returns {Promise}
*/
	delete: (values) => {
		return new Promise(async (resolve, reject) => {
			try {
				await User.destroy({ id: { in: values } })
				resolve("Data successfully deleted");
			} catch (error) {
				reject(error)
			}
		});
	},

	/**
	 * Generates JWT token
	 * TODO Promisify
	 * @param user
	 * @param done
	 * @returns {*}
	 * @private
	 */
	_generateUserToken: function (user, done) {
		// Password hash helps to invalidate token when password is changed
		const passwordHash = farmhash.hash32(user.password);

		const payload = {
			id: user.id,
			pwh: passwordHash
		};

		const token = jwt.sign(
			payload,
			sails.config.jwt_secret,
			{
				expiresIn: '24h'	// 24 hours
			}
		);
		return done(token);
	},

	/**
	 * Authenticates user by a JWT token.
	 *
	 * Uses in JWT Policy
	 * @see api/policies/jwtAuth.js
	 *
	 * @param token
	 * @returns {Promise}
	 */
	authenticateUserByToken: function (token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, sails.config.jwt_secret, {}, (err, tokenData) => {
				if (err) return reject(err); // JWT parse error
				User
					.findOne({ id: tokenData.id })
					.exec((err, user) => {
						if (err) return reject(err); // Query error
						if (!user) return reject(API_ERRORS.USER_NOT_FOUND);
						if (user.locked) return reject(API_ERRORS.USER_LOCKED);

						const passwordHash = farmhash.hash32(user.password);
						if (tokenData.pwh !== passwordHash) { // Old token, built with inactive password
							return reject(API_ERRORS.INACTIVE_TOKEN);
						}
						return resolve(user);
					});
			});
		});
	},

	/**
 * Authenticates admin by a JWT token.
 *
 * Uses in isAdmin Policy
 * @see api/policies/isAdmin.js
 *
 * @param token
 * @returns {Promise}
 */
	checkIsAdminByToken: function (token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, sails.config.jwt_secret, {}, (err, tokenData) => {
				User
				.findOne({ id: tokenData.id })
				.exec((err, user) => {
					if (err) return reject(err); // Query error
					if (!user) return reject(API_ERRORS.USER_NOT_FOUND);
					if (!user.isAdmin) return reject(API_ERRORS.USER_NOT_ADMIN);

					return resolve(user);
				})
			});
		});
	},


	/**
	 * Validates user password
	 * @param email
	 * @param password
	 * @returns {Promise}
	 */
	validatePassword(email, password) {
		return new Promise((resolve, reject) => {
			User.findOne({ email: email }).exec((err, user) => {
				if (err) return reject(err);
				if (!user) return reject(API_ERRORS.USER_NOT_FOUND);
				Utils
					.validatePassword(password, user.password)
					.then(isValid => {
						resolve({ isValid, user });
					})
					.catch(reject);
			});
		});
	},


	/**
	 * Authenticates user by email and password.
	 * @param email
	 * @param password
	 * @returns {Promise}
	 */
	authenticateUserByPassword: function (email, password) {
		return new Promise((resolve, reject) => {
			UserManager
				.validatePassword(email, password)
				.then(({ isValid, user }) => {
					if (!isValid) {
						return reject(API_ERRORS.INVALID_EMAIL_PASSWORD);
					}
					else {
						UserManager._generateUserToken(user, token => {
							resolve({ user, token });
						});
					}
				})
				.catch(reject);
		});
	}
};