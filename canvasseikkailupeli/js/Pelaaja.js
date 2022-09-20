"use strict";


class Pelaaja extends Hahmo{
    
    constructor(koord, kiihtyvyys, vari,vari2,tajuissaan,hp,dmgRed){
        super(koord, kiihtyvyys, vari,vari2,tajuissaan,hp);//ottaa käyttöön parent-classin
        this.a = new Image(this.leveys,this.korkeus);
        this.a.src="../kuvat/sprite.jpg";
        this.huonenro;
        this.dmgRed=dmgRed;
        this.dmgRed=0;
    }
    avaaOvi(ovet){ //pelaajan ovien kautta liikkuminen
        let e=null;
        let p=null;
        let i=null;
        let l=null;
        for(let ovi of ovet){//katsoo, mitkä huoneet ovat olemassa huoneessa
            if(ovi.ilmansuunta=="etela"){
                e=ovi;
            }
            else if(ovi.ilmansuunta=="pohjoinen"){
                p=ovi;
            }
            else if(ovi.ilmansuunta=="lansi"){
                l=ovi;
            }
            else if(ovi.ilmansuunta=="ita"){
                i=ovi;
            }

        }
        //itse siirtäminen riippuen ilmansuunnasta
        switch(this.menosuunta){
            case "alas":
            if(e){
                if(this.koord.x<=e.koord.x+e.leveys &&
                    this.koord.x+this.leveys>=e.koord.x &&
                    this.koord.y>=e.koord.y-e.korkeus+5){
                        e.siirra(e.ilmansuunta);
                     }
            }
            break;
            
            case "ylos":
                if(p){
                    if(this.koord.x<=p.koord.x+p.leveys &&
                        this.koord.x+this.leveys>=p.koord.x &&
                        this.koord.y<=10){
                            p.siirra(p.ilmansuunta);
                         }
                }

                break;
        
            case "vasen":
                if(l){
                    if(this.koord.x<=l.koord.x+30 &&
                        this.koord.y>=l.koord.y-10 &&
                        this.koord.y<=l.koord.y+l.korkeus
                    ){
                        l.siirra(l.ilmansuunta);
                         }
                }

            break;
            
            case "oikea":
                if(i){
                    if(this.koord.x>=i.koord.x-30 &&
                        this.koord.y>=i.koord.y-10 &&
                        this.koord.y<=i.koord.y+i.korkeus
                    ){
                        i.siirra(i.ilmansuunta);
                         }
                }
            break;
            }
    }
    
