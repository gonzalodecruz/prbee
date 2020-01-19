const SettingContainer = require('../containers/setting');

class SubscriptionService {
  constructor() {
    this._settingContainer = new SettingContainer();
  }

  async getSchema() {
    const { value } = await this._settingContainer.findSetting({ name: 'schema' }, { projection: { value: 1 } });
    return value;
  }

  saveSchema(schema) {
    return this._settingContainer.updateSetting('schema', schema);
  }
}

module.exports = SubscriptionService;
