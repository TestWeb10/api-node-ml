/* 
Estructura:
    {
        calendar: [
            {
                "<date>",
                "routes": [
                    "<route_id>",
                    ...
                ]
            },
            ...
        ]
    }
*/

export const setCalendar = async (req, res) => {
    const { calendar } = req.body
    if (calendar) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        try {
            let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "calendar": calendar }, { new: true }).select({ "_id": 0, "calendar": 1 })
            if (updatedUser) {
                return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", calendar: updatedUser.calendar })
            } else {
                return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
            }
        } catch (error) {
            return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

/* 
Formato fecha:
    "AAAA-MM-DD"

Estructura:
    {
        date: "<date>",
        routes: [
            "<route_id>",
            ...
        ]
    }

    - Si la fecha no existe se agrega un elemento nuevo a la lista
    - Si la fecha existe entonces se sobreescribe dicho elemento
*/

export const addRoutesByDate = async (req, res) => {
    const { replace, date, routes } = req.body
    if (date && routes) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        try {
            let updatedUser
            if (replace) {
                updatedUser = await usersModel.findOneAndUpdate({ "_id": userId, "calendar.date": date }, { "$set": { "calendar.$.routes": routes } }, { new: true }).select({ "_id": 0, "calendar": 1 })
                if (!updatedUser) {
                    // Significa que no hay una fecha registrada, por tanto solo agregamos el elemento a la lista
                    updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "$push": { "calendar": { "date": date, "routes": routes } } }, { new: true }).select({ "_id": 0, "calendar": 1 })
                }
            } else {
                let oldRegistries = user.calendar.filter((elem) => elem.date == date)
                if (oldRegistries.length == 0) {
                    // Significa que no hay una fecha registrada, por tanto solo agregamos el elemento a la lista
                    updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "$push": { "calendar": { "date": date, "routes": routes } } }, { new: true }).select({ "_id": 0, "calendar": 1 })
                } else {
                    // Significa que ya existe un registro, por tanto solo expandimos la lista de rutas
                    let newRoutes = oldRegistries[0].routes
                    newRoutes.push(...routes)
                    updatedUser = await usersModel.findOneAndUpdate({ "_id": userId, "calendar.date": date }, { "$set": { "calendar.$.routes": newRoutes } }, { new: true }).select({ "_id": 0, "calendar": 1 })
                }
            }
            if (updatedUser) {
                return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", calendar: updatedUser.calendar })
            } else {
                return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
            }
        } catch (error) {
            return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

/* 
Se recibe hasta que fecha se elimina del calendario

Fecha que se recibe <= Fecha actual
*/

export const deleteRoutesByDate = async (req, res) => {
    const { date } = req.body
    if (date) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        try {
            let calendar = user.calendar
            let newCalendar = []
            let d = new Date(date);
            calendar.forEach((element) => {
                let ed = new Date(element.date);
                if (ed > d) {
                    newCalendar.push(element)
                }
            });
            let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "calendar": newCalendar }, { new: true }).select({ "_id": 0, "calendar": 1 })
            if (updatedUser) {
                return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", calendar: updatedUser.calendar })
            } else {
                return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
            }
        } catch (error) {
            return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

/* 
Se recibe la fecha a eliminar
*/

export const deleteRoutesBySpecificDate = async (req, res) => {
    const { date } = req.body
    if (date) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        try {
            let newCalendar = user.calendar.filter((elem) => elem.date != date)
            let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "calendar": newCalendar }, { new: true }).select({ "_id": 0, "calendar": 1 })
            if (updatedUser) {
                return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", calendar: updatedUser.calendar })
            } else {
                return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
            }
        } catch (error) {
            return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}

