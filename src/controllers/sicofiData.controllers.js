import Users from "../models/Users"
import config from "../config"
import { getDbConnection } from "../db/dbConnection"

/* 
Estructura:
    {
        "username_sic": "<username_sic>",
        "old_password_sic": "<old_password_sic>",
        "new_password_sic": "<new_password_sic>"
    }
*/

export const changePassword = async (req, res) => {
    const { username_sic, old_password_sic, new_password_sic } = req.body
    if (username_sic && old_password_sic && new_password_sic) {
        const encoded_username_sic=Users.encodeUsernameSicofi(username_sic)
        const encoded_old_password_sic=Users.encodeUsernameSicofi(old_password_sic)
        const encoded_new_password_sic=Users.encodeUsernameSicofi(new_password_sic)
        try {
            const dbConnection = getDbConnection()
            let updatedUser = await dbConnection.collection(config.COLLECTION_NAME).findOneAndUpdate(
                { username_sic: encoded_username_sic, password_sic: encoded_old_password_sic }, 
                {
                    $set: { password_sic: encoded_new_password_sic }
                },
                { _id: 1 }
            )
            if (updatedUser) {
                return res.status(200).json({ error: "", message: "Datos actualizados correctamente." })
            } else {
                return res.status(404).json({ error: "", message: "Los datos no coinciden con ningun registro en la base de datos." })
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
        oldUsername: ...,
        newUsername: ...,
        newPassword: ...
    }
*/

// export const setUsernamePassword = async (req, res) => {
//     const { oldUsername, newUsername, newPassword } = req.body
//     if (oldUsername && newUsername && newPassword) {
//         let { userId, mlToken, sicofiToken } = req.decodedJwtToken
//         let jwtToken = req.jwtToken
//         let { user, usersModel } = req.userData

//         if (oldUsername == user.username) {
//             const newUser = new Users({
//                 username: newUsername,
//                 password: newPassword,
//                 client_id: user.client_id,
//                 client_secret: user.client_secret,
//                 grant_type: user.grant_type,
//                 username_sic: user.username_sic,
//                 password_sic: user.password_sic
//             })
//             newUser.password = await Users.encryptPassword(newPassword)
//             try {
//                 let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "username": newUsername, "password": newUser.password }, { new: true }).select({ "_id": 1 })
//                 if (updatedUser) {
//                     return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos." })
//                 } else {
//                     return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
//                 }
//             } catch (error) {
//                 return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
//             }
//         } else {
//             return res.status(404).json({ error: "", message: "El nombre de usuario no coincide." })
//         }
//     } else {
//         return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
//     }
// }