"use strict";


class Pelaaja extends Hahmo{
    constructor(koord, kiihtyvyys, vari,vari2,elossa,hp){
        super(koord, kiihtyvyys, vari,vari2,elossa,hp);//ottaa käyttöön parent-classin
    }
    siirry(ovet){
        let e=null;
        let p=null;
        let i=null;
        let l=null;
        for(let ovi of ovet){
            if(ovi.ilmansuunta=="etela"){
                e=ovi;
            }
            else if(ovi.ilmansuunta=="pohjoinen"){
                p=ovi;
            }
            else if(ovi.ilmansuunta=="lansi"){
                l=ovi;
            }
            else if(ovi.ilmansuunta=="ita"){
                i=ovi;
            }

        }
        switch(this.menosuunta){
            case "alas":
            if(e){
                if(this.koord.x<=e.koord.x+e.leveys &&
                    this.koord.x+this.leveys>=e.koord.x &&
                    this.koord.y>=e.koord.y-e.korkeus+5){
                         this.koord.x=490;
                         this.koord.y=0;
                     }
            }

            break;
            
            case "ylos":
                if(p){
                    if(this.koord.x<=p.koord.x+p.leveys &&
                        this.koord.x+this.leveys>=p.koord.x &&
                        this.koord.y<=10){
                             this.koord.x=490;
                             this.koord.y=kanvaasi.height-20;
                         }
                }

                break;
        
            case "vasen":
                if(l){
                    if(this.koord.x<=l.koord.x+30 &&
                        this.koord.y>=l.koord.y-10 &&
                        this.koord.y<=l.koord.y+l.korkeus
                    ){
                             this.koord.x=1000;
                             this.koord.y=kanvaasi.height/2-18;
                         }
                }

            break;
            
            case "oikea":
                if(i){
                    if(this.koord.x>=i.koord.x-30 &&
                        this.koord.y>=i.koord.y-10 &&
                        this.koord.y<=i.koord.y+i.korkeus
                    ){
                             this.koord.x=0;
                             this.koord.y=kanvaasi.height/2-18;
                         }
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
    switch (event.key.toLowerCase()) {
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
        case "enter":
            pelaaja.hyokkaa(vihollinen);
            break;
    }
});
window.addEventListener("keyup", (event) => {
    switch (event.key.toLowerCase()) {
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