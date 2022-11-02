"use strict";


class Vihollinen extends Hahmo {
    constructor(id,koord, hp,vari1, vari2, tajuissaan, nimi, dmg, nopeus, kuvasrc) {
        super(koord, vari1, vari2, tajuissaan, hp, id, nimi);//ottaa käyttöön parent-classin
        this.dmg=dmg;
        this.nopeus = nopeus;
        this.kuva = new Image();
        this.kuva.src = "../kuvat/hahmot/"+kuvasrc ;
        this.menosuunta;
        this.kiihtyvyys={x:0,y:0};
        this.vari1=vari1;
        this.vari2=vari2;
        this.alkPerVarit=[vari1,vari2];
    }


    async paivitaVihollinen() {
        super.paivita();
    }


    liikehdinta() { //liikkuminen ja sitä vastaava piirtäminen
        this.tarkistaTormaaminen();
        k.beginPath();
        k.fillStyle = "khaki";
        k.drawImage(this.kuva, this.koord.x, this.koord.y,50,70);
        k.closePath();
        this.kiihtyvyys.y = 0;
        this.kiihtyvyys.x = 0;
        if (this.hp <= 0) {
            this.tajuissaan = false;

            setTimeout(() => {//respawn koska miks ei
                this.tajuissaan = true;
                this.hp = 100;
                this.koord = { x: 500, y: 500 }
            }, 1500);
        }

        //vaihtoehto 1: vihollinen seuraa pelaajaa
        //Math.abs:illa voi myös halutessaan asettaa vihollisille etäisyyden, jonka jälkeen ne alkaa seuraa, eli voisi tehdä näkökenttämekaniikan
        //oletusnopeus
        /*
        katsoo vihollisen sijainnin suhteessa pelaajaan, ja sen liikkuu sen perusteella
        Math.round pyöristää pelaajan koordinaatit, jottei vihollisen tarvitsisi tavoitella täydellistä osumaa
        Math.abs luo viholliselle etäisyyden, jonka ulkopuolella tämän tulee seurata pelaajaa, esim.
        halietäisyydellä vihollinen lopettaa seuraamisen
        */
        if (Math.round(pelaaja.koord.x) > Math.round(this.koord.x) && Math.abs(Math.round(pelaaja.koord.x) - Math.round(this.koord.x)) > 5) {
            this.koord.x += this.nopeus;
            this.menosuunta = "oikea";
        }
        else if (Math.round(pelaaja.koord.x) < Math.round(this.koord.x) && Math.abs(Math.round(pelaaja.koord.x) - Math.round(this.koord.x)) > 5) {
            this.koord.x -= this.nopeus;
            this.menosuunta = "vasen";
        }
        if (Math.round(pelaaja.koord.y) >= Math.round(this.koord.y) && Math.abs(Math.round(pelaaja.koord.y) - Math.round(this.koord.y)) > 5) {
            this.koord.y += this.nopeus;
            this.menosuunta = "alas";
        }
        else if (Math.round(pelaaja.koord.y) <= Math.round(this.koord.y) && Math.abs(Math.round(pelaaja.koord.y) - Math.round(this.koord.y)) > 5) {
            this.koord.y -= this.nopeus;
            this.menosuunta = "ylos";
        }
        if (Math.abs(Math.round(pelaaja.koord.x) - Math.round(this.koord.x)) < 52 &&
            Math.abs(Math.round(pelaaja.koord.y) - Math.round(this.koord.y)) < 90) {
            pelaaja.hp -= (this.dmg - pelaaja.dmgRed);
        }
    }
    async tarkistaTormaaminen(seinat, huonekalut) { //nimensä mukaan tarkistaa seinät sekä huonekalut ja estää niiden läpi kulkemisen
        //huoneiden seinät
        if (seinat) {
            if (this.menosuunta == "oikea") {
                if (this.koord.x + this.leveys >= seinat[2].koord.x) {
                    this.koord.x = seinat[2].koord.x - this.leveys;
                }
            }
            if (this.menosuunta == "vasen") {
                if (this.koord.x - 10 <= seinat[3].koord.x) {
                    this.koord.x = seinat[3].koord.x + this.leveys - 35;
                }
            }
            if (this.menosuunta == "alas") {
                if (this.koord.y + this.korkeus >= seinat[0].koord.y) {
                    this.koord.y = seinat[0].koord.y - this.korkeus;
                }
            }
            if (this.menosuunta == "ylos") {
                if (this.koord.y - this.korkeus + 70 <= seinat[1].koord.y) {
                    this.koord.y = seinat[1].koord.y + this.korkeus - 65;
                }
            }
        }
        // huoneiden huonekalut
        if (huonekalut) {
            for (let huonekalu of huonekalut) {
                if (!huonekalu.koriste) {

                    if (this.koord.x + this.leveys > huonekalu.koord.x+10 &&
                        this.koord.x < huonekalu.koord.x + huonekalu.koko.leveys-10 &&
                        this.koord.y + this.korkeus > huonekalu.koord.y &&
                        this.koord.y < huonekalu.koord.y + huonekalu.koko.korkeus) {
                        switch (this.menosuunta) {
                            case "ylos":
                                this.koord.y += 1;
                                break;
                            case "alas":
                                this.koord.y -= 1;
                                break;
                            case "oikea":
                                this.koord.x -= 1;
                                break;
                            case "vasen":
                                this.koord.x += 1;
                                break;
                        }

                    }
                }
            }
        }

    }

};

