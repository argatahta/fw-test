const bcrypt = require('bcrypt');

/**
 * Utils
 * @type {object}
 */
module.exports = {

	/**
	 * Returns an object with error field for response
	 * @param errorMessage {string}
	 * @returns {{err_msg: {string}}}
	 */
	jsonErr(errorMessage) {
		return {
			err_msg: errorMessage
		};
	},

    validatePassword: function (password, hashPassword) {
        return bcrypt.compare(password, hashPassword);
      },
};