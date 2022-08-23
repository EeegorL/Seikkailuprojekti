"use strict";

const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 1014;
kanvaasi.height = 576;

let seinat=[];
let ovet=[];

const pelaaja = new Pelaaja({
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
    elossa:true
});
const vihollinen = new Vihollinen({
    koord: {
        x: 550,
        y: 200
    },
    kiihtyvyys: {
        x: 0,
        y: 0
    },
    hp:100,
    vari: "blue",vari2:"cyan",
    elossa:true,
    k:k,
    id:1
});



function teeSeinatJaOvet(){
    const OviE=new Ovi("etela",pelaaja)
    OviE.piirra();
    const OviP=new Ovi("pohjoinen",pelaaja)
    OviP.piirra();
    const OviL=new Ovi("lansi",pelaaja)
    OviL.piirra();
    const OviI=new Ovi("ita",pelaaja)
    OviI.piirra();
    ovet.push(OviE,OviP,OviL,OviI);

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

function moottori() {
    window.requestAnimationFrame(moottori)
    
    k.fillStyle = "whitesmoke"; //taustaväri

    k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
    if(pelaaja.elossa){ //päivittää pelaajaa jos tämä on elossa
        pelaaja.paivita();
        pelaaja.tarkistaTormaaminen(seinat);
        pelaaja.siirra(ovet);
    }
    if(vihollinen.elossa){
        vihollinen.paivitaVihollinen(k,1);
        vihollinen.tarkistaTormaaminen(seinat);    

   
    }
    teeSeinatJaOvet();
    if(vihollinen.koord.x>=seinat[2].koord.x-50){
        vihollinen.koord.x=seinat[2].koord.x-50
    }

}
moottori();




async function siirry(){

};