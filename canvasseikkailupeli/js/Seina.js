"use strict";

class Seina{
    constructor({koord,leveys,korkeus,kanvaasi,vari}){
        this.koord=koord;
        this.leveys=leveys;
        this.korkeus=korkeus;
        this.kanvaasi=kanvaasi;
        this.vari=vari;
    }

    piirra(){
        this.kanvaasi.save();
        this.kanvaasi.fillStyle = this.vari;
        this.kanvaasi.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
    }


};