    hyokkaa(kohde) { //hyokkaa viholliseen. toimii nyt vasta yhdellä vihollisella
        this.hyokkaamassa = true;
        //tarkistaa, osuuko pelaajan ase viholliseen, ja näin ollen kutsuu dmgIndicatoria, joka tekee vahinkoa
        //tähän esim for loop, tyyliin for(kohde in kohteet){...
        if (this.menosuunta=="oikea" &&
        this.ase.position.x + this.ase.width >= kohde.koord.x &&
        this.ase.position.x <= kohde.koord.x + kohde.leveys &&
        this.ase.position.y+this.korkeus*0.4+ this.ase.height >= kohde.koord.y &&
        this.ase.position.y+this.korkeus*0.4 <= kohde.koord.y + kohde.korkeus &&
        this.hyokkaamassa
    ) {
        this.dmgIndicator(kohde);
        this.hyokkaamassa = false;
    }
    else if(this.menosuunta=="vasen"&&
        this.ase.position.x - this.ase.width <= kohde.koord.x &&
        this.ase.position.x >= kohde.koord.x - kohde.leveys &&
        this.ase.position.y+this.korkeus*0.4 + this.ase.height >= kohde.koord.y &&
        this.ase.position.y+this.korkeus*0.4 <= kohde.koord.y + kohde.korkeus &&
        this.hyokkaamassa
    ) {
        this.dmgIndicator(kohde);
        this.hyokkaamassa = false;
    }
    else if(this.menosuunta=="ylos"&&
    this.ase.position.x+this.leveys*0.667 + this.ase.width >= kohde.koord.x &&
    this.ase.position.x+this.leveys*0.667 <= kohde.koord.x + kohde.leveys &&
    this.ase.position.y-this.korkeus+this.ase.height >= kohde.koord.y &&
    this.ase.position.y-this.korkeus<= kohde.koord.y + kohde.korkeus &&
    this.hyokkaamassa
    ) {
       this.dmgIndicator(kohde);
       this.hyokkaamassa = false;
    }
    else if(this.menosuunta=="alas"&&
    this.ase.position.x+this.leveys*0.3 + this.ase.width >= kohde.koord.x &&
    this.ase.position.x+this.leveys*0.5 <= kohde.koord.x + kohde.leveys &&
    this.ase.position.y+this.ase.height >= kohde.koord.y &&
    this.ase.position.y<= kohde.koord.y + kohde.korkeus &&
    this.hyokkaamassa
    ) {
       this.dmgIndicator(kohde);
       this.hyokkaamassa = false;
    }

    }
    dmgIndicator(kohde){//vahingon tunnistaminen
        let ogVarit=[kohde.vari1,kohde.vari2];

        if(kohde.tajuissaan==true){ //värin muuttaminen vahingon merkitsemiseksi
            kohde.hp-=10;
            kohde.vari="red";
            kohde.vari2="red";

            setTimeout(()=>{
                kohde.vari=ogVarit[0];
                kohde.vari2=ogVarit[1];

            },350);
        }


    }
    liikehdinta() { //liikkuminen
        if(this.hp<=0){ //pelaajan kuoleman tarkistaminen. jos pelaaja kuolee, peli peittyy mustalla verholla
            this.tajuissaan=false;
            kaynnissa=false;
            console.log("Peli loppui");
            document.getElementById("verho").classList.remove("hiddenClass");
            document.getElementById("menu").classList.remove("hiddenClass");

        }
    k.drawImage(this.a,this.koord.x,this.koord.y);

        k.fillStyle = this.vari2;
        pelaaja.kiihtyvyys.x = 0;//asettaa liikehdinnän nollaan ennen jokaista liikettä

        //tarkistaa viimeisimpänä painetun napin ja toimii sen mukaan
        if (liikenappaimet.a.pohjassa && pelaaja.viimeisin === "a") {
            pelaaja.kiihtyvyys.x = -5;
            pelaaja.menosuunta="vasen";
        }else if (liikenappaimet.d.pohjassa && pelaaja.viimeisin === "d") {
            pelaaja.kiihtyvyys.x = 5;
            pelaaja.menosuunta="oikea";
        }else if (liikenappaimet.w.pohjassa && pelaaja.viimeisin === "w") {
            pelaaja.kiihtyvyys.y = -5;
            pelaaja.menosuunta="ylos";
        }else if (liikenappaimet.s.pohjassa && pelaaja.viimeisin === "s") {
            pelaaja.kiihtyvyys.y = 5;
            pelaaja.menosuunta="alas";
        }       
        //aseen osoitussuunta riippuen liikesuunnasta
        // konteksti.globalAlpha asettaa elementin läpinäkyväksi, niin hahmon ase ei vaikuta valtavalta nuijalta
        k.globalAlpha=0.2;
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
        k.globalAlpha=1;
//jos tän ottaa pois, nii jää kiva humalaefekti jota vois käyttää
        
    }
    tarkistaTormaaminen(seinat){ //nimensä mukaan tarkistaa seinät ja estää niiden läpi kulkemisen
        //huoneiden seinät
            if(this.menosuunta=="oikea"){
                if(this.koord.x+this.leveys>=seinat[2].koord.x){
                    this.koord.x = seinat[2].koord.x-this.leveys;        
                }
            }
            if(this.menosuunta=="vasen"){
                if(this.koord.x-10<=seinat[3].koord.x){
                    this.koord.x = seinat[3].koord.x+this.leveys-35; 
                }
            }
            if(this.menosuunta=="alas"){
                if(this.koord.y+this.korkeus>=seinat[0].koord.y){
                    this.koord.y = seinat[0].koord.y-this.korkeus;        }
            }
            if(this.menosuunta=="ylos"){
                if(this.koord.y-this.korkeus+70<=seinat[1].koord.y){
                    this.koord.y = seinat[1].koord.y+this.korkeus-65;        }
            }
    }
    pause(){
        if(pauseVar==false){
            pauseVar=true;
            kaynnissa=false;
            document.getElementById("menu").classList.remove("hiddenClass");

        }
        else if(pauseVar==true){
            pauseVar=false;
            kaynnissa=true;
            document.getElementById("menu").classList.add("hiddenClass");

            moottori();
        }
    }
};



const liikenappaimet = {
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

//nappikuuntelijat
window.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case "d":
            liikenappaimet.d.pohjassa = true;
            pelaaja.viimeisin = "d";
            break;
        case "a":
            liikenappaimet.a.pohjassa = true;
            pelaaja.viimeisin = "a";
            break;
        case "w":
            liikenappaimet.w.pohjassa = true;
            pelaaja.viimeisin = "w";
            break;
        case "s":
            liikenappaimet.s.pohjassa = true;
            pelaaja.viimeisin = "s";
            break;
        case "enter":
            //johonki tähän loop joka käy läpi ja katsoo, että ketkä viholliset ovat aseen kohdalla ja ottavat turpaan
            for(let vihollinen of viholliset){
                pelaaja.hyokkaa(vihollinen);
            }
            break;
        case "escape":
            pelaaja.pause();
        break;
    }
});
window.addEventListener("keyup", (event) => {
    switch (event.key.toLowerCase()) {
        case "d":
            liikenappaimet.d.pohjassa = false;
            break;
        case "a":
            liikenappaimet.a.pohjassa = false;
            break;
        case "w":
            liikenappaimet.w.pohjassa = false;
            break;
        case "s":
            liikenappaimet.s.pohjassa = false;
            break;
    }
});