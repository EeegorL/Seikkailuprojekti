"use strict";
//alustaa kanvaasin
const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 800;
kanvaasi.height = 650;
let kaynnissa = true;
let huonenumero = "4-1";
let seinat = [];
let ovet = [];
let viholliset = [];
let huonekalut = [];
let npct = [];
let pauseVar = false;
let huonetiedot;
let huoneenHuonekalut;
let saiJuuriRahnaa = false;
let onNPCeita = false;
let huoneenVari;
let pauseOnMahdollinen = true;

document.getElementById("uusiPeli").addEventListener("click", async () => {
    huonenumero = "4-1";
    location.reload();
    pelaaja.hp = 100;
    pelaaja.dmg = 10;
    pelaaja.dmgRed = 0;
    pelaaja.elossa = true;
    await fetch("uusiPeli", { method: "POST" }).then(alusta(huonenumero));
});
window.addEventListener("DOMContentLoaded", async () => {
    huonenumero = "4-1";
    pelaaja.hp = 100;
    pelaaja.dmg = 10;
    pelaaja.dmgRed = 0;
    pelaaja.elossa = true;
    await fetch("uusiPeli", { method: "POST" }).then(alusta(huonenumero));
});
async function alusta(huoneNro) {//alustaa huoneen
    seinat.length = 0;
    ovet.length = 0;
    viholliset.length = 0;
    huonekalut.length = 0;
    npct.length = 0;

    huonetiedot = await fetch(`huoneenOvet/${huoneNro}`).then(tulos => tulos.json());
    huoneenHuonekalut = await fetch(`huoneenHuonekalut/${huoneNro}`).then(tulos => tulos.json());
    huonenumero = await huonetiedot[0]?.id;
    huoneenVari = await huonetiedot[0]?.vari;
    document.getElementById("huoneenNimi").innerHTML = `Sijaintisi on ${huonetiedot[0]?.nimi || ""}`// käy läpi huoneen viholliset ja luo ne
    document.getElementById("huoneenKuvaus").innerHTML = huonetiedot[0]?.kuvaus;
    viholliset = [];

    let huoneenViholliset = await fetch(`huoneenViholliset/${huoneNro}`).then(tulos => tulos.json());
    for (let vihollinen of huoneenViholliset) {
        viholliset.push(new Vihollinen(
            vihollinen.id,
            {
                x: vihollinen.x,
                y: vihollinen.y
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
            false
        ));
    }
    //npc-luonti
    if (await huonetiedot[0]?.onNPCeita) {
        npct = [
            new NPC(1, { x: 650, y: 15 }, 70, 50, 5),
            new NPC(2, { x: 400, y: 150 }, 70, 50, 6),
            new NPC(3, { x: 300, y: 400 }, 70, 50, 3),
            new NPC(4, { x: 200, y: 500 }, 70, 50, 4),
            new NPC(5, { x: 100, y: 550 }, 70, 50, 4),
            new NPC(6, { x: 50, y: 450 }, 70, 50, 4),
            new NPC(7, { x: 125, y: 350 }, 70, 50, 8),
            new NPC(8, { x: 325, y: 200 }, 70, 50, 10),
            new NPC(9, { x: 450, y: 250 }, 70, 50, 8),
            new NPC(10, { x: 700, y: 75 }, 70, 50, 9)
        ];
        onNPCeita = true;
        for (let npc of npct) {
            npc.vaihdaSuunta();
        }
    } else onNPCeita = false;
    // käy läpi huoneen huonekalut ja luo ne


};
function asetaStatus(teksti) {
    document.getElementById("status").innerHTML = teksti;
    setTimeout(() => { document.getElementById("status").innerHTML = "" }, 1500);
}
async function teeEsteetJaOvet() {
    // tekee pelin seinät ja ovet
    ovet.length = 0;
    huonekalut.length = 0;

    if (await huoneenHuonekalut) {
        for (let huonekalu of huoneenHuonekalut) {
            let kalu = new Huonekalu(
                huonekalu.tyyppi,
                {
                    x: huonekalu.x,
                    y: huonekalu.y
                },
                {
                    leveys: huonekalu.leveys,
                    korkeus: huonekalu.korkeus
                },
                huonekalu.vari,
                huonekalu.koriste
            );
            k.fillStyle = huonekalu.vari;
            huonekalut.push(kalu);
            kalu.piirra();
        };

    }




    if (await huonetiedot) {
        if (await huonetiedot[0]?.etela != null) {
            const OviE = new Ovi("etela", huonetiedot[0].etela);
            OviE.piirra();
            ovet.push(OviE);
        }
        if (await huonetiedot[0]?.pohjoinen != null) {
            const OviP = new Ovi("pohjoinen", huonetiedot[0].pohjoinen);
            OviP.piirra();
            ovet.push(OviP);
        }
        if (await huonetiedot[0]?.lansi != null) {
            const OviL = new Ovi("lansi", huonetiedot[0].lansi);
            OviL.piirra();
            ovet.push(OviL);
        }
        if (await huonetiedot[0]?.ita != null) {
            const OviI = new Ovi("ita", huonetiedot[0].ita);
            OviI.piirra();
            ovet.push(OviI);
        }
    }


    // tekee seinät

    const seinaP = new Seina({ koord: { x: 0, y: 0 }, leveys: kanvaasi.width, korkeus: 15, kanvaasi: k, vari: "brown" })
    seinaP.piirra();//Pohjoisseinä
    const seinaI = new Seina({ koord: { x: 0, y: 0 }, leveys: 15, korkeus: kanvaasi.height, kanvaasi: k, vari: "brown" })
    seinaI.piirra();//Itäseinä
    const seinaE = new Seina({ koord: { x: 0, y: kanvaasi.height - 15 }, leveys: kanvaasi.width, korkeus: 15, kanvaasi: k, vari: "brown" })
    seinaE.piirra();//Eteläseinä 
    const seinaL = new Seina({ koord: { x: kanvaasi.width - 15, y: 0 }, leveys: 15, korkeus: kanvaasi.height, kanvaasi: k, vari: "brown" })
    seinaL.piirra();//Länsiseinä

    seinat = [seinaE, seinaP, seinaL, seinaI];
    k.fillText(`Rahaa takataskussa: ${pelaaja.raha}`, kanvaasi.width * 0.65, 50);

}
let pelinAlku = new Date().getTime() / 1000;


async function moottori() { //päivittää jokaisen framen
    try {
        let nykyhetki = new Date().getTime() / 1000;
        if (kaynnissa) { //muuttuja, jolla voi lopettaa pelin tyyliin kaynnissa=false
            k.clearRect(0, 0, kanvaasi.width, kanvaasi.height);
            window.requestAnimationFrame(moottori);

            k.fillStyle = huoneenVari; //taustaväri
            k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
            if (pelaaja?.tajuissaan) { //päivittää pelaajaa jos tämä on tajuissaam
                pelaaja.paivita();
                pelaaja.tarkistaTormaaminen(seinat, huonekalut, npct);
                let onVihollisia = false;
                for (let vih of viholliset) {
                    if (vih.tajuissaan) {
                        onVihollisia = true;
                    }
                }
                if (!onVihollisia) { // ei päästä pelaajaa kulkemaan ovista niin kauan kun huoneessa on vihollisia
                    pelaaja.avaaOvi(ovet);
                    if (saiJuuriRahnaa) {
                        pelaaja.rahaPlus();
                    }
                }

            }
            k.fillStyle = "red";

            if (onNPCeita) {
                for (let npc of npct) {
                    npc.paivitaNPC();
                    npc.tarkistaTormaaminen(seinat, huonekalut);
                    if (Math.round(nykyhetki - pelinAlku) % npc.vaihtovali === 0) {
                        npc.vaihdaSuunta();
                    }
                }
            }
            for (let vihollinen of viholliset) {// päivittää kaikki tajuissaan olevat viholliset
                if (vihollinen?.tajuissaan) {
                    vihollinen.paivitaVihollinen();
                    vihollinen.tarkistaTormaaminen(seinat, huonekalut);
                }
                if (vihollinen.nimi == "LOMPAKKOVARAS" && !vihollinen.tajuissaan) {
                    pelaaja.peliLoppui();
                }
            }
            k.fillStyle = "brown";
            teeEsteetJaOvet();

            window.cancelAnimationFrame(requestAnimationFrame(moottori));// peruuttaa äskeisen framen jottei ohjelma ylikuormitu

        }
    }
    catch (err) {
        throw new Error(err);
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
    null,//nimi, voi pistää tyhjäks tyyliin null tai ""
    false //isNpc==false
);

moottori();


