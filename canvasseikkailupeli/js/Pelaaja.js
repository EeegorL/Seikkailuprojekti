"use strict";


class Pelaaja extends Hahmo{
    
    constructor(koord, kiihtyvyys, vari,vari2,elossa,hp){
        super(koord, kiihtyvyys, vari,vari2,elossa,hp);//ottaa käyttöön parent-classin
        this.a = new Image(this.leveys,this.korkeus);
        this.a.src="../kuvat/sprite.jpg";
        this.huonenro;
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
                         this.koord.x=kanvaasi.width/2-15;
                         this.koord.y=10;
                     }
            }

            break;
            
            case "ylos":
                if(p){
                    if(this.koord.x<=p.koord.x+p.leveys &&
                        this.koord.x+this.leveys>=p.koord.x &&
                        this.koord.y<=10){
                            this.koord.x=kanvaasi.width/2-15;
                            this.koord.y=kanvaasi.height-85;
                         }
                }

                break;
        
            case "vasen":
                if(l){
                    if(this.koord.x<=l.koord.x+30 &&
                        this.koord.y>=l.koord.y-10 &&
                        this.koord.y<=l.koord.y+l.korkeus
                    ){
                             this.koord.x=kanvaasi.width-(kanvaasi.width*0.05);
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
    
    liikehdinta() { //liikkuminen

    k.drawImage(this.a,this.koord.x,this.koord.y);

        k.fillStyle = this.vari2;
        pelaaja.kiihtyvyys.x = 0;//asettaa liikehdinnän nollaan ennen jokaista liikettä

        //tarkistaa viimeisimpänä painetun napin ja toimii sen mukaan
        if (liikenappaimet.a.pohjassa && pelaaja.viimeisin === "a") {
            pelaaja.kiihtyvyys.x = -5;
            pelaaja.menosuunta="vasen";
        }else if (liikenappaimet.d.pohjassa && pelaaja.viimeisin === "d") {
            pelaaja.kiihtyvyys.x = 5;
            pelaaja.menosuunta="oikea";
        }else if (liikenappaimet.w.pohjassa && pelaaja.viimeisin === "w") {
            pelaaja.kiihtyvyys.y = -5;
            pelaaja.menosuunta="ylos";
        }else if (liikenappaimet.s.pohjassa && pelaaja.viimeisin === "s") {
            pelaaja.kiihtyvyys.y = 5;
            pelaaja.menosuunta="alas";
        }       
        //aseen osoitussuunta riippuen liikesuunnasta
        if(this.menosuunta=="vasen"){
            k.fillRect(this.ase.position.x-100, this.ase.position.y+30, this.ase.width=150, this.ase.height=10);
        }
        else if(this.menosuunta=="oikea"){
            k.fillRect(this.ase.position.x, this.ase.position.y+30, this.ase.width=150, this.ase.height=10);
        }
        else if(this.menosuunta=="ylos"){
            k.fillRect(this.ase.position.x+20, this.ase.position.y-75, this.ase.width=10, this.ase.height=150);
        }
        else if(this.menosuunta=="alas"){
            k.fillRect(this.ase.position.x+20, this.ase.position.y, this.ase.width=10, this.ase.height=150);
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