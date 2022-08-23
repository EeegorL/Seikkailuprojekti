"use strict";


class Pelaaja extends Hahmo{
    constructor(koord, kiihtyvyys, vari,vari2,elossa,hp){
        super(koord, kiihtyvyys, vari,vari2,elossa,hp);//ottaa käyttöön parent-classin
    }
    siirra(ovi){
        switch(this.menosuunta){
            case "alas":
            if(this.koord.x<=ovi[0].koord.x+ovi[0].leveys &&
               this.koord.x+this.leveys>=ovi[0].koord.x &&
               this.koord.y>=ovi[0].koord.y-ovi[0].korkeus+5){
                    this.koord.x=490;
                    this.koord.y=0;
                }
            break;
            
            case "ylos":
                if(this.koord.x<=ovi[1].koord.x+ovi[1].leveys &&
                    this.koord.x+this.leveys>=ovi[1].koord.x &&
                    this.koord.y<=10){
                         this.koord.x=490;
                         this.koord.y=kanvaasi.height-20;
                     }
                break;
        
            case "vasen":
                if(this.koord.x<=ovi[2].koord.x+30 &&
                    this.koord.y>=ovi[2].koord.y-10 &&
                    this.koord.y<=ovi[2].koord.y+ovi[2].korkeus
                ){
                         this.koord.x=1000;
                         this.koord.y=kanvaasi.height/2-18;
                     }
            break;
            
            case "oikea":
                if(this.koord.x>=ovi[3].koord.x-30 &&
                    this.koord.y>=ovi[3].koord.y-10 &&
                    this.koord.y<=ovi[3].koord.y+ovi[2].korkeus
                ){
                         this.koord.x=0;
                         this.koord.y=kanvaasi.height/2-18;
                     }
            break;
            }
    }
};

const liikenappaimet = {
    a: {
        pohjassa: false,
    },
    d: {
        pohjassa: false
    },
    w: {
        pohjassa: false
    },
    s:{
        pohjassa:false
    }
};

//nappikuuntelijat
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            liikenappaimet.d.pohjassa = true;
            pelaaja.viimeisin = "d";
            break;
        case "a":
            liikenappaimet.a.pohjassa = true;
            pelaaja.viimeisin = "a";
            break;
        case "w":
            liikenappaimet.w.pohjassa = true;
            pelaaja.viimeisin = "w";
            break;
        case "s":
            liikenappaimet.s.pohjassa = true;
            pelaaja.viimeisin = "s";
            break;
        case "Enter":
            pelaaja.hyokkaa(vihollinen);
            break;
    }
});
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            liikenappaimet.d.pohjassa = false;
            break;
        case "a":
            liikenappaimet.a.pohjassa = false;
            break;
        case "w":
            liikenappaimet.w.pohjassa = false;
            break;
        case "s":
            liikenappaimet.s.pohjassa = false;
            break;
    }
});