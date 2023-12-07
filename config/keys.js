require("dotenv").config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;
const MONGODB = {
  MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jj7jufa.mongodb.net/Twitter?retryWrites=true&w=majority&authSource=admin`,
};

const SESSION = {
  COOKIE_KEY: "audaxious",
};

const KEYS = {
  ...MONGODB,
  ...SESSION,
};

module.exports = KEYS;
