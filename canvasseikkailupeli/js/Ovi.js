"use strict";

class Ovi {
    constructor(ilmansuunta,huoneid) {
        this.ilmansuunta = ilmansuunta;
        this.koord;
        this.leveys = 0;
        this.huoneid=huoneid;
        this.korkeus;
    }
    piirra() {
        k.save();
        k.fillStyle = "black";
        k.beginPath();
        //piirtää oven yhteen neljästä kohdasta riippuen ilmansuunta-parametrista
        switch (this.ilmansuunta) {
            case "etela":
                this.koord = { x: kanvaasi.width / 2 - 57, y: kanvaasi.height - 50 };
                this.leveys = 125;
                this.korkeus = 50;
                k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
                break;

            case "pohjoinen":
                this.koord = { x: kanvaasi.width / 2 - 57, y: 0 };
                this.leveys = 125;
                this.korkeus = 50;
                k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
                break;

            case "ita":
                this.koord = { x: kanvaasi.width - 50, y: kanvaasi.height / 2 - 55, };
                this.leveys = 50;
                this.korkeus = 125;
                k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
                break;

            case "lansi":
                this.koord = { x: 0, y: kanvaasi.height / 2 - 55, };
                this.leveys = 50;
                this.korkeus = 125;
                k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
                break;
        }
    }
    siirra(ilmansuunta) { //pelaajan teleporttaaminen
        //siirtää pelaajan yhteen neljästä kohdasta riippuen vastaavasta ilmansuunnasta
        switch (ilmansuunta) {
            case "etela":
                pelaaja.koord.x = kanvaasi.width / 2 - 15;
                pelaaja.koord.y = 10;
                break;

            case "pohjoinen":
                pelaaja.koord.x = kanvaasi.width / 2 - 15;
                pelaaja.koord.y = kanvaasi.height - 85;
                break;

            case "lansi":
                pelaaja.koord.x = kanvaasi.width - (kanvaasi.width * 0.05);
                pelaaja.koord.y = kanvaasi.height / 2 - 18;
                break;

            case "ita":
                pelaaja.koord.x = 0;
                pelaaja.koord.y = kanvaasi.height / 2 - 18;
                break;
        }
        alusta(this.huoneid);

    }

}