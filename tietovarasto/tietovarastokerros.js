'use strict';


const Tietokanta = require('./tietokanta');
const sql = require("./sqllauseet.json");
const optiot =require('./yhteysoptiot.json');

module.exports = class Tietovarasto{
    constructor(){
        this.Omakanta = new Tietokanta(optiot);
    }
//hakee vihollisen tiedot
    vihollisenTiedot(id){
        return new Promise(async(resolve,reject)=>{
            try{
                let tulos=this.Omakanta.suoritaKysely(sql.vihollinen,[id]);
                resolve(tulos);
            }
            catch(err){
                reject(err);
            }
        })
    };
    huoneenViholliset(huoneId){
        return new Promise(async(resolve,reject)=>{
            try{
                let tulos=this.Omakanta.suoritaKysely(sql.huoneenViholliset,[huoneId]);
                resolve(tulos);
            }
            catch(err){
                reject(err);
            }
        })
    };
    huoneenOvet(huoneId){
        return new Promise(async(resolve,reject)=>{
            try{
                let tulos=this.Omakanta.suoritaKysely(sql.huoneenOvet,[huoneId]);
                resolve(tulos);
            }catch(err){
                reject(err);
            }
        })
    }

    

} //luokan loppu