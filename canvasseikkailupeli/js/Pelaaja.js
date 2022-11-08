"use strict";


class Pelaaja extends Hahmo{
    
    constructor(id,koord, kiihtyvyys, vari1,vari2,tajuissaan,hp,dmg,nimi){
        super(koord, vari1,vari2, tajuissaan, hp,id,nimi);//ottaa käyttöön parent-classin
        this.kuva = new Image(this.leveys,this.korkeus);
        this.kuva.src="../kuvat/hahmot/jari.png";
        this.huonenro;
        this.dmgRed=0;
        this.dmgRed=0;
        this.dmg=dmg;
        this.kiihtyvyys=kiihtyvyys;
        this.raha=0;
    }
    avaaOvi(ovet){ //pelaajan ovien kautta liikkuminen
        let e=null;
        let p=null;
        let i=null;
        let l=null;
        for(let ovi of ovet){//katsoo, mitkä ovet ovat olemassa huoneessa
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
            
            if(e!=null){
                if(this.koord.x<=e.koord.x+e.leveys &&
                    this.koord.x+this.leveys>=e.koord.x &&
                    this.koord.y>=e.koord.y-e.korkeus+5){
                        e.siirra(e.ilmansuunta);
                     }
            }
            break;
            
            case "ylos":
                if(p!=null){
                    if(this.koord.x<=p.koord.x+p.leveys &&
                        this.koord.x+this.leveys>=p.koord.x &&
                        this.koord.y<=10){
                            p.siirra(p.ilmansuunta);
                         }
                }

                break;
        
            case "vasen":
                if(l!=null){
                    if(this.koord.x<=l.koord.x+30 &&
                        this.koord.y>=l.koord.y-10 &&
                        this.koord.y<=l.koord.y+l.korkeus
                    ){
                        l.siirra(l.ilmansuunta);
                         }
                }

            break;
            
            case "oikea":
                if(i!=null){
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
    hyokkaa(kohde) {
        this.hyokkaamassa = true;
        //tarkistaa, osuuko pelaajan ase viholliseen, ja näin ollen kutsuu dmgIndicatoria, joka tekee vahinkoa
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
        this.ase.position.x >= kohde.koord.x + kohde.leveys &&
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
        if(kohde.tajuissaan){ //värin muuttaminen vahingon merkitsemiseksi
            kohde.hp-=this.dmg;
            kohde.vari1="red";
            kohde.vari2="red";
            setTimeout(()=>{
                kohde.vari1=kohde.alkPerVarit[1];
                kohde.vari2=kohde.alkPerVarit[0];
            },350);
        }
    }
    liikehdinta(nopeus) { //liikkuminen
        if(this.hp<=0){ //pelaajan kuoleman tarkistaminen. jos pelaaja kuolee, peli peittyy mustalla verholla
            this.tajuissaan=false;
            kaynnissa=false;
            console.log("Peli loppui");
            document.getElementById("verho").classList.remove("hiddenClass");

        }

        k.beginPath();
    k.drawImage(this.kuva,this.koord.x,this.koord.y);
        k.closePath();
        k.fillStyle = this.vari2;
        pelaaja.kiihtyvyys.x = 0;//asettaa liikehdinnän nollaan ennen jokaista liikettä

        //tarkistaa viimeisimpänä painetun napin ja toimii sen mukaan
        if (liikenappaimet.a.pohjassa && pelaaja.viimeisin === "a") {
            pelaaja.kiihtyvyys.x = -nopeus;
            pelaaja.menosuunta="vasen";
        }else if (liikenappaimet.d.pohjassa && pelaaja.viimeisin === "d") {
            pelaaja.kiihtyvyys.x = nopeus;
            pelaaja.menosuunta="oikea";
        }else if (liikenappaimet.w.pohjassa && pelaaja.viimeisin === "w") {
            pelaaja.kiihtyvyys.y = -nopeus;
            pelaaja.menosuunta="ylos";
        }else if (liikenappaimet.s.pohjassa && pelaaja.viimeisin === "s") {
            pelaaja.kiihtyvyys.y = nopeus;
            pelaaja.menosuunta="alas";
        }       
        //aseen osoitussuunta riippuen liikesuunnasta
        // konteksti.globalAlpha asettaa elementin läpinäkyväksi, niin hahmon ase ei vaikuta valtavalta nuijalta
        k.globalAlpha=0.2;
        if(this.menosuunta=="vasen"){
            k.fillRect(this.ase.position.x-50, this.ase.position.y+30, this.ase.width=100, this.ase.height=10);
        }
        else if(this.menosuunta=="oikea"){
            k.fillRect(this.ase.position.x, this.ase.position.y+30, this.ase.width=100, this.ase.height=10);
        }
        else if(this.menosuunta=="ylos"){
            k.fillRect(this.ase.position.x+20, this.ase.position.y-75, this.ase.width=10, this.ase.height=100);
        }
        else if(this.menosuunta=="alas"){
            k.fillRect(this.ase.position.x+20, this.ase.position.y, this.ase.width=10, this.ase.height=100);
        }
        k.globalAlpha=1;
//jos tän ottaa pois, nii jää kiva humalaefekti jota vois käyttää
        
    }
    tarkistaTormaaminen(seinat,huonekalut){ //nimensä mukaan tarkistaa seinät sekä huonekalut ja estää niiden läpi kulkemisen
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
            for(let huonekalu of huonekalut){
                if(!huonekalu.koriste){
                            if(this.koord.x + this.leveys > huonekalu.koord.x &&
                               this.koord.x<huonekalu.koord.x+huonekalu.koko.leveys &&
                               this.koord.y+this.korkeus > huonekalu.koord.y &&
                               this.koord.y < huonekalu.koord.y + huonekalu.koko.korkeus){
                                switch(this.menosuunta){
                                case "ylos":
                                    this.koord.y+=10;
                                    break;
                                case "alas":
                                    this.koord.y-=10;
                                    break;
                                case "oikea":
                                    this.koord.x-=10;
                                    break;
                                case "vasen":
                                    this.koord.x+=10;
                                    break;
                               }
                               
                               }

                    
                }
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
    lisaaRahaa(){
        let rahanMaara=Math.round(Math.random())==1?0:Math.round(Math.random()*9+1);
        this.raha+=rahanMaara;

        if(rahanMaara>=1){
            saiJuuriRahnaa=true;
            setTimeout(()=>saiJuuriRahnaa=false,500);    
        }
    }
    rahaPlus(){
        k.fillStyle="yellow";
        k.beginPath();
        k.arc(pelaaja.koord.x+pelaaja.leveys/2.7,pelaaja.koord.y-50, 10, 0, 2 * Math.PI);
        k.fill();
        k.strokeStyle="orange";
        k.beginPath();
        k.lineWidth=2;
        k.arc(pelaaja.koord.x+pelaaja.leveys/2.7,pelaaja.koord.y-50, 10, 0, 2 * Math.PI);
        k.stroke();
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