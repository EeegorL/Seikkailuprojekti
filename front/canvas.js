const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 1014;
kanvaasi.height = 576;

k.fillRect(0, 0, k.width, k.height);
let kiihtyvyyskerroin = 0.7;

class Homo_Habilis {
    constructor({ koord, kiihtyvyys, vari,vari2,onAse,onAi}) {
        this.koord = koord;
        this.kiihtyvyys = kiihtyvyys;
        this.korkeus = 150;
        this.leveys = 50;
        this.viimeisin;
        this.vari = vari;
        this.vari2 = vari2;
        this.ase = {
            position: this.koord,
            width: 100,
            height: 50
        }
        this.hyokkaamassa;
        this.onAse=onAse;
        this.onAi=onAi;

    }


    piirra() { //piirtää hahmon
        k.fillStyle = this.vari;
        k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
        k.fillStyle = this.vari2;
        if(this.onAse){
            k.fillRect(this.ase.position.x, this.ase.position.y, this.ase.width, this.ase.height);

        }
    }
    paivita() { //paivittaa jokaisen framen
        this.piirra();
        this.koord.y += this.kiihtyvyys.y;
        this.koord.x += this.kiihtyvyys.x;

        if (this.koord.y + this.kiihtyvyys.y + this.korkeus > kanvaasi.height) { //jos hahmon korkeus (matka esineen alusta (koord) loppuun (korkeus)) 
            //                                                                   +seuraava siirto kiihtyvyys on suurempi kuin kanvaasin korkeus
            this.kiihtyvyys.y = 0;
        }
        else {
            this.kiihtyvyys.y += kiihtyvyyskerroin;

        }
    }
    hyokkaa() {
        this.hyokkaamassa = true;
        setTimeout(() => {
            this.hyokkaamassa = false;
        }, 100
        )
    }
}
const pelaaja = new Homo_Habilis({
    koord: {
        x: 50,
        y: 0
    },
    kiihtyvyys: {
        x: 0,
        y: 10
    },
    vari: "green",vari2:"yellow",
    onAse:true,
    onAi:false

});


const dummy = new Homo_Habilis({
    koord: {
        x: 900,
        y: 100
    },
    kiihtyvyys: {
        x: 0,
        y: 10
    },
    vari: "red",vari2:"cyan",
    onAse:false,
    onAi:true
});


const nappaimet = {
    a: {
        pohjassa: false
    },
    d: {
        pohjassa: false
    },
    w: {
        pohjassa: false
    },
    ArrowLeft: {
        pohjassa: false
    },
    ArrowRight: {
        pohjassa: false
    },
    ArrowUp: {
        pohjassa: false
    }
};

function moottori() { // pistää koko paskan pyörimään
    window.requestAnimationFrame(moottori);
    k.fillStyle = "black";
    k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
    pelaaja.paivita();
    dummy.paivita();

    pelaaja.kiihtyvyys.x = 0;//asettaa nollaan ennen jokaista liikettä

    if (nappaimet.a.pohjassa && pelaaja.viimeisin === "a") {
        pelaaja.kiihtyvyys.x = -5;
    } else if (nappaimet.d.pohjassa && pelaaja.viimeisin === "d") {
        pelaaja.kiihtyvyys.x = 5;
    }

    if (pelaaja.ase.position.x + pelaaja.ase.width >= dummy.koord.x &&
        pelaaja.ase.position.x <= dummy.koord.x + dummy.leveys &&
        pelaaja.ase.position.y + pelaaja.ase.height >= dummy.koord.y &&
        pelaaja.ase.position.y <= dummy.koord.y + dummy.korkeus &&
        pelaaja.hyokkaamassa
    ) {
        console.log("Pelaajan osuma!");
        pelaaja.hyokkaamassa = false;
    }

}
moottori();


//kuuntelijat ->
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        //pelaaja
        case "d":
            nappaimet.d.pohjassa = true;
            pelaaja.viimeisin = "d";
            break;
        case "a":
            nappaimet.a.pohjassa = true;
            pelaaja.viimeisin = "a";
            break;
        case "w":
            if(pelaaja.koord.y>420)pelaaja.kiihtyvyys.y = -17;
            break;
        case "e":
            pelaaja.hyokkaa();
            break;
    }
});
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        //pelaaja
        case "d":
            nappaimet.d.pohjassa = false;
            break;
        case "a":
            nappaimet.a.pohjassa = false;
            break;
        case "w":
            nappaimet.w.pohjassa = false;
            break;
    }
});









//https://www.youtube.com/watch?v=vyqbNFMDRGQ
//55 min