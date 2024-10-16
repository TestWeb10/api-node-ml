import Users from "../models/Users"
import config from "../config"
import jwt from "jsonwebtoken"
import fetch from "cross-fetch"
import Tokens from "./tokens"
import FormData from "form-data"
import fs from "fs/promises"

export const cfdiTraslado = async (req, res) => {
    const { invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI } = req.body
    if (invoiceInformation && DatosCFDI && ReceptorCFDI && ConceptosCFDI) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        let userType = user.user_type
        for (let it = 0; it < 2; it++) {
            try {
                let body = {
                    'Usuario': Users.decodeUsernameSicofi(user.username_sic),
                    'Contrasena': Users.decodePasswordSicofi(user.password_sic)
                }
                body[`DatosCFDI${config.CFDI_VERSION}`]=DatosCFDI
                body[`ReceptorCFDI${config.CFDI_VERSION}`]=ReceptorCFDI
                body[`ConceptosCFDI${config.CFDI_VERSION}`]=ConceptosCFDI
                let headers = {
                    'Authorization': "Bearer " + sicofiToken,
                    'Content-Type': 'application/json'
                }
                let URI = userType == "demo" ? config.URI_DEMO_SICOFI + config.URI_INVOICE : config.URI_PRODUCTION_SICOFI + config.URI_INVOICE
                let response = await fetch(URI, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                })
                // Para guardar el contenido de la peticion
                // try {
                //     await fs.writeFile(`/home/chuy/Descargas/${userType}_traslado_body.json`, JSON.stringify(body));
                //     console.log(`URI: ${URI}`);
                //     console.log(`(${userType}) Saved traslado body`);
                // } catch (err) {
                //     console.log(err);
                // }

                let band = false
                if (response.status == 401 && it == 0) {
                    // Token vencido, por tanto obtenemos uno nuevo y lo volvemos a intentar
                    sicofiToken = await Tokens.getSicofiToken(Users.decodeUsernameSicofi(user.username_sic), Users.decodePasswordSicofi(user.password_sic), userType)
                    jwtToken = jwt.sign({
                        userId: userId,
                        mlToken: mlToken,
                        sicofiToken: sicofiToken
                    }, config.JWT_SECRET, {
                        expiresIn: "1d"
                    })
                    band = true
                }
                if (band && it == 0) {
                    continue
                }

                if (response.status == 401) {
                    // El token no fue posible renovarlo (ocurrio un problema)
                    return res.status(401).json({ error: "", message: "Se ha vencido el token de 'Sicofi' y no fue posible renovarlo.", jwtToken: jwtToken })
                }
                if (response.status == 400) {
                    // Lo que se envia esta mal (Sicofi se queja de lo que se envia)
                    let resJson = await response.json()
                    // console.log(resJson);
                    let message = "Ha ocurrido un problema al realizar la peticion. Los datos enviados a Sicofi estan mal."
                    if (resJson.errors) {
                        message += "\n\nERRORES (Sicofi)"
                        Object.keys(resJson.errors).forEach((key) => {
                            let descriptionErrors = resJson.errors[key]
                            message += `\n${key}:`
                            descriptionErrors.forEach((description) => {
                                message += `\n\t * ${description}`
                            })
                        })
                    }
                    if (resJson.message) {
                        message += `\n\nERRORES (Sicofi)\n${resJson.message}`
                    }
                    return res.status(400).json({ error: "", message: message, jwtToken: jwtToken })
                }
                if (response.status == 200) {
                    // La variable 'data' contiene el XML que se envia en formato texto
                    // Para guardar el xml en formato texto
                    let invoiceText = await response.text()
                    // try {
                    //     await fs.writeFile(`/home/chuy/Descargas/${userType}_traslado_xml.txt`, invoiceText);
                    //     console.log(`(${userType}) Saved traslado xml (txt)`);
                    // } catch (err) {
                    //     console.log(err);
                    // }

                    try {
                        let obj = {
                            initial_date: invoiceInformation.initialDate,
                            final_date: invoiceInformation.finalDate,
                            subtotal: invoiceInformation.subtotal,
                            total_routes: invoiceInformation.totalRoutes
                        }
                        let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "$push": { "invoices": obj } }, { new: true }).select({ "_id": 0, "invoices": 1 })
                        return res.status(200).json({ error: "", message: "Los datos se enviaron correctamente a Sicofi. Ademas se ha guardado en la base de datos correctamente.", jwtToken: jwtToken, invoices: updatedUser.invoices, invoiceText: invoiceText })
                    } catch (error) {
                        return res.status(200).json({ error: "", message: "Los datos se enviaron correctamente a Sicofi. Con el inconveniente de que no fue posible guardar en la base de datos correctamente.", jwtToken: jwtToken, invoices: user.invoices })
                    }
                }
                let message = "La peticion no fue satisfactoria."
                if (response.status == 504) {
                    // Se agoto el tiempo (suele suceder cuando se envia mucha informacion o cuando Sicofi esta muy saturado, es decir, esta lento)
                    message += "\nSicofi ha rechazado la peticion.\nPuede ser que Sicofi este muy saturado o enviar menos informacion puede funcionar."
                }
                return res.status(response.status).json({ error: "", message: message, jwtToken: jwtToken })
            } catch (error) {
                return res.status(400).json({ error: "", message: "Ha ocurrido un problema al realizar la peticion.", jwtToken: jwtToken })
            }
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

