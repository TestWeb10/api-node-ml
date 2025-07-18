import fetch from "cross-fetch"
import axios from "axios";
import config from "../config"

class Tokens {
    static async getMLToken(client_id, client_secret, grant_type) {
        // Vencido
        // return "APP_USR-2609380014923051-020621-de1db78888d74d9e65476d3c9ac8d7d2-1083177088"
        // Nuevo
        // return "APP_USR-2609380014923051-020902-2bf1326747d177d80169e7885a530f03-1083177088"
        let expiredToken = "APP_USR-2609380014923051-020621-de1db78888d74d9e65476d3c9ac8d7d2-1083177088"
        if (client_id && client_secret && grant_type) {
            const params = new URLSearchParams();
            params.append('client_id', client_id);
            params.append('client_secret', client_secret);
            params.append('grant_type', grant_type);

            const URI = config.URI_ML + "/oauth/token"
            try {
                const response = await fetch(URI, {
                    method: 'POST',
                    body: params
                });
                const text = await response.text();
                try {
                    const data = JSON.parse(text);
                    // console.log(`(getMLToken) data:  ${data}`);
                    if (data.access_token) {
                        return data.access_token
                    } else {
                        return expiredToken
                    }
                } catch (error) {
                    console.log(`(getMLToken) No es un json valido la respuesta. La respuesta es:  ${text}`);
                }
            } catch (error) {
                console.log(`(getMLToken) error:  ${error}`);
                return expiredToken
            }
        } else {
            return expiredToken
        }
    }

    static async getSicofiToken(username_sic, password_sic, userType) {
        // Vencido
        // return "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGlnaWZhY3Q1MTdAbWFpbC5jb20iLCJleHAiOjE3MDczNTQzODcsImlzcyI6ImRpZ2lmYWN0LmNvbSIsImF1ZCI6ImRpZ2lmYWN0LmNvbSJ9.mt4lUtCHqfisXrwx1RuTbH_0TUbavad6DRYCq1BMv4Q"
        // Nuevo 
        // return "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGlnaWZhY3Q1MTdAbWFpbC5jb20iLCJleHAiOjE3MDc0NDM4MTUsImlzcyI6ImRpZ2lmYWN0LmNvbSIsImF1ZCI6ImRpZ2lmYWN0LmNvbSJ9.UCy4gyhDDW03qsyAmacuKhpMryP4lEWT6u-qKEYqgX4"
        let expiredToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGlnaWZhY3Q1MTdAbWFpbC5jb20iLCJleHAiOjE3MDczNTQzODcsImlzcyI6ImRpZ2lmYWN0LmNvbSIsImF1ZCI6ImRpZ2lmYWN0LmNvbSJ9.mt4lUtCHqfisXrwx1RuTbH_0TUbavad6DRYCq1BMv4Q"
        if (username_sic && password_sic) {
            const cad = username_sic + ":" + password_sic
            const base64data = Buffer.from(cad).toString('base64')
            try {
                const URI = userType == "demo" ? config.URI_DEMO_SICOFI + "/auth/token" : config.URI_PRODUCTION_SICOFI + "/auth/token"
                const response = await fetch(URI, {
                    method: 'POST',
                    headers: { 'Authorization': 'Basic ' + base64data }
                });
                const data = await response.json();
                if (data.token) {
                    return data.token
                } else {
                    return expiredToken
                }
            } catch (error) {
                return expiredToken
            }
        } else {
            return expiredToken
        }
    }
}

module.exports = Tokens