"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  DB_NAME: process.env.DB_NAME,
  COLLECTION_NAME: process.env.COLLECTION_NAME,
  URI_DB_CONNECTION: "mongodb+srv://" + process.env.USERNAME_DB + ":" + process.env.PASSWORD_DB + "@cluster0.bsxbmsb.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority",
  ROLE_SECRET: process.env.ROLE_SECRET,
  URI_ML: process.env.URI_ML,
  URI_DEMO_SICOFI: process.env.URI_DEMO_SICOFI,
  URI_PRODUCTION_SICOFI: process.env.URI_PRODUCTION_SICOFI,
  URI_APP: process.env.URI_APP,
  URI_INVOICE: process.env.URI_INVOICE,
  CFDI_VERSION: process.env.CFDI_VERSION,
  CP_VERSION: process.env.CP_VERSION
};