"use strict";

class Huonekalu{
    constructor(tyyppi,koord,koko,vari,koriste){
        this.tyyppi=tyyppi;
        this.koord=koord;
        this.vari=vari;
        this.koko=koko;
        this.koriste=koriste;
    }
    piirra(){
        k.save();
        k.fillStyle = this.vari;
        if(this.koriste){
        }
        switch(this.tyyppi){

            case "poyta":
                k.beginPath();
                k.arc(this.koord.x, this.koord.y, 50, 0, 2 * Math.PI);
                k.stroke();
            break;
        
            case "kaappi":
                
                    k.fillRect(this.koord.x, this.koord.y, this.koko.leveys, this.koko.korkeus);
            break;
        }


    }
}

