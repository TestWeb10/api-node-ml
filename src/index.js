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

import app from './app'

app.listen(app.get("port"))
// console.log("Server on port ", app.get("port"));