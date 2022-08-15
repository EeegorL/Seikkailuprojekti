'use strict';


const Tietokanta = require('./tietokanta');
const sql = require("./sqllauseet.json");
const optiot =require('./yhteysoptiot.json');

module.exports = class Tietovarasto{
    constructor(){
        this.db = new Tietokanta(optiot);
    }

    testi(){
        return new Promise(async(resolve,reject)=>{
            try{
                let tulos=this.db.suoritaKysely(sql.testi,[]);
                resolve(tulos);
            }
            catch(err){
                reject(err);
            }

        })

    }

    

} //luokan loppu