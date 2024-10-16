import jwt from "jsonwebtoken"
import Users from "../models/Users"
import config from "../config"
import Tokens from "./tokens"
import { getDbConnection } from "../db/dbConnection"

/* 
Estructura:
    {
        "username": "<username>",
        "password": "<password>"
    }
*/

export const signIn = async (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        try {
            const dbConnection = getDbConnection()
            const user = await dbConnection.collection(config.COLLECTION_NAME).findOne({ username: username })
            if (user) {
                const userSchema = new Users(user)
                const match = await userSchema.matchPassword(password)
                if (match) {
                    // Obtener token Mercado Libre
                    const mlToken = await Tokens.getMLToken(userSchema.client_id, userSchema.client_secret, userSchema.grant_type)
                    // Obtener token Sicofi
                    const sicofiToken = await Tokens.getSicofiToken(Users.decodeUsernameSicofi(userSchema.username_sic), Users.decodePasswordSicofi(userSchema.password_sic))
                    const jwtToken = jwt.sign({
                        userId: userSchema._id,
                        mlToken: mlToken,
                        sicofiToken: sicofiToken
                    }, config.JWT_SECRET, {
                        expiresIn: "1d"
                    })
                    // res.cookie('session', jwtToken)
                    // res.setHeader('Cache-Control', 'private')
                    return res.status(200).json({ error: "", message: "Se ha iniciado sesion satisfactoriamente.", jwtToken: jwtToken, username: userSchema.username, calendar: userSchema.calendar, invoices: userSchema.invoices, auto_transport: userSchema.auto_transport, figure_transport: userSchema.figure_transport })
                } else {
                    return res.status(403).json({ error: "", message: "La contraseña es incorrecta." })
                }
            } else {
                return res.status(404).json({ error: "", message: "Usuario no encontrado en la base de datos." })
            }
        } catch (error) {
            return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

/* 
Estructura:
    {
        "username": "<username>",
        "password": "<password>",
        "client_id": "<client_id>",
        "client_secret": "<client_secret>",
        "grant_type": "<grant_type>",
        "username_sic": "<username_sic",
        "password_sic": "<password_sic>"
        "user_type": "<user_type>"
    }
*/

export const signUp = async (req, res) => {
    const { username, password, client_id, client_secret, grant_type, username_sic, password_sic, user_type } = req.body
    if (username && password && client_id && client_secret && grant_type && username_sic && password_sic && user_type) {
        const newUser = new Users({
            username,
            password,
            client_id,
            client_secret,
            grant_type,
            username_sic,
            password_sic,
            user_type
        })

        newUser.password = await newUser.encryptPassword(password)
        newUser.username_sic = newUser.encodeUsernameSicofi(username_sic)
        newUser.password_sic = newUser.encodePasswordSicofi(password_sic)

        try {
            const dbConnection = getDbConnection()
            await dbConnection.collection(config.COLLECTION_NAME).insertOne(newUser)
            return res.status(200).json({ error: "", message: "Usuario creado exitosamente.", user: newUser })
        } catch (error) {
            return res.status(409).json({ error: error, message: "El usuario no tiene privilegios sobre la base de datos." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

/* 
Estructura:
    
*/

export const verifyJwtToken = async (req, res) => {
    let { userId, mlToken, sicofiToken } = req.decodedJwtToken
    let jwtToken = req.jwtToken
    let { user, usersModel } = req.userData

    return res.status(200).json({ error: "", message: "El token de la aplicacion es correcto.", username: user.username, calendar: user.calendar, invoices: user.invoices, auto_transport: user.auto_transport, figure_transport: user.figure_transport })

}

/* 
Estructura:
    {
        oldUsername: ...,
        newUsername: ...,
        newPassword: ...
    }
*/

export const setUsernamePassword = async (req, res) => {
    const { oldUsername, newUsername, newPassword } = req.body
    if (oldUsername && newUsername && newPassword) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        if (oldUsername == user.username) {
            const newUser = new Users({
                username: newUsername,
                password: newPassword,
                client_id: user.client_id,
                client_secret: user.client_secret,
                grant_type: user.grant_type,
                username_sic: user.username_sic,
                password_sic: user.password_sic
            })
            newUser.password = await newUser.encryptPassword(newPassword)
            try {
                let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "username": newUsername, "password": newUser.password }, { new: true }).select({ "_id": 1 })
                if (updatedUser) {
                    return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos." })
                } else {
                    return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
                }
            } catch (error) {
                return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
            }
        } else {
            return res.status(404).json({ error: "", message: "El nombre de usuario no coincide." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}