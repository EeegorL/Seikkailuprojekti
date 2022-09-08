"use strict";


class Vihollinen extends Hahmo{
    constructor(koord, kiihtyvyys, vari,vari2,elossa,hp,id,dmg,nimi){
        super(koord, kiihtyvyys, vari,vari2,elossa,hp,id,nimi);//ottaa käyttöön parent-classin
    }
    
    
    async paivitaVihollinen(id) {
        super.paivita();

        
        //tähän tulee varmaankin muutoksia ja eroavaisuuksia super-classin paivityksesta, joten siksi on oma funktio
        }


        liikehdinta() { //liikkuminen ja sitä vastaava piirtäminen
            this.tarkistaTormaaminen();
            k.beginPath();
            k.fillStyle = this.vari;
            k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
            this.kiihtyvyys.y=0;
            this.kiihtyvyys.x=0; 
                //tähän jonkinlainen timeout, jotta vihollinen ehtii kävellä enemmän kuin 0,5mm ennen kuin rng-arvo muuttuu

                // this.kiihtyvyys.x=Math.round(Math.random())==0?1:-1;
                // this.kiihtyvyys.y=Math.round(Math.random())==0?1:-1;
            //tähän funktio, joka pistää vihollisen liikkumaan
            //joko seuraamaan pelaajaa tai liikkumaan satunnaisesti kuten monessa dungeon crawlerissa

        }
        tarkistaTormaaminen(){ //tarkistaa vihollis-spriten törmäämisen ja estää seinien läpi menemisen
            if(this.koord.y>=seinat[0]?.koord.y-75){//lattia
                this.koord.y=kanvaasi.height-90;
            }
            if(this.koord.y<=seinat[1]?.koord.y+35){//katto
                this.koord.y=20;
            }
            if(this.koord.x>=seinat[2]?.koord.x-60){//oikea seinä
                this.koord.x=kanvaasi.width-68;
            }
            if(this.koord.x<=seinat[3]?.koord.x+15){//vasen seinä
                this.koord.x=15;
            }
        }
    
};