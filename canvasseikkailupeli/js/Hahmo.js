"use strict";

class Hahmo {
    constructor({ koord, kiihtyvyys, vari,vari2,elossa,hp}) {
        this.koord = koord;
        this.kiihtyvyys = kiihtyvyys;
        this.korkeus = 75;
        this.leveys = 50;
        this.viimeisin;
        this.vari = vari;
        this.vari2 = vari2;
        this.ase = {
            position: this.koord,
            width: 150,
            height: 10
        }
        this.hyokkaamassa;
        this.elossa=elossa;
        this.menosuunta;
        this.hp=hp;
    }

    dmgIndicator(kohde){//testaamista varten & vahingon tunnistaminen
        let indicator=document.getElementById("dmgIndicator");
        let ogVarit=["red","cyan"];

        if(kohde.elossa==true){
            kohde.hp-=10;
            document.getElementById("vihHp").innerHTML=kohde.hp;
            indicator.style.color="red";
            kohde.vari="red";
            kohde.vari2="red";

            setTimeout(()=>{
                indicator.style.color="black",700
                kohde.vari=ogVarit[0];
                kohde.vari2=ogVarit[1];

            },350);
            console.log(kohde.hp);
        }
        if(kohde.hp<=0){
            kohde.elossa=false;
            setTimeout(()=>{//respawn koska miks ei
                kohde.elossa=true;
                kohde.hp=100;
            },1500);
        }

    }
    liikehdinta() { //liikkuminen
        k.fillStyle = this.vari;
        k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
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
    paivita() { //paivittaa jokaisen framen
        this.liikehdinta(); //liikuttaa hahmoa ja hoitaa piirtämisen
        this.koord.y += this.kiihtyvyys.y;
        this.koord.x += this.kiihtyvyys.x;
        this.kiihtyvyys.y=0;
    }
    hyokkaa(kohde) {
        this.hyokkaamassa = true;

        if (this.menosuunta=="oikea" &&
        this.ase.position.x + this.ase.width >= kohde.koord.x &&
        this.ase.position.x <= kohde.koord.x + kohde.leveys &&
        this.ase.position.y+this.korkeus*0.4+ this.ase.height >= kohde.koord.y &&
        this.ase.position.y+this.korkeus*0.4 <= kohde.koord.y + kohde.korkeus &&
        this.hyokkaamassa
    ) {
        this.dmgIndicator(kohde);
        this.hyokkaamassa = false;
    }
    else if(this.menosuunta=="vasen"&&
        this.ase.position.x - this.ase.width <= kohde.koord.x &&
        this.ase.position.x >= kohde.koord.x - kohde.leveys &&
        this.ase.position.y+this.korkeus*0.4 + this.ase.height >= kohde.koord.y &&
        this.ase.position.y+this.korkeus*0.4 <= kohde.koord.y + kohde.korkeus &&
        this.hyokkaamassa
    ) {
        this.dmgIndicator(kohde);
        this.hyokkaamassa = false;
    }
    else if(this.menosuunta=="ylos"&&
    this.ase.position.x+this.leveys*0.667 + this.ase.width >= kohde.koord.x &&
    this.ase.position.x+this.leveys*0.667 <= kohde.koord.x + kohde.leveys &&
    this.ase.position.y-this.korkeus+this.ase.height >= kohde.koord.y &&
    this.ase.position.y-this.korkeus<= kohde.koord.y + kohde.korkeus &&
    this.hyokkaamassa
    ) {
       this.dmgIndicator(kohde);
       this.hyokkaamassa = false;
    }
    else if(this.menosuunta=="alas"&&
    this.ase.position.x+this.leveys*0.3 + this.ase.width >= kohde.koord.x &&
    this.ase.position.x+this.leveys*0.5 <= kohde.koord.x + kohde.leveys &&
    this.ase.position.y+this.ase.height >= kohde.koord.y &&
    this.ase.position.y<= kohde.koord.y + kohde.korkeus &&
    this.hyokkaamassa
    ) {
       this.dmgIndicator(kohde);
       this.hyokkaamassa = false;
    }
        setTimeout(() => {
            this.hyokkaamassa = false;
        }, 100
        )
    }
}

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