/* 
Se recibe hasta que fecha se elimina del calendario

Fecha que se recibe <= Fecha actual
*/
export const deleteInvoicesByDate = async (req, res) => {
    const { date } = req.body
    if (date) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        try {
            let invoices = user.invoices
            let newInvoices = []
            let d = new Date(date);
            invoices.forEach((element) => {
                let initialDate = new Date(element.initial_date);
                let finalDate = new Date(element.final_date);
                if (initialDate > d && finalDate > d) {
                    newInvoices.push(element)
                }
            });
            let updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "invoices": newInvoices }, { new: true }).select({ "_id": 0, "invoices": 1 })
            if (updatedUser) {
                return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", invoices: updatedUser.invoices })
            } else {
                return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
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
    Todo de tipo STRING

    {
        "oldName": "Auto transport 2 new",              // Opcional (para actualizar)
        "name": "Auto transport 2 new new",
        "permsct": "TPXX00",
        "numpermisosct": "XX00",
        "IdentificacionVehicularCartaPorte30": {
            "configvehicular": "VL",
            "placavm": "NB4712B",
            "aniomodelovm": "2009",
            "PesoBrutoVehicular": "3500.00"
        },
        "Seguros": {
            "asegurarespcivil": "GENERAL DE SEGUROS",
            "polizarespcivil": "1/721/62143"
        }
    }
*/

export const addAutoTransport = async (req, res) => {
    const { oldName, name, permsct, numpermisosct, IdentificacionVehicularCartaPorte30, Seguros } = req.body
    if (name, permsct && numpermisosct && IdentificacionVehicularCartaPorte30 && Seguros) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        let obj = {
            name: name,
            permsct: permsct,
            numpermisosct: numpermisosct,
            IdentificacionVehicularCartaPorte30: IdentificacionVehicularCartaPorte30,
            Seguros: Seguros
        }
        let updatedUser
        try {
            if (oldName) {
                // Operacion de actualizar
                if (oldName == name) {
                    // Se modificaron campos de un objeto ya existente (excepto el nombre)
                    updatedUser = await usersModel.findOneAndUpdate({ "_id": userId, "auto_transport.name": oldName }, { "$set": { "auto_transport.$": obj } }, { new: true }).select({ "_id": 0, "auto_transport": 1 })
                } else {
                    if (user.auto_transport.filter((elem) => elem.name == name).length == 0) {
                        // Significa que el nuevo nombre no existe
                        updatedUser = await usersModel.findOneAndUpdate({ "_id": userId, "auto_transport.name": oldName }, { "$set": { "auto_transport.$": obj } }, { new: true }).select({ "_id": 0, "auto_transport": 1 })
                    } else {
                        // Significa que el nuevo nombre ya existe
                        return res.status(400).json({ error: "", message: `El nombre '${name}' para el apartado 'auto transporte' ya existe. Favor de elegir otro nombre.` })
                    }
                }
            } else {
                // Operacion de agregar
                if (user.auto_transport.filter((elem) => elem.name == name).length == 0) {
                    // Significa que no hay una registrada, por tanto solo agregamos el elemento a la lista
                    updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "$push": { "auto_transport": obj } }, { new: true }).select({ "_id": 0, "auto_transport": 1 })
                } else {
                    // Significa que el nuevo nombre ya existe
                    return res.status(400).json({ error: "", message: `El nombre '${name}' para el apartado 'auto transporte' ya existe. Favor de elegir otro nombre.` })
                }
            }

            if (updatedUser) {
                return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", auto_transport: updatedUser.auto_transport })
            } else {
                return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
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
    Todo de tipo STRING

    {
        "name": "Auto transport"
    }
*/

export const deleteAutoTransport = async (req, res) => {
    const { name } = req.body
    if (name) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        let newAutoTransport = user.auto_transport.filter((elem) => elem.name != name)
        if (newAutoTransport.length != user.auto_transport.length) {
            try {
                let deleteddUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "auto_transport": newAutoTransport }, { new: true }).select({ "_id": 0, "auto_transport": 1 })
                if (deleteddUser) {
                    return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", auto_transport: deleteddUser.auto_transport })
                } else {
                    return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
                }
            } catch (error) {
                return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
            }
        } else {
            return res.status(400).json({ error: "", message: `El nombre '${name}' para el apartado 'auto transporte' no existe.` })
        }

    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}


