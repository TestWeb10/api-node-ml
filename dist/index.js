"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* 
DESARROLLO

Modulos:
    npm i express cors body-parser mongoose dotenv jsonwebtoken bcrypt cross-fetch axios
    npm i nodemon morgan -D

Babel (es un transcompilador de javascript):
    Comando:
        npm i @babel/core @babel/cli @babel/node @babel/preset-env -D
    
    Agregar archivo ".babelrc" en la raiz del directorio
        {
            "presets": [
                "@babel/preset-env"
            ]
        }
*/

// Este archivo sirve para arrancar la aplicacion

_app["default"].listen(_app["default"].get("port"));
// console.log("Server on port ", app.get("port"));