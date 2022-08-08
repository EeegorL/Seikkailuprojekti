'use strict';

const {STATUSKOODIT, STATUSVIESTIT} = require('./statuskoodit');

const Tietokanta = require('./tietokanta');

const optiot =require('./sqlvarasto/yhteysoptiot.json');

const sql=require('./sqllauseet.json');
const haeKaikkiSql = sql.haeKaikki.join(' ');
const haeSql = sql.hae.join(' ');
const lisaaSql = sql.lisaa.join(' ');
const paivitaSql = sql.paivita.join(' ');
const poistaSql = sql.poista.join(' ');


const PERUSAVAIN=sql.perusavain;

//Tietovarastoluokka

module.exports = class Tietovarasto{
    constructor(){
        this.db = new Tietokanta(optiot);
    }

    get STATUSKOODIT(){
        return STATUSKOODIT;
    };

    haeKaikki(){
        return new Promise( async (resolve,reject)=>{
            try{
                const tulos = await this.db.suoritaKysely(haeKaikkiSql);
                resolve(tulos.kyselynTulos);
            }
            catch(virhe){
                reject("reject");
            }
        })
    } //haeKaikki loppu

    hae(id){
        return new Promise(async (resolve,reject)=>{
            if(!id){
                reject("reject");
            }
            else{
                try{
                    const tulos = await this.db.suoritaKysely(haeSql,[id]);
                    if(tulos.kyselynTulos.length>0){
                        resolve(tulos.kyselynTulos[0]);
                    }
                    else {
                        reject("reject")
                    }
                }
                catch(virhe){
                    reject("reject");
                }
            }
        });
    } //hae loppu

    lisaa(uusi){
        return new Promise(async (resolve, reject)=>{
            try{
                if (uusi) {
                    if (!uusi[PERUSAVAIN]) {
                        reject("reject");
                    }
                    else {
                        const hakutulos = 
                            await this.db.suoritaKysely(haeSql,[uusi[PERUSAVAIN]]);
                        if(hakutulos.kyselynTulos.length>0){
                            reject("reject");
                        }
                        else{
                            const status=
                                await this.db.suoritaKysely(lisaaSql,insertParametrit(uusi));
                            resolve("resolve");
                        }
                    }
                }
                else {
                    reject("reject");
                }
            }
            catch(virhe){
                reject("reject");
            }
        });
    }//lisaa loppu

    poista(id){
        return new Promise(async (resolve,reject)=>{
            if (!id) {  //id nolla menee myös tänne
                reject("reject");
            }
            else {
                try{
                    const status = await this.db.suoritaKysely(poistaSql,[id]);
                    if (status.kyselynTulos.muutetutRivitLkm===0){
                        resolve(STATUSVIESTIT.EI_POISTETTU());
                    }
                    else {
                        resolve("reject");
                    }
                }
                catch(virhe){
                    reject("reject");
                }
            }
        });
    }// poista loppu

    paivita(muutettuOlio) {
        return new Promise(async (resolve,reject)=>{
            if(muutettuOlio){
                try{
                    const status= await this.db.suoritaKysely(paivitaSql, updateParametrit(muutettuOlio));

                    if(status.kyselynTulos.muutetutRivitLkm===0){
                        resolve("resolve");
                    }
                    else {
                        resolve("resolve");
                    }
                }
                catch(virhe){
                    reject("reject");

                }
            }
            else {
                reject("reject");

            }
        });
    } //paivitys loppu


} //luokan loppu