/* 
Estructura:
    Todo de tipo STRING

    {
        "oldRfcfigura": "123456789123",                // Opcional (para actualizar)
        "tipofigura": "01",
        "rfcfigura": "123456789123",
        "numlicencia": "1236547890",
        "nombrefigura": "Juan Perez"
    }
*/

export const addFigureTransport = async (req, res) => {
    const { oldRfcfigura, tipofigura, rfcfigura, numlicencia, nombrefigura } = req.body
    if (tipofigura && rfcfigura && numlicencia && nombrefigura) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        let obj = {
            tipofigura: tipofigura,
            rfcfigura: rfcfigura,
            numlicencia: numlicencia,
            nombrefigura: nombrefigura
        }
        let updatedUser
        try {
            if (oldRfcfigura) {
                // Operacion de actualizar
                if (oldRfcfigura == rfcfigura) {
                    // Se modificaron campos de un objeto ya existente (excepto el RFC)
                    updatedUser = await usersModel.findOneAndUpdate({ "_id": userId, "figure_transport.rfcfigura": oldRfcfigura }, { "$set": { "figure_transport.$": obj } }, { new: true }).select({ "_id": 0, "figure_transport": 1 })
                } else {
                    if (user.figure_transport.filter((elem) => elem.rfcfigura == rfcfigura).length == 0) {
                        // Significa que el nuevo RFC no existe
                        updatedUser = await usersModel.findOneAndUpdate({ "_id": userId, "figure_transport.rfcfigura": oldRfcfigura }, { "$set": { "figure_transport.$": obj } }, { new: true }).select({ "_id": 0, "figure_transport": 1 })
                    } else {
                        // Significa que el nuevo RFC ya existe
                        return res.status(400).json({ error: "", message: `El RFC '${rfcfigura}' para el apartado 'figura transporte' ya existe.` })
                    }
                }
            } else {
                // Operacion de agregar
                if (user.figure_transport.filter((elem) => elem.rfcfigura == rfcfigura).length == 0) {
                    // Significa que no hay una registrada, por tanto solo agregamos el elemento a la lista
                    updatedUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "$push": { "figure_transport": obj } }, { new: true }).select({ "_id": 0, "figure_transport": 1 })
                } else {
                    // Significa que el nuevo RFC ya existe
                    return res.status(400).json({ error: "", message: `El RFC '${rfcfigura}' para el apartado 'figura transporte' ya existe.` })
                }
            }

            if (updatedUser) {
                return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", figure_transport: updatedUser.figure_transport })
            } else {
                return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
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
    Todo de tipo STRING

    {
        "rfcfigura": "123456789123",
    }
*/

export const deleteFigureTransport = async (req, res) => {
    const { rfcfigura } = req.body
    if (rfcfigura) {
        let { userId, mlToken, sicofiToken } = req.decodedJwtToken
        let jwtToken = req.jwtToken
        let { user, usersModel } = req.userData

        let newFigureTransport = user.figure_transport.filter((elem) => elem.rfcfigura != rfcfigura)
        if (newFigureTransport.length != user.figure_transport.length) {
            try {
                let deleteddUser = await usersModel.findOneAndUpdate({ "_id": userId }, { "figure_transport": newFigureTransport }, { new: true }).select({ "_id": 0, "figure_transport": 1 })
                if (deleteddUser) {
                    return res.status(200).json({ error: "", message: "La operacion fue exitosa en la base de datos.", figure_transport: deleteddUser.figure_transport })
                } else {
                    return res.status(400).json({ error: "", message: "La operacion no fue exitosa en la base de datos." })
                }
            } catch (error) {
                return res.status(409).json({ error: error, message: "Ha ocurrido un problema en la base de datos." })
            }
        } else {
            return res.status(400).json({ error: "", message: `El RFC '${rfcfigura}' para el apartado 'figura transporte' no existe.` })
        }

    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}