require('dotenv').config();

const {
  JWT_SECRET = 'dev-secret', MONGO_URL = 'mongodb+srv://palinakarabovich:2228481Polina@cluster0.evd0eld.mongodb.net/?retryWrites=true&w=majority', PORT = 3000, NODE_ENV,
} = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_URL,
  PORT,
  NODE_ENV,
};
