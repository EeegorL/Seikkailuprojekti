"use strict";

const Tietokanta = require("./database.js");

const optiot = require("./connectionConfig.json");

const argon2 = require("argon2");

const sql = require("./sqlQuerys.json");

module.exports = class Tietovarasto {
    constructor() {
        this.db = new Tietokanta(optiot);
    }

    haeKaikki() {
        return new Promise(async (resolve, reject) => {
            try {
                const tulos1 = await this.db.runQuery(sql.haeKaikki, []);
                // console.log(await this.db.runQuery("select * from sisaltokuvat", []));

                if (tulos1) {
                    resolve(tulos1);
                } else {
                    reject("Ei löytyny");
                }
            } catch (virhe) {
                console.log(virhe);
                reject(virhe);
            }
        });
    }
    kaikkiSivut(){
        return new Promise(async (resolve, reject) => {
            try {
                const tulos = await this.db.runQuery(sql.kaikkiSivut, []);
                // let tulos2= await this.db.runQuery("select * from sisaltokuvat", []);
                    // await this.db.runQuery("insert into sivutekstit values ('Testisivu', 'Sivun teksti')", []);
                if (tulos) {
                    resolve(tulos);
                } else {
                    reject("Ei sivuja");
                }
            } catch (virhe) {
                console.log(virhe);
                reject(virhe);
            }
        })}
        testisivut(){
            return new Promise(async (resolve, reject) => {
                try {
                    const lisaaTeksti = await this.db.runQuery("INSERT INTO sivutekstit VALUES ('Testisivu','Testitekstitestitekstitestiteksti')", []);
                    const lisaaAlaotsikko = await this.db.runQuery("INSERT INTO alaotsikot VALUES ('Testisivu','Testialaotsikko')", []);
                    const lisaaKuvat = await this.db.runQuery("INSERT INTO sisaltokuvat VALUES ('Testisivu','binaryyesyesyesosigpwjeiogujweogju')", []);


                        // await this.db.runQuery("insert into sivutekstit values ('Testisivu', 'Sivun teksti')", []);
                    if (tulos) {
                        resolve(tulos);
                    } else {
                        reject("Ei sivuja");
                    }
                } catch (virhe) {
                    console.log(virhe);
                    reject(virhe);
                }
            })}
        haeSivu(url){
            return new Promise(async (resolve, reject) => {
                try {
                    const tulos = await this.db.runQuery(sql.haeSivu, [url]);
                    if (tulos) {
                        resolve(tulos);
                    } else {
                        reject("Ei sivuja");
                    }
                } catch (virhe) {
                    console.log(virhe);
                    reject(virhe);
                }
            })}

        haeKaikkiSivunTiedot(nimi,url){
            return new Promise(async (resolve, reject) => {
                try {
                    const tulokset = [];
                    const tulos1 = await this.db.runQuery(sql.haeSivunTekstit, [nimi]);
                    const tulos2 = await this.db.runQuery(sql.haeSivunAlaotsikot, [nimi]);
                    const tulos3 = await this.db.runQuery(sql.haeSivunKuvat, [nimi]);
                    const tulos4 = await this.db.runQuery(sql.haeSivu, [url]);
                    tulokset.push(tulos1,tulos2,tulos3,tulos4);

                    if (tulokset) {
                        resolve(tulokset);
                    } else {
                        reject("Ei sivuja");
                    }
                } catch (virhe) {
                    console.log(virhe);
                    reject(virhe);
                }
        })
    }

    haePyynnot() {
        return new Promise(async (resolve, reject) => {
            try {
                const tulos = await this.db.runQuery(sql.haeKaikkiPyynnot, []);
                if (tulos) {
                    resolve(tulos);
                } else {
                    reject("Ei löytyny");
                }
            } catch (virhe) {
                console.log(virhe);
                reject(virhe);
            }
        });
    }
    
    haeTervetulo() {
        return new Promise(async (resolve, reject) => {
            try {
                const tulos = await this.db.runQuery(sql.haeTervetulo, []);
                
                if (tulos.length == 0) {
                    reject({
                        status: "virheellinen",
                        virhe: "Tervetuloviestiä ei ole olemassa",
                    });
                } else {
                    resolve({ status: "oikein", tervetuloviesti: tulos[0].teksti });
                }
            } catch (virhe) {
                console.log(virhe);
                reject(virhe);
            }
        });
    }
    vaihdaTervetulo(uusi){
        return new Promise(async(resolve,reject)=>{
            try{
                const tulos=await this.db.runQuery(sql.vaihdaTervetulo,[uusi]);
                if (tulos.length == 0) {
                    reject("Tervetulotekstiä ei muutettu");
                } else {
                    resolve("Tervetuloteksti muutettiin");
                }
            }
            catch(err){
                console.log(err);
            }
        })
    }

    tarkistaKirjautuminen(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                // Luo argon2 salauksella suojatun salasanan
                const securePassword = await argon2.hash(password);

                if (typeof username === "undefined" || username === "") {
                    // Ei pitäisi ikinä joutua tänne koska frontista ei lähde pyyntö jos tyhjä
                    reject({
                        signedIn: false,
                        message: "Käyttäjänimi puuttuu",
                    });
                } else if (typeof password === "undefined" || password === "") {
                    // Ei pitäisi ikinä joutua tänne koska frontista ei lähde pyyntö jos tyhjä
                    reject({ signedIn: false, message: "Salasana puuttuu" });
                } else {
                    const tulosJoukko = await this.db.runQuery(
                        sql.haeKaikki,
                        []
                    );

                    for (const tulos of tulosJoukko) {
                        if (tulos.kayttajanimi == username) {
                            if (await argon2.verify(tulos.salasana, password)) {
                                resolve({
                                    signedIn: true,
                                    message: "Kirjautuminen onnistui",
                                    user: tulos,
                                });
                            } else {
                                reject({
                                    signedIn: false,
                                    message: "Väärä salasana",
                                });
                            }
                            reject({
                                signedIn: false,
                                message: "Käyttäjänimeä ei ole olemassa",
                            });
                        }
                    }

                    reject({
                        signedIn: false,
                        message: "Kirjautuminen epäonnistui",
                    });
                }
            } catch (virhe) {
                console.log(virhe);
                reject(virhe);
            }
        });
    }

    lisaaKayttaja(kayttajanimi, salasana, role) {
        return new Promise(async (resolve, reject) => {
            try {
                // Luo argon2 salauksella suojatun salasanan
                const securePassword = await argon2.hash(salasana);

                if (
                    typeof kayttajanimi === "undefined" ||
                    kayttajanimi === ""
                ) {
                    // Ei pitäisi ikinä joutua tänne koska frontista ei lähde pyyntö jos tyhjä
                    reject({ message: "Käyttäjänimi puuttuu" });
                } else if (typeof salasana === "undefined" || salasana === "") {
                    // Ei pitäisi ikinä joutua tänne koska frontista ei lähde pyyntö jos tyhjä
                    reject({ message: "Salasana puuttuu" });
                } else {
                    // Hakee tietokannasta käyttjiä annetulla nimellä
                    let onkoJo = await this.db.runQuery(sql.haeKayttaja, [
                        kayttajanimi,
                    ]);
                    // tarkistaa onko käyttäjä jo olemassa
                    if (onkoJo.length !== 0) {
                        // Jos käyttäjä on olemassa palauttaa virheviestin
                        reject({ message: "Käyttäjänimi on jo käytössä" });
                    } else {
                        await this.db.runQuery(sql.lisaaKayttaja, [
                            kayttajanimi,
                            securePassword,
                            role,
                        ]);
                        resolve({ message: "Käyttäjä lisätty" });
                    }
                }
            } catch (virhe) {
                console.log(virhe);
                reject(virhe);
            }
        });
    }

    lisaaYhteydenottopyynto(nimi, puhnro, sposti, viesti) {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof sposti === "undefined" || sposti === "") {
                    reject({ message: "Sähköposti puuttuu" });
                } else if (typeof viesti === "undefined" || viesti === "") {
                    reject({ message: "Viesti puuttuu" });
                } else {
                    await this.db.runQuery(sql.lisaaYhteydenottopyynto, [
                        nimi,
                        puhnro,
                        sposti,
                        viesti,
                    ]);
                    resolve({
                        message: "Yhteydenottopyyntö jätetty onnistuneesti",
                    });
                }
            } catch (virhe) {
                console.log(virhe);
                reject(virhe);
            }
        });
    }
    kuvaaTaulukot() {
        return new Promise(async (resolve, reject) => {
            try {
                let b = [];
                b.push(
                    await this.db.runQuery("describe yhteydenottopyynnot", [])
                );
                b.push(await this.db.runQuery("describe kayttajat", []));
                // b.push(await this.db.runQuery("SELECT * FROM information_schema.columns WHERE table_schema = 's2000966_3';", []));

                resolve(b);
            } catch (virhe) {
                console.log(virhe);
                reject(virhe);
            }
        });
    }


    lisaaSivu(nimi, otsikko, teemakuva, url) {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof nimi === "undefined" || nimi === "") {
                    reject("Nimi puuttuu" );
                } else if (typeof otsikko === "undefined" || otsikko === "") {
                    reject("Otsikko puuttuu");
                }
                else if (typeof teemakuva === "undefined" || teemakuva === "") {
                    reject("Teemakuva puuttuu");
                }
                else if (typeof url === "undefined" || url === "") {
                    reject("url puuttuu");
                } else {
                    await this.db.runQuery(sql.lisaaSivu, [
                        nimi,url,otsikko,teemakuva
                    ]);
                    resolve({
                        message: "Sivu luotu",
                    });
                }
            } catch (virhe) {
                console.log(virhe);
                reject(virhe);
            }
        });
    }

    muokkaa(nimi,otsikko,url){
        return new Promise(async(resolve,reject)=>{
            try{
                //näillä toimii
                let a="Egorin sivu hahaaxd";
                let b="Njiauum";
                //mutta tuoduilla parametreilla ei (changedRows: 0) vaikka syöttäisi täysin samat
                //tuotu url toimii!!!! nimi ja otsikko ei
                    console.log(nimi,otsikko,url)



                const tulos=await this.db.runQuery(sql.muokkaa,[nimi,otsikko,url]);
                console.log(tulos);
                if (tulos.length == 0) {
                    reject("Sivun tietoja ei muutettu");
                } else {
                    resolve("Sivun tiedot muutettiin");

                }
            }
            catch(err){
                console.log(err);
            }
        })
    }
    lisaaContenttia(c,cType,sivu){
        return new Promise(async(resolve,reject)=>{
            try{
                if(c==="" || c==="undefined"){
                    reject("Contentti on tyhjä");
                }
                else if(cType==="" || cType==="undefined"){
                    reject("Contentin tyyppi ei ole määrittety");
                }
                else if(sivu==="" || sivu==="undefined"){
                    reject("Sivua jolle lisätään ei ole määrittety");
                }
                else{
                    let qry="";
                    switch(cType){
                        case "alaotsikko":
                            qry=sql.lisaaSivulleAlaotsikko;
                        break;
                        case "teksti":
                            qry=sql.lisaaSivulleTekstiä;
                        break;
                        case "kuva":
                            qry=sql.lisaaSivulleKuva;
                        break;
                    }
                    console.log(`${qry}\n${sivu}\n${c.length}`);
                    const tulos=await this.db.runQuery(qry,[sivu,c]);

                    console.log("tulos1")
                    if (tulos.length == 0) {
                        reject("Sivun tietoja ei muutettu");
                    } else {
                        resolve("Sivun tiedot muutettiin");
    
                    }

                }
            }
            catch(err){
                
            }
        })
    }
};

