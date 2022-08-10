'use strict';


const Tietokanta = require('./tietokanta');

const optiot =require('./yhteysoptiot.json');

module.exports = class Tietovarasto{
    constructor(){
        this.db = new Tietokanta(optiot);
    }

    testi(){
        console.log("testi");
    }

    

} //luokan loppu