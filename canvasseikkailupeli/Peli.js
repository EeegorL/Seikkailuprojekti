"use strict";

const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 800;
kanvaasi.height = 650;

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
    id:1,
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
});
let rng1=Math.round(Math.random())==1?true:false;
let rng2=Math.round(Math.random())==1?true:false;
let rng3=Math.round(Math.random())==1?true:false;
let rng4=Math.round(Math.random())==1?true:false;


function teeSeinatJaOvet(p,e,l,i){
    if(e){
        const OviE=new Ovi("etela")
        OviE.piirra();
        ovet.push(OviE);
    }
    if(p){
        const OviP=new Ovi("pohjoinen")
        OviP.piirra();
        ovet.push(OviP);
    }
    if(l){
        const OviL=new Ovi("lansi")
        OviL.piirra();
        ovet.push(OviL);
    }
    if(i){
        const OviI=new Ovi("ita")
        OviI.piirra();
        ovet.push(OviI);
    }


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

async function moottori() {
    window.requestAnimationFrame(moottori)

    k.fillStyle = "#222222"; //taustaväri

    k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
    if(pelaaja.elossa){ //päivittää pelaajaa jos tämä on elossa
        pelaaja.paivita();
        pelaaja.tarkistaTormaaminen(seinat);
        pelaaja.avaaOvi(ovet);
    }
    if(vihollinen.elossa){
        vihollinen.paivitaVihollinen(vihollinen.id);

   
    }
    teeSeinatJaOvet(rng1,rng2,rng3,rng4);

}
// (()=>{ //matikkaa varten, voi poistaa
// let nrot=[];
// let tulosNrot=[];
// let alaraja=0;
// let ylaraja=100;
//     for(let nro of nrot){
//     if(nro >= alaraja && nro <=ylaraja){
//         tulosNrot.push(nro);
//     }
//     }
//     console.log(tulosNrot);
// })();
cancelAnimationFrame(requestAnimationFrame(moottori));
moottori();




async function siirry(){

};