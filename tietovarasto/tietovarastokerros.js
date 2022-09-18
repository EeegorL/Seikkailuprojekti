'use strict';


const Tietokanta = require('./tietokanta');
const sql = require("./sqllauseet.json");
const optiot =require('./yhteysoptiot.json');

module.exports = class Tietovarasto{
    constructor(){
        this.db = new Tietokanta(optiot);
    }
//hakee vihollisen tiedot
    vihollisenTiedot(id){
        return new Promise(async(resolve,reject)=>{
            try{
                let tulos=this.db.suoritaKysely(sql.vihollinen,[id]);
                resolve(tulos);
            }
            catch(err){
                reject(err);
            }
        })
    }
    huoneenViholliset(huoneId){
        return new Promise(async(resolve,reject)=>{
            try{
                let tulos=this.db.suoritaKysely(sql.huoneenViholliset,[huoneId]);
                resolve(tulos);
            }
            catch(err){
                reject(err);
            }
        })
    }

    

} //luokan loppu