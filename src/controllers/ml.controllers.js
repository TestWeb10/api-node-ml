import config from "../config"
import jwt from "jsonwebtoken"
import fetch from "cross-fetch"
import Tokens from "./tokens"
import catalogCP from "../public/CatalogosCartaPorte30/CatalogosCartaPorte30.json"
import fs from "fs/promises"

const lowercaseAndRemoveAccents = (cad) => {
    return cad.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const makePretty = (cad) => {
    let newCad = cad.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9 ]/g, "").trim().split(/[\s,\t,\n]+/).join(' ');
    newCad = (newCad == "") ? "VACIO" : newCad
    return newCad
}

/* 
Estructura:
    {
        routes: [
            "<route_id>",
            ...
        ]
    }

    - 'fetch' es mucho mas rapido que 'axios'
*/

export const getShipments = async (req, res) => {
    const { routes } = req.body
    if (routes) {
        if (routes.length > 0) {
            let { userId, mlToken, sicofiToken } = req.decodedJwtToken
            let jwtToken = req.jwtToken
            let { user, usersModel } = req.userData

            for (let it = 0; it < 2; it++) {
                try {
                    let shipments = []
                    let unauthorizedRoutes = []
                    let invalidRoutes = []
                    let uris = []
                    for (let i = 0; i < routes.length; i++) {
                        let URI = config.URI_ML + "/routes/" + routes[i] + "/carta-porte-details?access_token=" + mlToken
                        uris.push(fetch(URI, {
                            method: 'GET'
                        }))
                    }                    
                    let responsesRoutes = await Promise.all(uris);
                    let statusRoutes = responsesRoutes.map((elem) => elem.status);
                    let band = false
                    for (let i = 0; i < statusRoutes.length; i++) {
                        if (statusRoutes[i] == 401 && it == 0) {
                            // Token vencido, por tanto obtenemos uno nuevo y lo volvemos a intentar
                            mlToken = await Tokens.getMLToken(user.client_id, user.client_secret, user.grant_type)
                            jwtToken = jwt.sign({
                                userId: userId,
                                mlToken: mlToken,
                                sicofiToken: sicofiToken
                            }, config.JWT_SECRET, {
                                expiresIn: "1d"
                            })
                            band = true
                            break
                        }
                    }
                    if (band && it == 0) {
                        continue
                    }
                    let promisesRoutes = responsesRoutes.map((elem) => elem.json());
                    let responseRoutes = await Promise.all(promisesRoutes);
                    for (let i = 0; i < responseRoutes.length; i++) {
                        if (statusRoutes[i] != 200) {
                            if (statusRoutes[i] == 401) {
                                unauthorizedRoutes.push(routes[i])
                            }
                            if (statusRoutes[i] == 404) {
                                invalidRoutes.push(routes[i])
                            }
                            let obj = {
                                "entity_id": routes[i],
                                "status": statusRoutes[i],
                                "error": ""
                            }
                            shipments.push(obj)
                        } else {
                            let uris = []
                            for (let j = 0; j < responseRoutes[i].shipments.length; j++) {
                                let URI = config.URI_ML + responseRoutes[i].shipments[j].url + "?access_token=" + mlToken
                                uris.push(fetch(URI, {
                                    method: 'GET'
                                }))
                            }
                            let responsesShipments = await Promise.all(uris);
                            let statusShipments = responsesShipments.map((elem) => elem.status);
                            let promisesShipments = responsesShipments.map((elem) => elem.json());
                            let responseShipments = await Promise.all(promisesShipments);

                            let obj = responseRoutes[i]
                            for (let j = 0; j < responseShipments.length; j++) {
                                if (statusShipments[j] != 200) {
                                    // Significa que no hay informacion para dicho envio
                                    obj.shipments[j].shipment = {
                                        "status": statusShipments[j],
                                        "error": "error"
                                    }
                                } else {
                                    obj.shipments[j].shipment = responseShipments[j]

                                    // PRE-PROCESAMIENTO
                                    // Arreglamos el texto para que sea adecuado
                                    obj.shipments[j].shipment.recipient.full_name = makePretty(obj.shipments[j].shipment.recipient.full_name)

                                    let shipmentKeys = ["origin", "destination"]
                                    shipmentKeys.forEach((shipmentKey) => {
                                        // Agregamos la siguiente informacion (importante a la hora de timbrar con complemento carta porte) (colonia, localidad, municipio, pais, estado)
                                        if (shipmentKey == "destination") {
                                            // Codigos postales para utilizar: 44100 45100 45200 45500 45400
                                            obj.shipments[j].shipment[shipmentKey].address.zip_code = "44100" // Guadalajara Centro
                                            let estado = "JAL"
                                            let colonia = "0003"
                                            let localidad = "03"
                                            let municipio = "039"
                                            let pais = "MEX"

                                            obj.shipments[j].shipment[shipmentKey].address.catalogKey = {
                                                "estado": estado,
                                                "colonia": colonia,
                                                "localidad": localidad,
                                                "municipio": municipio,
                                                "pais": pais,
                                            }
                                        }

                                        if (shipmentKey == "destination") {
                                            obj.shipments[j].shipment[shipmentKey].fiscal_information.rfc = "XAXX010101000" // RFC generico
                                        }
                                        // Arreglamos los textos para que sean adecuados
                                        obj.shipments[j].shipment[shipmentKey].fiscal_information.full_name = makePretty(obj.shipments[j].shipment[shipmentKey].fiscal_information.full_name)
                                        obj.shipments[j].shipment[shipmentKey].address.address_line = makePretty(obj.shipments[j].shipment[shipmentKey].address.address_line)
                                        obj.shipments[j].shipment[shipmentKey].address.street_name = makePretty(obj.shipments[j].shipment[shipmentKey].address.street_name)
                                        obj.shipments[j].shipment[shipmentKey].address.street_number = makePretty(obj.shipments[j].shipment[shipmentKey].address.street_number)
                                        obj.shipments[j].shipment[shipmentKey].address.city.name = makePretty(obj.shipments[j].shipment[shipmentKey].address.city.name)
                                        obj.shipments[j].shipment[shipmentKey].address.state.name = makePretty(obj.shipments[j].shipment[shipmentKey].address.state.name)
                                        obj.shipments[j].shipment[shipmentKey].address.country.name = makePretty(obj.shipments[j].shipment[shipmentKey].address.country.name)
                                        obj.shipments[j].shipment[shipmentKey].address.neighborhood.name = makePretty(obj.shipments[j].shipment[shipmentKey].address.neighborhood.name)
                                        obj.shipments[j].shipment[shipmentKey].address.municipality.name = makePretty(obj.shipments[j].shipment[shipmentKey].address.municipality.name)
                                    })

                                    // Modificamos para cada item el atributo 'dangerous_material' (mercado libre no concuerda en algunos con el sat)
                                    for (let k = 0; k < obj.shipments[j].shipment.package.items.length; k++) {
                                        let categorySat = obj.shipments[j].shipment.package.items[k].category_sat
                                        // A veces no viene la categoria
                                        if (!categorySat) {
                                            obj.shipments[j].shipment.package.items[k].category_sat = "01010101"
                                            categorySat = obj.shipments[j].shipment.package.items[k].category_sat
                                        }
                                        // Existen categorias como las siguientes que no son validas: "1010101"
                                        if (categorySat.length < 8){
                                            categorySat=categorySat.padStart(8, '0')
                                        }
                                        
                                        let dangerousMaterial = catalogCP["c_ClaveProdServCP"][categorySat]["Material Peligroso"]
                                        obj.shipments[j].shipment.package.items[k].dangerous_material = dangerousMaterial
                                        // Arreglamos los textos del item para que sean adecuados
                                        obj.shipments[j].shipment.package.items[k].description = makePretty(obj.shipments[j].shipment.package.items[k].description).substring(0, 1000)
                                        obj.shipments[j].shipment.package.items[k].package_description = makePretty(obj.shipments[j].shipment.package.items[k].package_description)
                                    }
                                }
                            }
                            shipments.push(obj)
                        }
                    }

                    // res.cookie('session', jwtToken)
                    // res.setHeader('Cache-Control', 'private')
                    if (unauthorizedRoutes.length != 0) {
                        // return res.status(401).json({ error: "", message: "Se ha vencido el token de 'Mercado Libre' y no fue posible renovarlo.", jwtToken: jwtToken })
                        return res.status(401).json({ error: "", message: "Rutas que no se pudieron obtener debido a que no se tenia autorizacion: " + unauthorizedRoutes.join(", "), jwtToken: jwtToken })
                    }
                    if (invalidRoutes.length != 0) {
                        return res.status(404).json({ error: "", message: "Rutas no existentes: " + invalidRoutes.join(", "), jwtToken: jwtToken })
                    } else {
                        // Para guardar el contenido de la respuesta
                        // try {
                        //     await fs.writeFile("/home/chuy/Descargas/shipments.json", JSON.stringify(shipments));
                        //     console.log("Saved");
                        // } catch (err) {
                        //     console.log(err);
                        // }
                        return res.status(200).json({ error: "", message: "La peticion fue satisfactoria.", jwtToken: jwtToken, shipments: shipments })
                    }
                } catch (error) {
                    // console.log(error);
                    return res.status(400).json({ error: "", message: "Ha ocurrido un problema al realizar la peticion.", jwtToken: jwtToken })
                }
            }
        } else {
            return res.status(400).json({ error: "", message: "La lista de rutas esta vacia." })
        }
    } else {
        return res.status(400).json({ error: "", message: "No se recibieron los datos completos." })
    }
}
