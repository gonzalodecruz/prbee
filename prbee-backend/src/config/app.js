require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  secret: process.env.JWT_SECRET || 'secret',
  db: {
    uri: process.env.DB_URI || 'mongodb://127.0.0.1:27017',
    name: process.env.DB_NAME || 'prbee',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    reconnectDelay: 10000,
  },
};

if (NODE_ENV === 'test') {
  Object.assign(config.db, {
    uri: process.env.DB_TEST_URI || 'mongodb://127.0.0.1:27017',
    name: process.env.DB_TEST_NAME || 'prbee_test',
  });
}

module.exports = config;
