"use strict";

const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 1014;
kanvaasi.height = 576;

let seinat=[];

async function testi(){//toimii
    const optiot={
        method:'GET',
        headers:{'Content-Type':'application/json'}
    }
    let a = await fetch("http://localhost:3000/testi",optiot).then(tulos => tulos.json());
    document.getElementById("testi").innerHTML=a[0].teksti;

    return a[0];
}testi();


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

function teeSeinat(){
    const seinaP=new Seina({koord:{x:0,y:0},leveys:kanvaasi.width,korkeus:15,kanvaasi:k,vari:"red"})
        seinaP.piirra();//Pohjoisseinä
    const seinaI=new Seina({koord:{x:0,y:0},leveys:15,korkeus:kanvaasi.height,kanvaasi:k,vari:"red"})
        seinaI.piirra();//Itäseinä
    const seinaE=new Seina({koord:{x:0,y:kanvaasi.height-15},leveys:kanvaasi.width,korkeus:15,kanvaasi:k,vari:"red"})
        seinaE.piirra();//Eteläseinä 
    const seinaL=new Seina({koord:{x:kanvaasi.width-15,y:0},leveys:15,korkeus:kanvaasi.height,kanvaasi:k,vari:"red"})
        seinaL.piirra();//Länsiseinä
        seinat=[seinaE,seinaP,seinaL,seinaI];
}

function tarkistaTormaaminen(hahmo){

}

function moottori() {
    window.requestAnimationFrame(moottori);
    k.fillStyle = "lightgrey"; //taustaväri

    k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
    if(pelaaja.elossa){ //päivittää pelaajaa jos tämä on elossa
        pelaaja.paivita();
        tarkistaTormaaminen(pelaaja);
    }
    if(vihollinen.elossa){
        vihollinen.paivita();
        tarkistaTormaaminen(vihollinen);

    }
    teeSeinat();

}
moottori();


//nappikuuntelijat ->


async function siirry(){

};