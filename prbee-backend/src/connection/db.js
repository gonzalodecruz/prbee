const mongodb = require('mongodb');
const delay = require('delay');
const { generatePasswordHash } = require('../utils/helper');
const logger = require('../utils/logger');
const defaultSchema = require('../config/defaultSchema');
const defaultUser = require('../config/defaultUser');

const { MongoClient } = mongodb;

class Db {
  constructor() {
    this._mongoClient = null;
    this._db = null;
    this._dbName = null;
  }

  configure(uri, dbName, options) {
    this._mongoClient = new MongoClient(uri, options || { useNewUrlParser: true });
    this._dbName = dbName;
  }

  collection(collectionName) {
    return this._db.collection(collectionName);
  }

  async connect() {
    await this._mongoClient.connect();
    this._db = this._mongoClient.db(this._dbName);
  }

  dropDatabase() {
    return this._db.dropDatabase();
  }

  close(force) {
    this._mongoClient.close(force);
  }

  async initialize(cb, reconnectDelay = 5000) {
    try {
      await this.connect();
      logger.info('Connected successfully to MongoDB');
      await this.setupDefaultCollections();
      return cb;
    } catch (err) {
      logger.warn(`Unable to connect to MongoDB, retrying in ${reconnectDelay / 1000} seconds...`);
      logger.error(err);
      this.close(true);
      await delay(reconnectDelay);
      return this.initialize(cb, reconnectDelay);
    }
  }

  async setupDefaultCollections() {
    const schema = await this._db.collection('settings').findOne({ name: 'schema' }, { projection: { value: 1 } });
    if (!schema) {
      logger.warn('Creating default schema...');
      await this._db.collection('settings').insertOne({ name: 'schema', value: defaultSchema });
      logger.warn('Default schema created.');
    }

    const user = await this._db.collection('users').findOne({ email: defaultUser.email });
    if (!user) {
      logger.warn('Creating default user...');
      Object.assign(defaultUser, { password: generatePasswordHash(defaultUser.password) });
      await this._db.collection('users').insertOne(defaultUser);
      logger.warn('Default user created.');
    }
  }
}

const instance = new Db();

module.exports.Db = (uri, dbName, options) => {
  instance.configure(uri, dbName, options);
  return instance;
};

module.exports.db = instance;
