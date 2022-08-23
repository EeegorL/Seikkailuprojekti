"use strict";

class Hahmo {
    constructor({ koord, kiihtyvyys, vari,vari2,elossa,hp,id}) {
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
        this.id=id;
    }

    dmgIndicator(kohde){//vahingon tunnistaminen
        let ogVarit=["blue","cyan"];

        if(kohde.elossa==true){
            kohde.hp-=10;
            kohde.vari="red";
            kohde.vari2="red";

            setTimeout(()=>{
                kohde.vari=ogVarit[0];
                kohde.vari2=ogVarit[1];

            },350);
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
        k.font = "Bold 40px Brush Script MT";
        k.strokeText(this.hp, this.koord.x+3.5,this.koord.y);
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

    }
     tarkistaTormaaminen(seinat){
        //huoneiden seinät
            if(this.menosuunta=="oikea"){
                if(this.koord.x+this.leveys>=seinat[2].koord.x){
                    this.koord.x = seinat[2].koord.x-this.leveys;        
                }
            }
            if(this.menosuunta=="vasen"){
                if(this.koord.x-10<=seinat[3].koord.x){
                    this.koord.x = seinat[3].koord.x+this.leveys-35; 
                }
            }
            if(this.menosuunta=="alas"){
                if(this.koord.y+this.korkeus>=seinat[0].koord.y){
                    this.koord.y = seinat[0].koord.y-this.korkeus;        }
            }
            if(this.menosuunta=="ylos"){
                if(this.koord.y-this.korkeus+70<=seinat[1].koord.y){
                    this.koord.y = seinat[1].koord.y+this.korkeus-65;        }
            }
    }
}
