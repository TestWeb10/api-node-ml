"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _package = _interopRequireDefault(require("../package.json"));
var _config = _interopRequireDefault(require("./config"));
var _dbConnection = require("./db/dbConnection");
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _db = _interopRequireDefault(require("./routes/db.routes"));
var _ml = _interopRequireDefault(require("./routes/ml.routes"));
var _sicofi = _interopRequireDefault(require("./routes/sicofi.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Este archivo sirve para configurar la aplicacion de express

// Importamos rutas para un apartado en especifico

// Iniciamos express
var app = (0, _express["default"])();

// Nos conectamos a la base de datos mongodb
(0, _dbConnection.connectToDb)(function (err) {
  if (err) {
    console.error(err);
  }
});

// Configuraciones de express
var port = process.env.PORT || 4001;
app.set("port", port);
app.set('pkg', _package["default"]);
app.use((0, _cors["default"])({
  origin: _config["default"].URI_APP,
  credentials: true
}));
if (_config["default"].ENVIRONMENT == "dev") {
  var morgan = require("morgan");
  app.use(morgan("dev"));
}
// Si se envia poca informacion 
//app.use(express.json())
// Si se envia mucha informacion
app.use(_bodyParser["default"].json({
  limit: '1000mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '1000mb',
  extended: true
}));

// En la ruta inicial mostramos los detalles de la aplicacion
app.get('/', function (req, res) {
  res.status(200).json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});
app.use('/api/auth', _auth["default"]);
app.use('/api/db', _db["default"]);
app.use('/api/ml', _ml["default"]);
app.use('/api/sicofi', _sicofi["default"]);
var _default = exports["default"] = app;