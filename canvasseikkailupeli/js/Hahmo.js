"use strict";

class Hahmo { //pohjaluokka kaikille spriteille
    constructor( koord, vari1,vari2, tajuissaan, hp,id,nimi) {
        this.koord = koord;
        this.kiihtyvyys = {x:0,y:0};
        this.korkeus = 75;
        this.leveys = 50;
        this.viimeisin;
        this.vari1 = vari1;
        this.vari2 = vari2;
        this.ase = {
            position: this.koord,
            width: 70,
            height: 10
        }
        this.hyokkaamassa;
        this.tajuissaan=tajuissaan;
        this.menosuunta;
        this.hp=hp;
        this.id=id;
        this.nimi=nimi;
    }


    
    paivita() { //paivittaa jokaisen framen
        k.beginPath();
        
        this.liikehdinta(10); //liikuttaa hahmoa ja hoitaa piirtämisen

        k.font = "Bold 40px Brush Script MT";
        k.fillStyle=this.vari1;
        k.fillText(Math.round(this.hp) || "", this.koord.x+3.5,this.koord.y);
        k.font = "20px Monospace";
        k.fillStyle=this.vari2;
        k.fillText(this.nimi||"", this.koord.x-this.nimi?.length*3,this.koord.y-33);
        this.koord.y += this.kiihtyvyys.y;
        this.koord.x += this.kiihtyvyys.x;
        this.kiihtyvyys.y=0;
        this.kiihtyvyys.x=0;
    }
    
    
}
