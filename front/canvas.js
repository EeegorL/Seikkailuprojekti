// import Hahmo from "./Hahmo";

const kanvaasi = document.querySelector("canvas");
const k = kanvaasi.getContext("2d");
kanvaasi.width = 1014;
kanvaasi.height = 576;


k.fillRect(0, 0, k.width, k.height);

let kiihtyvyyskerroin = 0;

class Hahmo {
    constructor({ koord, kiihtyvyys, vari,vari2,elossa,menosuunta}) {
        this.koord = koord;
        this.kiihtyvyys = kiihtyvyys;
        this.korkeus = 75;
        this.leveys = 50;
        this.viimeisin;
        this.vari = vari;
        this.vari2 = vari2;
        this.ase = {
            position: this.koord,
            width: 150,
            height: 10
        }
        this.hyokkaamassa;
        this.elossa=elossa;
        this.menosuunta=menosuunta;
    }
    liikehdinta() { //piirtää hahmon
        k.fillStyle = this.vari;
        k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
        k.fillStyle = this.vari2;
        pelaaja.kiihtyvyys.x = 0;//asettaa liikehdinnän nollaan ennen jokaista liikettä

        if (nappaimet.a.pohjassa && pelaaja.viimeisin === "a") {
            pelaaja.kiihtyvyys.x = -5;
            pelaaja.menosuunta="vasen";
        } else if (nappaimet.d.pohjassa && pelaaja.viimeisin === "d") {
            pelaaja.kiihtyvyys.x = 5;
            pelaaja.menosuunta="oikea";
        }else if (nappaimet.w.pohjassa && pelaaja.viimeisin === "w") {
            pelaaja.kiihtyvyys.y = -5;
            pelaaja.menosuunta="ylos";
        }else if (nappaimet.s.pohjassa && pelaaja.viimeisin === "s") {
            pelaaja.kiihtyvyys.y = 5;
            pelaaja.menosuunta="alas";
        }
    //pelaajan osumaehdot
        if (pelaaja.menosuunta=="oikea" &&
            pelaaja.ase.position.x + pelaaja.ase.width >= vihollinen.koord.x &&
            pelaaja.ase.position.x <= vihollinen.koord.x + vihollinen.leveys &&
            pelaaja.ase.position.y+30 + pelaaja.ase.height >= vihollinen.koord.y &&
            pelaaja.ase.position.y+30 <= vihollinen.koord.y + vihollinen.korkeus &&
            pelaaja.hyokkaamassa
        ) {
            console.log(`
            ase pos x: ${pelaaja.ase.position.x} 
            ase pos y: ${pelaaja.ase.position.y}
            `)
            console.log("Pelaajan osuma!");
            dmgIndicator();
            pelaaja.hyokkaamassa = false;
        }
        else if(pelaaja.menosuunta=="vasen"&&
            pelaaja.ase.position.x - pelaaja.ase.width <= vihollinen.koord.x &&
            pelaaja.ase.position.x >= vihollinen.koord.x - vihollinen.leveys &&
            pelaaja.ase.position.y+30 + pelaaja.ase.height >= vihollinen.koord.y &&
            pelaaja.ase.position.y+30 <= vihollinen.koord.y + vihollinen.korkeus &&
            pelaaja.hyokkaamassa
        ) {
            console.log(`
            ase pos x: ${pelaaja.ase.position.x} 
            ase pos y: ${pelaaja.ase.position.y}
            `)
            console.log("Pelaajan osuma!");
            dmgIndicator();
            pelaaja.hyokkaamassa = false;
        }
        else if(pelaaja.menosuunta=="ylos"&&
        pelaaja.ase.position.x+20 + pelaaja.ase.width >= vihollinen.koord.x &&
        pelaaja.ase.position.x+20 <= vihollinen.koord.x + vihollinen.leveys &&
        pelaaja.ase.position.y -75+pelaaja.ase.height >= vihollinen.koord.y &&
        pelaaja.ase.position.y-75<= vihollinen.koord.y + vihollinen.korkeus &&
        pelaaja.hyokkaamassa
        ) {
           console.log(`
           ase pos x: ${pelaaja.ase.position.x} 
           ase pos y: ${pelaaja.ase.position.y}
           `)
           console.log("Pelaajan osuma!");
           dmgIndicator();
           pelaaja.hyokkaamassa = false;
        }
        else if(pelaaja.menosuunta=="alas"&&
        pelaaja.ase.position.x+20 + pelaaja.ase.width >= vihollinen.koord.x &&
        pelaaja.ase.position.x+20 <= vihollinen.koord.x + vihollinen.leveys &&
        pelaaja.ase.position.y+pelaaja.ase.height >= vihollinen.koord.y &&
        pelaaja.ase.position.y<= vihollinen.koord.y + vihollinen.korkeus &&
        pelaaja.hyokkaamassa
        ) {
           console.log(`
           ase pos x: ${pelaaja.ase.position.x} 
           ase pos y: ${pelaaja.ase.position.y}
           `)
           console.log("Pelaajan osuma!");
           dmgIndicator();
           pelaaja.hyokkaamassa = false;
        }
        
        if(this.menosuunta=="vasen"){
            k.fillRect(this.ase.position.x-100, this.ase.position.y+30, this.ase.width=150, this.ase.height=10);
        }
        else if(this.menosuunta=="oikea"){
            k.fillRect(this.ase.position.x, this.ase.position.y+30, this.ase.width=150, this.ase.height=10);
        }
        else if(this.menosuunta=="ylos"){
            k.fillRect(this.ase.position.x+20, this.ase.position.y-75, this.ase.width=10, this.ase.height=150);
        }
        else if(this.menosuunta=="alas"){
            k.fillRect(this.ase.position.x+20, this.ase.position.y, this.ase.width=10, this.ase.height=150);
        }
        
    }
    paivita() { //paivittaa jokaisen framen
        this.liikehdinta();
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
const pelaaja = new Hahmo({
    koord: {
        x: 507,
        y: 400
    },
    kiihtyvyys: {
        x: 0,
        y: 0
    },
    vari: "green",vari2:"yellow",
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
    vari: "red",vari2:"cyan",
    elossa:true,
    menosuunta:"alas"
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
    
    var background = new Image();
    background.src = "./background.jpg";

    background.onload = function(){
    k.drawImage(background,0,0);   
}
    k.fillRect(0, 0, kanvaasi.width, kanvaasi.height);
    if(pelaaja.elossa){
        pelaaja.paivita();
    }
    if(vihollinen.elossa){
        vihollinen.paivita();
    }

    
}
moottori();

function dmgIndicator(){//testaamista varten
    let indicator=document.getElementById("dmgIndicator");
    indicator.style.color="red";
    setTimeout(()=>indicator.style.color="black",700);
}
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
});
