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
    menosuunta:"oikea"
});

function teeSeinat(){
    const seinaP=new Seina({koord:{x:0,y:0},leveys:kanvaasi.width,korkeus:15,kanvaasi:k,vari:"brown"})
        seinaP.piirra();//Pohjoisseinä
    const seinaI=new Seina({koord:{x:0,y:0},leveys:15,korkeus:kanvaasi.height,kanvaasi:k,vari:"brown"})
        seinaI.piirra();//Itäseinä
    const seinaE=new Seina({koord:{x:0,y:kanvaasi.height-15},leveys:kanvaasi.width,korkeus:15,kanvaasi:k,vari:"brown"})
        seinaE.piirra();//Eteläseinä 
    const seinaL=new Seina({koord:{x:kanvaasi.width-15,y:0},leveys:15,korkeus:kanvaasi.height,kanvaasi:k,vari:"brown"})
        seinaL.piirra();//Länsiseinä
        seinat=[seinaE,seinaP,seinaL,seinaI];
}

function tarkistaTormaaminen(hahmo){
    //huoneiden seinät
        if(hahmo.menosuunta=="oikea"){
            console.log("iwjho")
            if(hahmo.koord.x+hahmo.leveys>=seinat[2].koord.x){
                hahmo.koord.x = seinat[2].koord.x-hahmo.leveys;        
            }
        }
        if(hahmo.menosuunta=="vasen"){
            if(hahmo.koord.x-10<=seinat[3].koord.x){
                hahmo.koord.x = seinat[3].koord.x+hahmo.leveys-35; 
            }
        }
        if(hahmo.menosuunta=="alas"){
            if(hahmo.koord.y+hahmo.korkeus>=seinat[0].koord.y){
                hahmo.koord.y = seinat[0].koord.y-hahmo.korkeus;        }
        }
        if(hahmo.menosuunta=="ylos"){
            if(hahmo.koord.y-hahmo.korkeus+70<=seinat[1].koord.y){
                hahmo.koord.y = seinat[1].koord.y+hahmo.korkeus-65;        }
        }
}


function moottori() {
    window.requestAnimationFrame(moottori);
    k.fillStyle = "whitesmoke"; //taustaväri

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