export const cfdiIngreso = async (req, res) => {
    const { invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI } = req.body
    if (invoiceInformation && DatosCFDI && ReceptorCFDI && ConceptosCFDI) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        let userType = user.user_type
        for (let it = 0; it < 2; it++) {
            try {
                let body = {
                    'Usuario': Users.decodeUsernameSicofi(user.username_sic),
                    'Contrasena': Users.decodePasswordSicofi(user.password_sic),
                }
                body[`DatosCFDI${config.CFDI_VERSION}`]=DatosCFDI
                body[`ReceptorCFDI${config.CFDI_VERSION}`]=ReceptorCFDI
                body[`ConceptosCFDI${config.CFDI_VERSION}`]=ConceptosCFDI
                let headers = {
                    'Authorization': "Bearer " + sicofiToken,
                    'Content-Type': 'application/json'
                }
                let URI = userType == "demo" ? config.URI_DEMO_SICOFI + config.URI_INVOICE : config.URI_PRODUCTION_SICOFI + config.URI_INVOICE
                let response = await fetch(URI, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                })
                // Para guardar el contenido de la peticion
                // try {
                //     await fs.writeFile(`/home/chuy/Descargas/${userType}_ingreso_body.json`, JSON.stringify(body));
                //     console.log(`URI: ${URI}`);
                //     console.log(`(${userType}) Saved ingreso body`);
                // } catch (err) {
                //     console.log(err);
                // }

                let band = false
                if (response.status == 401 && it == 0) {
                    // Token vencido, por tanto obtenemos uno nuevo y lo volvemos a intentar
                    sicofiToken = await Tokens.getSicofiToken(Users.decodeUsernameSicofi(user.username_sic), Users.decodePasswordSicofi(user.password_sic), userType)
                    jwtToken = jwt.sign({
                        userId: userId,
                        mlToken: mlToken,
                        sicofiToken: sicofiToken
                    }, config.JWT_SECRET, {
                        expiresIn: "1d"
                    })
                    band = true
                }
                if (band && it == 0) {
                    continue
                }

                if (response.status == 401) {
                    // El token no fue posible renovarlo (ocurrio un problema)
                    return res.status(401).json({ error: "", message: "Se ha vencido el token de 'Sicofi' y no fue posible renovarlo.", jwtToken: jwtToken })
                }
                if (response.status == 400) {
                    // Lo que se envia esta mal (Sicofi se queja de lo que se envia)
                    let resJson = await response.json()
                    // console.log(resJson);
                    let message = "Ha ocurrido un problema al realizar la peticion. Los datos enviados a Sicofi estan mal."
                    if (resJson.errors) {
                        message += "\n\nERRORES (Sicofi)"
                        Object.keys(resJson.errors).forEach((key) => {
                            let descriptionErrors = resJson.errors[key]
                            message += `\n${key}:`
                            descriptionErrors.forEach((description) => {
                                message += `\n\t * ${description}`
                            })
                        })
                    }
                    if (resJson.message) {
                        message += `\n\nERRORES (Sicofi)\n${resJson.message}`
                    }
                    return res.status(400).json({ error: "", message: message, jwtToken: jwtToken })
                }
                if (response.status == 200) {
                    // La variable 'data' contiene el XML que se envia en formato texto
                    // Para guardar el xml en formato texto
                    let invoiceText = await response.text()
                    // try {
                    //     await fs.writeFile(`/home/chuy/Descargas/${userType}_ingreso_xml.txt`, invoiceText);
                    //     console.log(`(${userType}) Saved ingreso xml (txt)`);
                    // } catch (err) {
                    //     console.log(err);
                    // }

                    try {
                        let obj = {
                            initial_date: invoiceInformation.initialDate,
                            final_date: invoiceInformation.finalDate,
                            subtotal: invoiceInformation.subtotal,
                            total_routes: invoiceInformation.totalRoutes
                        }
                        let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "$push": { "invoices": obj } }, { new: true }).select({ "_id": 0, "invoices": 1 })
                        return res.status(200).json({ error: "", message: "Los datos se enviaron correctamente a Sicofi. Ademas se ha guardado en la base de datos correctamente.", jwtToken: jwtToken, invoices: updatedUser.invoices, invoiceText: invoiceText })
                    } catch (error) {
                        return res.status(200).json({ error: "", message: "Los datos se enviaron correctamente a Sicofi. Con el inconveniente de que no fue posible guardar en la base de datos correctamente.", jwtToken: jwtToken, invoices: user.invoices })
                    }
                }
                let message = "La peticion no fue satisfactoria."
                if (response.status == 504) {
                    // Se agoto el tiempo (suele suceder cuando se envia mucha informacion o cuando Sicofi esta muy saturado, es decir, esta lento)
                    message += "\nSicofi ha rechazado la peticion.\nPuede ser que Sicofi este muy saturado o enviar menos informacion puede funcionar."
                }
                return res.status(response.status).json({ error: "", message: message, jwtToken: jwtToken })
            } catch (error) {
                console.log(error);
                return res.status(400).json({ error: "", message: "Ha ocurrido un problema al realizar la peticion.", jwtToken: jwtToken })
            }
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

