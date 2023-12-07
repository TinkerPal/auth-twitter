// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "xLw7qNyBUxpZIvhR7dXeydQ29",
  TWITTER_CONSUMER_SECRET: "yhkonNyYBPkGSLPRJhhgkHyBm2U4G3s6vexulFZ9nLqp4gohgX",
};

//Ix4jnr01HhMUBSDA

//mongodb+srv://shola:Ix4jnr01HhMUBSDA@cluster0.wuo2tky.mongodb.net/

//SJngUWZtgvJb1WcV

const DB_USER = "SOME USER";
const DB_PASSWORD = "Ix4jnr01HhMUBSDA";
const MONGODB = {
  // MONGODB_URI:
  //   "mongodb+srv://shola:SJngUWZtgvJb1WcV@cluster0.zpijeny.mongodb.net/",
  // // MONGODB_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@ds<SOME_DOMAIN>.mlab.com:<PORT>/<PROJECT_NAME>`,
  MONGODB_URI: `mongodb+srv://audaxious:GwRTH3cGpCtE7X9Z@cluster0.jj7jufa.mongodb.net/?retryWrites=true&w=majority`,
};

const SESSION = {
  COOKIE_KEY: "thisappisawesome",
};

const KEYS = {
  ...TWITTER_TOKENS,
  ...MONGODB,
  ...SESSION,
};

module.exports = KEYS;
