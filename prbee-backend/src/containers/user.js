const { db } = require('../connection/db');

class UserContainer {
  constructor() {
    this._container = db.collection('users');
  }

  createUser(user) {
    return this._container.insertOne(user);
  }

  findUser(filter, options) {
    return this._container.findOne(filter, options);
  }

  countUsers(qury) {
    return this._container.find(qury).count();
  }
}

module.exports = UserContainer;