export const cfdiTrasladoCP = async (req, res) => {
    const { invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI, CartaPorte } = req.body
    if (invoiceInformation && DatosCFDI && ReceptorCFDI && ConceptosCFDI && CartaPorte) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        let userType = user.user_type
        for (let it = 0; it < 2; it++) {
            try {
                let body = {
                    'Usuario': Users.decodeUsernameSicofi(user.username_sic),
                    'Contrasena': Users.decodePasswordSicofi(user.password_sic),
                }
                body[`DatosCFDI${config.CFDI_VERSION}`]=DatosCFDI
                body[`ReceptorCFDI${config.CFDI_VERSION}`]=ReceptorCFDI
                body[`ConceptosCFDI${config.CFDI_VERSION}`]=ConceptosCFDI
                body[`CartaPorte${config.CP_VERSION}`]=CartaPorte
                let headers = {
                    'Authorization': "Bearer " + sicofiToken,
                    'Content-Type': 'application/json'
                }
                let URI = userType == "demo" ? config.URI_DEMO_SICOFI + config.URI_INVOICE : config.URI_PRODUCTION_SICOFI + config.URI_INVOICE
                let response = await fetch(URI, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                })
                // Para guardar el contenido de la peticion
                // try {
                //     await fs.writeFile(`/home/chuy/Descargas/${userType}_traslado_body.json`, JSON.stringify(body));
                //     console.log(`URI: ${URI}`);
                //     console.log(`(${userType}) Saved traslado body`);
                // } catch (err) {
                //     console.log(err);
                // }

                let band = false
                if (response.status == 401 && it == 0) {
                    // Token vencido, por tanto obtenemos uno nuevo y lo volvemos a intentar
                    sicofiToken = await Tokens.getSicofiToken(Users.decodeUsernameSicofi(user.username_sic), Users.decodePasswordSicofi(user.password_sic), userType)
                    jwtToken = jwt.sign({
                        userId: userId,
                        mlToken: mlToken,
                        sicofiToken: sicofiToken
                    }, config.JWT_SECRET, {
                        expiresIn: "1d"
                    })
                    band = true
                }
                if (band && it == 0) {
                    continue
                }

                // res.cookie('session', jwtToken)
                // res.setHeader('Cache-Control', 'private')
                if (response.status == 401) {
                    // El token no fue posible renovarlo (ocurrio un problema)
                    return res.status(401).json({ error: "", message: "Se ha vencido el token de 'Sicofi' y no fue posible renovarlo.", jwtToken: jwtToken })
                }
                if (response.status == 400) {
                    // Lo que se envia esta mal (Sicofi se queja de lo que se envia)
                    let resJson = await response.json()
                    // console.log(resJson);
                    let message = "Ha ocurrido un problema al realizar la peticion. Los datos enviados a Sicofi estan mal."
                    if (resJson.errors) {
                        message += "\n\nERRORES (Sicofi)"
                        Object.keys(resJson.errors).forEach((key) => {
                            let descriptionErrors = resJson.errors[key]
                            message += `\n${key}:`
                            descriptionErrors.forEach((description) => {
                                message += `\n\t * ${description}`
                            })
                        })
                    }
                    if (resJson.message) {
                        message += `\n\nERRORES (Sicofi)\n${resJson.message}`
                    }
                    return res.status(400).json({ error: "", message: message, jwtToken: jwtToken })
                }
                if (response.status == 200) {
                    // La variable 'data' contiene el XML que se envia en formato texto
                    // Para guardar el xml en formato texto
                    let invoiceText = await response.text()
                    // try {
                    //     await fs.writeFile(`/home/chuy/Descargas/${userType}_traslado_xml.txt`, invoiceText);
                    //     console.log(`(${userType}) Saved traslado xml (txt)`);
                    // } catch (err) {
                    //     console.log(err);
                    // }

                    try {
                        let obj = {
                            initial_date: invoiceInformation.initialDate,
                            final_date: invoiceInformation.finalDate,
                            subtotal: invoiceInformation.subtotal,
                            total_routes: invoiceInformation.totalRoutes
                        }
                        let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "$push": { "invoices": obj } }, { new: true }).select({ "_id": 0, "invoices": 1 })
                        return res.status(200).json({ error: "", message: "Los datos se enviaron correctamente a Sicofi. Ademas se ha guardado en la base de datos correctamente.", jwtToken: jwtToken, invoices: updatedUser.invoices, invoiceText: invoiceText })
                    } catch (error) {
                        return res.status(200).json({ error: "", message: "Los datos se enviaron correctamente a Sicofi. Con el inconveniente de que no fue posible guardar en la base de datos correctamente.", jwtToken: jwtToken, invoices: user.invoices })
                    }
                }
                let message = "La peticion no fue satisfactoria."
                if (response.status == 504) {
                    // Se agoto el tiempo (suele suceder cuando se envia mucha informacion o cuando Sicofi esta muy saturado, es decir, esta lento)
                    message += "\nSicofi ha rechazado la peticion.\nPuede ser que Sicofi este muy saturado o enviar menos informacion puede funcionar."
                }
                return res.status(response.status).json({ error: "", message: message, jwtToken: jwtToken })
            } catch (error) {
                return res.status(400).json({ error: "", message: "Ha ocurrido un problema al realizar la peticion.", jwtToken: jwtToken })
            }
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

