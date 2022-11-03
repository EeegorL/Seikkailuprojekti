"use strict";
//alustaa kanvaasin
const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 800;
kanvaasi.height = 650;
let kaynnissa=true;
let huonenumero="4-1";
let seinat=[];
let ovet=[];
let viholliset=[];
let huonekalut=[];
let pauseVar=false;
let huoneenOvet;
let huoneenHuonekalut;


async function alusta(huoneNro){//alustaa huoneen

    huoneenOvet=await fetch(`huoneenOvet/${huoneNro}`).then(tulos=>tulos.json());
    huoneenHuonekalut=await fetch(`huoneenHuonekalut/${huoneNro}`).then(tulos=>tulos.json());

    huonenumero=huoneenOvet.id;
    
    document.getElementById("huoneenNimi").innerHTML=`${huoneenOvet[0]?.nimi || ""}`// käy läpi huoneen viholliset ja luo ne
viholliset=[];

let huoneenViholliset=await fetch(`huoneenViholliset/${huoneNro}`).then(tulos=>tulos.json());
    for(let vihollinen of huoneenViholliset){
        viholliset.push(new Vihollinen(
            vihollinen.id,
            {
                x:vihollinen.x,
                y:vihollinen.y
            },
            vihollinen.leveys,
            vihollinen.korkeus,
            vihollinen.hp,
            vihollinen.vari1,
            vihollinen.vari2,
            vihollinen.elossa,
            vihollinen.nimi,
            vihollinen.dmg,
            vihollinen.nopeus,
            vihollinen.kuva,
    ));
    }

// käy läpi huoneen huonekalut ja luo ne



};

async function teeEsteetJaOvet(){
    // tekee pelin seinät ja ovet
    ovet.length=0;
    k.fillStyle="red";

    if(await huoneenHuonekalut){
        for(let huonekalu of huoneenHuonekalut){
            let kalu=new Huonekalu(
                huonekalu.tyyppi,
                {
                    x:huonekalu.x,
                    y:huonekalu.y
                },
                {
                    leveys:huonekalu.leveys,
                    korkeus:huonekalu.korkeus
                },
                huonekalu.vari,
                huonekalu.koriste
            )
            huonekalut.push(kalu);
            kalu.piirra();
        };
    }



    if(await huoneenOvet){
        if(await huoneenOvet[0]?.etela!=null){
            const OviE=new Ovi("etela",huoneenOvet[0].etela);
            OviE.piirra();
            ovet.push(OviE);
        }
        if(await huoneenOvet[0]?.pohjoinen!=null){
            const OviP=new Ovi("pohjoinen",huoneenOvet[0].pohjoinen);
            OviP.piirra();
            ovet.push(OviP);
        }
        if(await huoneenOvet[0]?.lansi!=null){
            const OviL=new Ovi("lansi",huoneenOvet[0].lansi);
            OviL.piirra();
            ovet.push(OviL);
        }
        if(await huoneenOvet[0]?.ita!=null){
            const OviI=new Ovi("ita",huoneenOvet[0].ita);
            OviI.piirra();
            ovet.push(OviI);
        }
    }


    // tekee seinät
    
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

    if(kaynnissa){ //muuttuja, jolla voi lopettaa pelin tyyliin kaynnissa=false
        k.clearRect(0,0,kanvaasi.width,kanvaasi.height);
        window.requestAnimationFrame(moottori);

        k.fillStyle = "#222222"; //taustaväri
        k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
        if(pelaaja.tajuissaan){ //päivittää pelaajaa jos tämä on tajuissaam
            pelaaja.paivita();
            pelaaja.tarkistaTormaaminen(seinat,huonekalut);
            pelaaja.avaaOvi(ovet);
            
        }

        for(let vihollinen of viholliset){// päivittää kaikki tajuissaan olevat viholliset
            if(vihollinen?.tajuissaan){
                vihollinen.paivitaVihollinen();
                vihollinen.tarkistaTormaaminen(seinat,huonekalut);
                
            }
        }
        k.fillStyle="brown"
        teeEsteetJaOvet();
        window.cancelAnimationFrame(requestAnimationFrame(moottori));// peruuttaa äskeisen framen jottei ohjelma ylikuormitu
    }
}

const pelaaja = new Pelaaja(
    1000, //id
    {// spawn-koordinaatit
        x: 100,
        y: 200
    },
    {//kiihtyvyys (alustettuna)
        x: 0,
        y: 0
    },
    "green",//värit
    "brown",
    true, //elossa-boolean
    100, //hp
    10, //dmg
    null//nimi, voi pistää tyhjäks tyyliin null tai ""
);

alusta(huonenumero);
moottori();


