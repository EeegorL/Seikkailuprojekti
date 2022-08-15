"use strict";

const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 1014;
kanvaasi.height = 576;

    
async function testi(){//toimii
    const optiot={
        method:'GET',
        headers:{'Content-Type':'application/json'}
    }
    let a = await fetch("http://localhost:3000/testi",optiot).then(tulos => tulos.json());
    document.getElementById("testi").innerHTML=a[0].teksti;

    return a[0];
}testi();

(async()=>{
    let huone=await fetch(`https://localhost:3000/huone/${1}`)
})();


let kiihtyvyyskerroin = 0;
const pelaaja = new Hahmo({
    koord: {
        x: 100,
        y: 200
    },
    kiihtyvyys: {
        x: 0,
        y: 0
    },
    hp:100,
    vari: "green",vari2:"brown",
    elossa:true,
    menosuunta:"alas"
});
const vihollinen = new Hahmo({
    koord: {
        x: 550,
        y: 200
    },
    kiihtyvyys: {
        x: 0,
        y: 0
    },
    hp:100,
    vari: "red",vari2:"cyan",
    elossa:true,
    menosuunta:"alas"
});
function moottori() {
    window.requestAnimationFrame(moottori);
    k.fillStyle = "#7B6753";

    k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
    if(pelaaja.elossa){
        pelaaja.paivita();
    }
    if(vihollinen.elossa){
        vihollinen.paivita();
    }

    
}
moottori();


//nappikuuntelijat ->
window.addEventListener("keydown", (event) => {
    switch (event.key) {
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
});

async function siirry(){

};