export const cfdiIngresoCP = async (req, res) => {
    const { invoiceInformation, DatosCFDI, ReceptorCFDI, ConceptosCFDI, CartaPorte } = req.body
    if (invoiceInformation && DatosCFDI && ReceptorCFDI && ConceptosCFDI && CartaPorte) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        let userType = user.user_type
        for (let it = 0; it < 2; it++) {
            try {
                let body = {
                    'Usuario': Users.decodeUsernameSicofi(user.username_sic),
                    'Contrasena': Users.decodePasswordSicofi(user.password_sic),
                }
                body[`DatosCFDI${config.CFDI_VERSION}`]=DatosCFDI
                body[`ReceptorCFDI${config.CFDI_VERSION}`]=ReceptorCFDI
                body[`ConceptosCFDI${config.CFDI_VERSION}`]=ConceptosCFDI
                body[`CartaPorte${config.CP_VERSION}`]=CartaPorte
                let headers = {
                    'Authorization': "Bearer " + sicofiToken,
                    'Content-Type': 'application/json'
                }
                let URI = userType == "demo" ? config.URI_DEMO_SICOFI + config.URI_INVOICE : config.URI_PRODUCTION_SICOFI + config.URI_INVOICE
                let response = await fetch(URI, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                })
                // Para guardar el contenido de la peticion
                // try {
                //     await fs.writeFile(`/home/chuy/Descargas/${userType}_ingreso_body.json`, JSON.stringify(body));
                //     console.log(`URI: ${URI}`);
                //     console.log(`(${userType}) Saved ingreso body`);
                // } catch (err) {
                //     console.log(err);
                // }

                let band = false
                if (response.status == 401 && it == 0) {
                    // Token vencido, por tanto obtenemos uno nuevo y lo volvemos a intentar
                    sicofiToken = await Tokens.getSicofiToken(Users.decodeUsernameSicofi(user.username_sic), Users.decodePasswordSicofi(user.password_sic), userType)
                    jwtToken = jwt.sign({
                        userId: userId,
                        mlToken: mlToken,
                        sicofiToken: sicofiToken
                    }, config.JWT_SECRET, {
                        expiresIn: "1d"
                    })
                    band = true
                }
                if (band && it == 0) {
                    continue
                }

                // res.cookie('session', jwtToken)
                // res.setHeader('Cache-Control', 'private')
                if (response.status == 401) {
                    // El token no fue posible renovarlo (ocurrio un problema)
                    return res.status(401).json({ error: "", message: "Se ha vencido el token de 'Sicofi' y no fue posible renovarlo.", jwtToken: jwtToken })
                }
                if (response.status == 400) {
                    // Lo que se envia esta mal (Sicofi se queja de lo que se envia)
                    let resJson = await response.json()
                    // console.log(resJson);
                    let message = "Ha ocurrido un problema al realizar la peticion. Los datos enviados a Sicofi estan mal."
                    if (resJson.errors) {
                        message += "\n\nERRORES (Sicofi)"
                        Object.keys(resJson.errors).forEach((key) => {
                            let descriptionErrors = resJson.errors[key]
                            message += `\n${key}:`
                            descriptionErrors.forEach((description) => {
                                message += `\n\t * ${description}`
                            })
                        })
                    }
                    if (resJson.message) {
                        message += `\n\nERRORES (Sicofi)\n${resJson.message}`
                    }
                    return res.status(400).json({ error: "", message: message, jwtToken: jwtToken })
                }
                if (response.status == 200) {
                    // La variable 'data' contiene el XML que se envia en formato texto
                    // Para guardar el xml en formato texto
                    let invoiceText = await response.text()
                    // try {
                    //     await fs.writeFile(`/home/chuy/Descargas/${userType}_ingreso_xml.txt`, invoiceText);
                    //     console.log(`(${userType}) Saved ingreso xml (txt)`);
                    // } catch (err) {
                    //     console.log(err);
                    // }

                    try {
                        let obj = {
                            initial_date: invoiceInformation.initialDate,
                            final_date: invoiceInformation.finalDate,
                            subtotal: invoiceInformation.subtotal,
                            total_routes: invoiceInformation.totalRoutes
                        }
                        let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "$push": { "invoices": obj } }, { new: true }).select({ "_id": 0, "invoices": 1 })
                        return res.status(200).json({ error: "", message: "Los datos se enviaron correctamente a Sicofi. Ademas se ha guardado en la base de datos correctamente.", jwtToken: jwtToken, invoices: updatedUser.invoices, invoiceText: invoiceText })
                    } catch (error) {
                        return res.status(200).json({ error: "", message: "Los datos se enviaron correctamente a Sicofi. Con el inconveniente de que no fue posible guardar en la base de datos correctamente.", jwtToken: jwtToken, invoices: user.invoices })
                    }
                }
                let message = "La peticion no fue satisfactoria."
                if (response.status == 504) {
                    // Se agoto el tiempo (suele suceder cuando se envia mucha informacion o cuando Sicofi esta muy saturado, es decir, esta lento)
                    message += "\nSicofi ha rechazado la peticion.\nPuede ser que Sicofi este muy saturado o enviar menos informacion puede funcionar."
                }
                return res.status(response.status).json({ error: "", message: message, jwtToken: jwtToken })
            } catch (error) {
                console.log(error);
                return res.status(400).json({ error: "", message: "Ha ocurrido un problema al realizar la peticion.", jwtToken: jwtToken })
            }
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}






