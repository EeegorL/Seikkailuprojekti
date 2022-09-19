"use strict";

class Huone{
    constructor(id,viholliset,ovet){
        this.id=id;
        this.viholliset=viholliset;
        this.ovet=ovet;
    };

    getId(){
        return this.id;
    };
    getViholliset(){
        return this.viholliset;
    }
    getOvet(){
        return this.ovet;
    }
}
//katsotaan tarviiko koko luokkaa