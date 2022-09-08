"use strict";

class Hahmo { //pohjaluokka kaikille spriteille
    constructor({ koord, kiihtyvyys, vari,vari2,elossa,hp,id,nimi}) {
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
        this.nimi=nimi;
    }

    dmgIndicator(kohde){//vahingon tunnistaminen
        let ogVarit=["blue","cyan"];

        if(kohde.elossa==true){ //värin muuttaminen vahingon merkitsemiseksi
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
    
    paivita() { //paivittaa jokaisen framen
        k.beginPath();
        this.liikehdinta(); //liikuttaa hahmoa ja hoitaa piirtämisen
        k.font = "Bold 40px Brush Script MT";
        k.strokeStyle=this.vari2;
        k.strokeText(Math.round(this.hp), this.koord.x+3.5,this.koord.y);
        k.font = "20px Monospace";
        k.strokeStyle=this.vari2;
        k.strokeText(this.nimi||"", this.koord.x-this.nimi?.length*3,this.koord.y-33);
        this.koord.y += this.kiihtyvyys.y;
        this.koord.x += this.kiihtyvyys.x;
        this.kiihtyvyys.y=0;
    }
    hyokkaa(kohde) { //hyokkaa viholliseen. toimii nyt vasta yhdellä vihollisella
        this.hyokkaamassa = true;
        //tarkistaa, osuuko pelaajan ase viholliseen, ja näin ollen kutsuu dmgIndicatoria, joka tekee vahinkoa
        //tähän esim for loop, tyyliin for(kohde in kohteet){...
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
    
}
