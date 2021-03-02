/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');
const _ = require('@sailshq/lodash');

function generatePasswordHash(password) {
  return bcrypt.genSalt(10) // 10 is default
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return Promise.resolve(hash);
    });
}

module.exports = {
  attributes: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    username: {
      type: 'string',
      required: true,
    },
    company: {
      type: 'string',
      required: true,
    },
    website: {
      type: 'string'
    },
    theme: {
      type: 'string',
      defaultsTo: "#fffff"
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true
    },

    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    
  },

  methods: {

    /**
     * Validates user password with stored password hash
     * @param password
     * @returns {Promise}
     */
    validatePassword: function (password) {
      return bcrypt.compare(password, this.toObject().password);
    },

    /**
     * Set user password
     * @param password
     * @returns {Promise}
     */
    setPassword: function (password) {
      return generatePasswordHash(password)
        .then(hash => {
          this.password = hash;
        });
    }
  },

  customToJSON: function() {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ['password'])
  },

  /**
   * Encrypt password before creating a User
   * @param values
   * @param next
   */
  beforeCreate: function (values, next) {
    generatePasswordHash(values.password)
      .then(hash => {
        delete values.password_confirm;
        values.password = hash;
        next();
      })
      .catch(err => {
        /* istanbul ignore next */
        next(err);
      });
  }
};


