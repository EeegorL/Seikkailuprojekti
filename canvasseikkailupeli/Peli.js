"use strict";
//alustaa kanvaasin
const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 800;
kanvaasi.height = 650;
let kaynnissa=true;
let huoneNro=1;
let seinat=[];
let ovet=[];
let viholliset=[];
let pauseVar=false;
    

async function alusta(huoneNro){//alustaa huoneen
    let huoneenViholliset=await fetch(`huoneenViholliset/${huoneNro}`).then(tulos=>tulos.json());
//käy läpi huoneen viholliset ja luo ne
    for(let vihollinen of huoneenViholliset){
        viholliset.push(new Vihollinen({
            id:vihollinen.id,
            koord:{
                x:vihollinen.x,
                y:vihollinen.y
            },
            kiihtyvyys:{
                x:0,
                y:0
            },
            leveys:vihollinen.leveys,
            korkeus:vihollinen.korkeus,
            nopeus:vihollinen.nopeus,
            hp:vihollinen.hp,
            vari:vihollinen.vari1,
            vari2:vihollinen.vari2,
            tajuissaan:true,
            nimi:vihollinen.nimi,
            dmg:vihollinen.dmg
        }))

    }
};

    alusta(huoneNro);

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
    tajuissaan:true
});

//ovi-rng:t testaukseen, spawnaa aina satunnaisen määrän ovia, 0-4
let rng1=Math.round(Math.random())==1?true:false;
let rng2=Math.round(Math.random())==1?true:false;
let rng3=Math.round(Math.random())==1?true:false;
let rng4=Math.round(Math.random())==1?true:false;

function teeSeinatJaOvet(p,e,l,i){ // tekee pelin seinät ja ovet
    //lisää ovia riippuen rng-muuttujista
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

    //tekee seinät
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

async function moottori() { //päivittää jokaisen framen
    if(kaynnissa==true){ //muuttuja, jolla voi lopettaa pelin tyyliin kaynnissa=false
        window.requestAnimationFrame(moottori);

        k.fillStyle = "#222222"; //taustaväri
    
        k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
        if(pelaaja.tajuissaan){ //päivittää pelaajaa jos tämä on tajuissaam
            pelaaja.paivita();
            pelaaja.tarkistaTormaaminen(seinat);
            pelaaja.avaaOvi(ovet);
        }
        for(let vihollinen of viholliset){// päivittää kaikki tajuissaan olevat viholliset
            if(vihollinen?.tajuissaan){
                vihollinen.paivitaVihollinen();
            }
        }
        teeSeinatJaOvet(rng1,rng2,rng3,rng4); //tekee seinät ja ovet riippuen rng-muuttujista
        window.cancelAnimationFrame(requestAnimationFrame(moottori));// peruuttaa äskeisen framen jottei ohjelma ylikuormitu
    }
}moottori();




async function siirry(huoneId){ //tähän huoneiden päivitys

};

