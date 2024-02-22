"use strict";

var _config = _interopRequireDefault(require("../config"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var dbConnection;
module.exports = {
  connectToDb: function connectToDb(callback) {
    _mongoose["default"].createConnection(_config["default"].URI_DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).asPromise().then(function (conn) {
      dbConnection = conn;
      console.log("Database is connected");
      return callback();
    })["catch"](function (err) {
      return callback(err);
    });
  },
  getDbConnection: function getDbConnection() {
    return dbConnection;
  }
};