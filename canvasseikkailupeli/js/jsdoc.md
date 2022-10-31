# JS-classejen dokumentaatio
-  [Hahmo](#hahmo)
-  [Pelaaja](#pelaaja)
-  [Vihollinen](#vihollinen)
-  [Seina](#seina)
-  [Ovi](#ovi)
-  [Huonekalu](#huonekalu)


# Hahmo

### Hahmo on kaikkien spritejen pohjaluokka.

## Siinä on contructorina
```js
     constructor({ koord, kiihtyvyys, vari,vari2,tajuissaan,hp,id,nimi}) {
        this.koord = koord;
        this.kiihtyvyys = kiihtyvyys;
        this.korkeus = 75;
        this.leveys = 50;
        this.viimeisin;
        this.vari1 = vari;
        this.vari2 = vari2;
        this.ase = {
            position: this.koord,
            width: 150,
            height: 10
        }
        this.hyokkaamassa;
        this.tajuissaan=tajuissaan;
        this.menosuunta;
        this.hp=hp;
        this.id=id;
        this.nimi=nimi;
    }
```
jossa
- **koord**: Spriten koordinaatit, ja syötettävä koord on ne koordinaatit, johon vihollinen spawnaa. Muotoa {x: int, y: int}
- **kiihtyvyys**: Spriten kiihtyvyys neljään ilmansuuntaan. muotoa {x: int, y: int}, jossa vasemmalle tai ylös liikkuminen hoituu muuttamalla arvo negatiiviseksi
- **korkeus** sekä leveys: hahmon koko (ei toimi, käytetään oletuskokoa 50px*70px)
- **viimeisin**: muuttuja, johon säilötään pelaajan viimeisin painettu näppäin. mahdollistaa sulavan liikkumisen, ettei hahmo jää paikalleen jos yrittää mennä esim. samaa aikaa vasemmalle ja oikealle
- **vari1 & vari2**: Spriten värit, jossa vari1 on pääväri ja vari2 toissijainen väri. Esimerkiksi keho on väriltään vari1 ja ase-indikaattori vari2
- **ase**: Spriten, tässä tilanteessa vain pelaajan, asemuoto. Oletuksellisesti muotoa {position: this.koord, width: 150, height: 10}, mutta vaihtelee aina riippuen pelaajan kulkusuunnasta
- **hyokkaamassa**: muuttuja joka kertoo, onko Sprite (käytössä vain pelaajalla) sillä hetkellä hyökkäämässä. muotoa boolean
- **tajuissaan**: kertoo, onko sprite tajuissaan (ennen nimellä elossa). muotoa boolean
- **menosuunta**: muuttuja, joka kertoo mihin suuntaan Sprite on liikkumassa. muotoa string
- **hp**: Spriten elämäpisteet. muotoa int. oletuksellisesti 100, ja laskiessa nollaan (0), kyseinen Sprite menee tajuttomaksi (tai kuolee, ihan miten haluaa sanoa)
- **id**: Spriten id. muotoa int
- **nimi**: Spriten nimi. muotoa string, mutta voi olla null


### Metodit:
Hahmo-luokalla on yksi metodi, paivita:
```js
paivita() {
        k.beginPath(); // aloittaa piirtämisen
        this.liikehdinta(10); // liikkumisfunktio, johon syötetään parametrina nopeus

        k.font = "Bold 40px Brush Script MT"; // Spriten hp-fontti
        k.strokeStyle=this.vari2; // Spriten hp-väri
        k.strokeText(Math.round(this.hp), this.koord.x+3.5,this.koord.y); // piirtää Spriten hp:n
        k.font = "20px Monospace"; // Spriten nimifontti
        k.strokeStyle=this.vari2; // Spriten nimen väri
        k.strokeText(this.nimi||"", this.koord.x-this.nimi?.length*3,this.koord.y-33); // piirtää Spriten nimen jos sellainen on
        this.koord.y += this.kiihtyvyys.y; // liikkuu kiihtyvyysmuuttujien mukaan
        this.koord.x += this.kiihtyvyys.x;
        this.kiihtyvyys.y=0; // alustaa kiihtyvyydet nollaan ennen jokaista seuraavaa liikettä
        this.kiihtyvyys.x=0;
    }
```

# Pelaaja

### <a name="pelaaja"></a> Pelaaja on pelaajan spriteä käsittelevä luokka, sekä Hahmo-luokan "lapsiluokka"
Siinä on constructorina
```js
constructor(koord, kiihtyvyys, vari,vari2,tajuissaan,hp,dmgRed,dmg){
        super(koord, kiihtyvyys, vari,vari2,tajuissaan,hp,dmg);
        this.a = new Image(this.leveys,this.korkeus);
        this.a.src="../kuvat/hahmot/jari.png";
        this.huonenro;
        this.dmgRed=dmgRed;
        this.dmgRed=0;
        this.dmg=dmg;
    }
```
jossa:
- super() on [Hahmo-luokan constructor](#hahmo)
- a: testimuuttuja pelaajan spriten kuvalle, sekä alempana sen src, jossa kuvan linkki
- huonenro: sen huoneen, jossa pelaaja sillä hetkellä on, id. muotoa int
- dmgRed: damage reduction. vähentää pelaajan ottamaa vahinkoa tietyllä määrällä. oletuksena 0. voi kasvaa esim. pelaajan löydettyä jonkilaista varustusta
- dmg: pelaajan tekemä vahinko (ei toimi)

### Metodit
Pelaaja-luokalla on kuusi (6) metodia:
- [avaaOvi](#avaaovi)
- [hyokkaa](#hyokkaa)
- [dmgIndicator](#dmgindicator)
- [liikehdinta](#liikehdinta)
- [tarkistaTormaaminen](#tarkistatormaaminen)
- [pause](#pause)

### avaaOvi
avaaOvi käy läpi olemassa olevat ovet ja tekee pelaajalle liikkumista varten huonemuuttujat, ja siirtää pelaajaa huoneiden välillä käyttäen Ovi-luokan metodeja.
funktio ottaa parametrina ovet-taulukon, joka sisältää kaikki huoneen ovi-oliot
```js
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
```

### hyokkaa
suorittaa pelaajan pelaajan menosuunnasta riippuvan hyokkäämistoiminnon tämän painaessa enteriä (Enter). ottaa parametrina hyokkaamiskohteen

```js
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
```

### dmgIndicator
hyokkaa-metodin "alametodi", joka hoitaa itse hyokkayksen ja vahingon tekemisen, sekä muuttaa vihollisen väriä ilmaistaakseen tämän vahingonoton. ottaa parametrina hyökkäämisen kohteen

```js
    dmgIndicator(kohde){//vahingon tunnistaminen
        let ogVarit=[kohde.vari1,kohde.vari2];

        if(kohde.tajuissaan==true){ //värin muuttaminen vahingon merkitsemiseksi
            kohde.hp-=5;
            kohde.vari="red";
            kohde.vari2="red";

            setTimeout(()=>{
                kohde.vari=ogVarit[0];
                kohde.vari2=ogVarit[1];

            },350);
        }
    }
```

### liikehdinta
liikehdinta hoitaa pelaajan liikkumisen, ottaen parametriksi liikkumisnopeuden. metodi myös tarkistaa pelaajan tajunnanmenetyksen/kuoleman, ja lopettaa liikkumisen sekä pelin

```js
liikehdinta(nopeus) { //liikkuminen
        if(this.hp<=0){ //pelaajan kuoleman tarkistaminen. jos pelaaja kuolee, peli peittyy mustalla verholla
            this.tajuissaan=false;
            kaynnissa=false;
            console.log("Peli loppui");
            document.getElementById("verho").classList.remove("hiddenClass");

        }
        
    k.drawImage(this.a,this.koord.x,this.koord.y); // piirtää hahmon

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
```

### tarkistaTormaaminen
nimensä mukaisesti tarkistaa törmäämisen. ottaa parametreina seinät ja huonekalut, ja estää niiden läpi kulkemisen

```js
tarkistaTormaaminen(seinat,huonekalut){
        //seinät
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

            //huonekalut
            for(let huonekalu of huonekalut){
                if(!huonekalu.koriste){

                            if(this.koord.x + this.leveys > huonekalu.koord.x &&
                               this.koord.x<huonekalu.koord.x+huonekalu.koko.leveys &&
                               this.koord.y+this.korkeus > huonekalu.koord.y &&
                               this.koord.y < huonekalu.koord.y + huonekalu.koko.korkeus){
                               
                                switch(this.menosuunta){
                                case "ylos":
                                    this.koord.y+=1;
                                    break;
                                case "alas":
                                    this.koord.y-=1;
                                    break;
                                case "oikea":
                                    this.koord.x-=1;
                                    break;
                                case "vasen":
                                    this.koord.x+=1;
                                    break;
                               }
                        }
                }
            }
    }
```

### pause
laittaa pelin paussille esc-nappia (Escape) painaessa, ja laittaa takaisin päälle uudelleen painalluksesta kutsumalla pääohjelman moottorifunktiota. pause hoituu pääohjelman pauseVar-muuttujan arvoa muuttamalla. pause tuo myös esiin valikon, jossa on tietoa
```js
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
```

### Sekalaista

luokassa on myös pelaajan toimintaan tarvittuja näppäimiä ja kuuntelijoita:

```js

const liikenappaimet = { // liikkumiseen käytetyt näppäimet
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
        case "d": // oikealle liikkuminen
            liikenappaimet.d.pohjassa = true;
            pelaaja.viimeisin = "d";
            break;
        case "a": // vasemmalle liikkuminen
            liikenappaimet.a.pohjassa = true;
            pelaaja.viimeisin = "a";
            break;
        case "w": //ylöspäin liikkuminen
            liikenappaimet.w.pohjassa = true;
            pelaaja.viimeisin = "w";
            break;
        case "s": // alaspäin liikkuminen
            liikenappaimet.s.pohjassa = true;
            pelaaja.viimeisin = "s";
            break;
        case "enter": // hyökkääminen
            for(let vihollinen of viholliset){
                pelaaja.hyokkaa(vihollinen);
            }
            break;
        case "escape": // pelin tilapäisesti pysäyttäminen
            pelaaja.pause();
        break;
    }
});

window.addEventListener("keyup", (event) => { // kuuntelee liikenäppäinten irti päästämistä
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
```





# Vihollinen
### <a name="vihollinen"></a> Vihollinen on vihollisten spriteä käsittelevä luokka, sekä Hahmo-luokan "lapsiluokka"
Siinä on constructorina
```js
    constructor(koord, kiihtyvyys, vari1, vari2, tajuissaan, hp, id, dmg, nimi, nopeus, kuvasrc) {
        super(koord, kiihtyvyys, vari1, vari2, tajuissaan, hp, id, nimi);//ottaa käyttöön parent-classin
        this.dmg = dmg;
        this.nopeus = nopeus;
        this.kuva = new Image(40, 70);
        this.kuva.src = kuvasrc || "../kuvat/hahmot/hamsteri.png";
        this.menosuunta;
    }
```
jossa:
- **super** ottaa käyttöön Hahmo-luokan funktiot
- **dmg** asettaa vihollisen tekemän vahingon
- **nopeus** asettaa vihollisen liikkumisnopeuden
- **kuva ja kuva.src** on vihollisen spriten kuva, eli miltä vihollinen näyttää
- **menosuunta** näyttää, mihin suuntaan vihollinen liikkuu/oli äsken liikkunut

# Seina

# Ovi

# Huonekalu