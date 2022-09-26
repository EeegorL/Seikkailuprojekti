"use strict";

class Hahmo { //pohjaluokka kaikille spriteille
    constructor({ koord, kiihtyvyys, vari,vari2,tajuissaan,hp,id,nimi}) {
        this.koord = koord;
        this.kiihtyvyys = kiihtyvyys;
        this.korkeus = 75;
        this.leveys = 50;
        this.viimeisin;
        this.vari1 = vari;
        this.vari2 = vari2;
        this.ase = {
            position: this.koord,
            width: 150,
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
        k.strokeStyle=this.vari2;
        k.strokeText(Math.round(this.hp), this.koord.x+3.5,this.koord.y);
        k.font = "20px Monospace";
        k.strokeStyle=this.vari2;
        k.strokeText(this.nimi||"", this.koord.x-this.nimi?.length*3,this.koord.y-33);
        this.koord.y += this.kiihtyvyys.y;
        this.koord.x += this.kiihtyvyys.x;
        this.kiihtyvyys.y=0;
    }
    
    
}
