"use strict";


class Vihollinen extends Hahmo{
    constructor(koord, kiihtyvyys, vari1,vari2,tajuissaan,hp,id,dmg,nimi,nopeus){
        super(koord, kiihtyvyys, vari1,vari2,tajuissaan,hp,id,nimi,nopeus);//ottaa käyttöön parent-classin
        this.dmg=dmg;
    }
    
    
    async paivitaVihollinen() {
        super.paivita();
        //tähän tulee varmaankin muutoksia ja eroavaisuuksia super-classin paivityksesta, joten siksi on oma funktio
        }


        liikehdinta() { //liikkuminen ja sitä vastaava piirtäminen
            this.tarkistaTormaaminen();
            k.beginPath();
            k.fillStyle = this.vari1;
            k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
            this.kiihtyvyys.y=0;
            this.kiihtyvyys.x=0; 
            if(this.hp<=0){
                this.tajuissaan=false;
                setTimeout(()=>{//respawn koska miks ei
                    this.tajuissaan=true;
                    this.hp=100;
                    this.koord={x:500,y:500}
                },1500);
            }

            //vaihtoehto 1: vihollinen seuraa pelaajaa
            //Math.abs:illa voi myös halutessaan asettaa vihollisille etäisyyden, jonka jälkeen ne alkaa seuraa, eli voisi tehdä näkökenttämekaniikan
            let nopeus=2;
                if(Math.round(pelaaja.koord.x)>Math.round(this.koord.x)&&Math.abs(Math.round(pelaaja.koord.x)-Math.round(this.koord.x))>5){
                    this.koord.x+=nopeus;
                }
                else if(Math.round(pelaaja.koord.x)<Math.round(this.koord.x)&&Math.abs(Math.round(pelaaja.koord.x)-Math.round(this.koord.x))>5){
                    this.koord.x-=nopeus;
                }
                if(Math.round(pelaaja.koord.y)>=Math.round(this.koord.y)&&Math.abs(Math.round(pelaaja.koord.y)-Math.round(this.koord.y))>5){
                    this.koord.y+=nopeus;
                }
                else if(Math.round(pelaaja.koord.y)<=Math.round(this.koord.y)&&Math.abs(Math.round(pelaaja.koord.y)-Math.round(this.koord.y))>5){
                    this.koord.y-=nopeus;
                }
                if(Math.abs(Math.round(pelaaja.koord.x)-Math.round(this.koord.x))<52 &&
                   Math.abs(Math.round(pelaaja.koord.y)-Math.round(this.koord.y))<90){
                    pelaaja.hp-=(0.5-pelaaja.dmgRed);
                }
                //tärinäefekti jos vihollisella on vieroitusoireita?
                // this.kiihtyvyys.x=Math.round(Math.random())==0?1:-1;
                // this.kiihtyvyys.y=Math.round(Math.random())==0?1:-1;

                //vaihtoehto 2: vihollinen liikkuu satunnaisiin suuntiin (to do)
                //tähän toimiva timeout niin periaatteessa toimisi; ilman, ei
                // this.kiihtyvyys.x=Math.round(Math.random())==0?1:-1;
                // this.kiihtyvyys.y=Math.round(Math.random())==0?1:-1;


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