"use strict";

const mysql = require("mysql");

class Database {
    constructor(optiot) {
        this.optiot = optiot;
    }

    runQuery(sql, parametrit) {
        return new Promise(async (resolve, reject) => {
            try {
                const yhteys = mysql.createConnection(this.optiot);
                yhteys.connect();
                yhteys.query(sql, parametrit, (virhe, tulos) => {
                    if (virhe) {
                        reject(virhe);
                    } else {
                        resolve(tulos);
                    }
                });
                yhteys.end();
            } catch (virhe) {
                reject(virhe);
            }
        });
    }
}

module.exports = Database;

// const db = mysql.createPool({
//     host: "10.9.0.60",
//     user: "s2000966",
//     password: "VXEZu3SR",
//     database: "s2000966_3"
// });

// async function runQuery(sql, params) {
//     return new Promise((resolve, reject) => {
//         db.query(sql, params, (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }
