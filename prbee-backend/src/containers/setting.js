const { db } = require('../connection/db');

class SettingContainer {
  constructor() {
    this._container = db.collection('settings');
  }

  createSetting(setting) {
    return this._container.insertOne(setting);
  }

  updateSetting(name, value) {
    return this._container.updateOne({ name }, { $set: { value } });
  }

  findSetting(filter, options) {
    return this._container.findOne(filter, options);
  }
}

module.exports = SettingContainer;
