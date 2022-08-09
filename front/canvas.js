const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 1014;
kanvaasi.height = 576;




k.fillRect(0, 0, k.width, k.height);

let kiihtyvyyskerroin = 0;

class Homo_Habilis {
    constructor({ koord, kiihtyvyys, vari,vari2}) {
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
    }


    piirra() { //piirtää hahmon
        k.fillStyle = this.vari;
        k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
        k.fillStyle = this.vari2;
        k.fillRect(this.ase.position.x, this.ase.position.y, this.ase.width, this.ase.height);
    }
    paivita() { //paivittaa jokaisen framen
        this.piirra();
        this.koord.y += this.kiihtyvyys.y;
        this.koord.x += this.kiihtyvyys.x;
        this.kiihtyvyys.y=0;
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
        y: 0
    },
    vari: "green",vari2:"yellow"

});


const vihollinen = new Homo_Habilis({
    koord: {
        x: 900,
        y: 100
    },
    kiihtyvyys: {
        x: 0,
        y: 0
    },
    vari: "red",vari2:"cyan"
});


const nappaimet = {
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

function moottori() { // pistää koko paskan pyörimään
    window.requestAnimationFrame(moottori);
    k.fillStyle = "black";
    k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
    pelaaja.paivita();
    vihollinen.paivita();

    pelaaja.kiihtyvyys.x = 0;//asettaa nollaan ennen jokaista liikettä

    if (nappaimet.a.pohjassa && pelaaja.viimeisin === "a") {
        pelaaja.kiihtyvyys.x = -5;
    } else if (nappaimet.d.pohjassa && pelaaja.viimeisin === "d") {
        pelaaja.kiihtyvyys.x = 5;
    }else if (nappaimet.w.pohjassa && pelaaja.viimeisin === "w") {
        pelaaja.kiihtyvyys.y = -5;
    }else if (nappaimet.s.pohjassa && pelaaja.viimeisin === "s") {
        pelaaja.kiihtyvyys.y = 5;
    }

    if (pelaaja.ase.position.x + pelaaja.ase.width >= vihollinen.koord.x &&
        pelaaja.ase.position.x <= vihollinen.koord.x + vihollinen.leveys &&
        pelaaja.ase.position.y + pelaaja.ase.height >= vihollinen.koord.y &&
        pelaaja.ase.position.y <= vihollinen.koord.y + vihollinen.korkeus &&
        pelaaja.hyokkaamassa
    ) {
        console.log("Pelaajan osuma!");
        pelaaja.hyokkaamassa = false;
    }
    if (vihollinen.ase.position.x + vihollinen.ase.width >= pelaaja.koord.x &&
        vihollinen.ase.position.x <= pelaaja.koord.x + pelaaja.leveys &&
        vihollinen.ase.position.y + vihollinen.ase.height >= pelaaja.koord.y &&
        vihollinen.ase.position.y <= pelaaja.koord.y + pelaaja.korkeus &&
        vihollinen.hyokkaamassa
    ) {
        console.log("Vihollisen osuma!");
        vihollinen.hyokkaamassa = false;

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
            nappaimet.w.pohjassa = true;
            pelaaja.viimeisin = "w";
            break;
        case "s":
            nappaimet.s.pohjassa = true;
            pelaaja.viimeisin = "s";
            break;
        case "Enter":
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
        case "s":
            nappaimet.s.pohjassa = false;
            break;
    }
    var background = new Image();
background.src = "background.jpg";

kanvaasi.onload = k.draw(background,0,0);
});









//https://www.youtube.com/watch?v=vyqbNFMDRGQ
//55 min