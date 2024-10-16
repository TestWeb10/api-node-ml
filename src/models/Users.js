import {Schema, model} from "mongoose"
import bcrypt from "bcrypt"
import config from "../config"

const usersSchema=new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    client_id: { type: String, required: true },
    client_secret: { type: String, required: true },
    grant_type: { type: String, required: true },
    username_sic: { type: String, required: true },
    password_sic: { type: String, required: true },
    calendar: { type : Array , "default" : [] },
    invoices: { type : Array , "default" : [] },
    auto_transport: { type : Array , "default" : [] },
    figure_transport: { type : Array , "default" : [] },
    user_type: { type : String , "default" : "demo" }
})

usersSchema.methods.encryptPassword=async password => {
    const salts=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password, salts)
    return hashPassword
}

usersSchema.methods.matchPassword=async function(password) {
    const match=await bcrypt.compare(password, this.password)
    return match
}

usersSchema.methods.encodeUsernameSicofi=username_sic => {
    const base64data=Buffer.from(username_sic).toString('base64')
    return base64data
}

usersSchema.methods.encodePasswordSicofi=password_sic => {
    const base64data=Buffer.from(password_sic).toString('base64')
    return base64data
}

usersSchema.statics.decodeUsernameSicofi=function(username_sic) {
    const decoded_username_sic=Buffer.from(username_sic, 'base64').toString('ascii')
    return decoded_username_sic
}

usersSchema.statics.decodePasswordSicofi=function(password_sic) {
    const decoded_password_sic=Buffer.from(password_sic, 'base64').toString('ascii')
    return decoded_password_sic
}

module.exports = model(config.COLLECTION_NAME, usersSchema)