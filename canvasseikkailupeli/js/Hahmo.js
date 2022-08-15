class Hahmo {
    constructor({ koord, kiihtyvyys, vari,vari2,elossa,menosuunta,hp}) {
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
        this.menosuunta;
        this.hp=hp;
    }

    dmgIndicator(){//testaamista varten & vahingon tunnistaminen
        let indicator=document.getElementById("dmgIndicator");
        let ogVarit=["red","cyan"];

        if(vihollinen.elossa==true){
            vihollinen.hp-=10;
            indicator.style.color="red";
            vihollinen.vari="red";
            vihollinen.vari2="red";

            setTimeout(()=>{
                indicator.style.color="black",700
                vihollinen.vari=ogVarit[0];
                vihollinen.vari2=ogVarit[1];

            },350);
            console.log(vihollinen.hp);
        }




        if(vihollinen.hp<=0){
            vihollinen.elossa=false;
        }

    }
    liikehdinta() { //liikkuminen ja hyökkääminen
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
            pelaaja.ase.position.y+pelaaja.korkeus*0.4+ pelaaja.ase.height >= vihollinen.koord.y &&
            pelaaja.ase.position.y+pelaaja.korkeus*0.4 <= vihollinen.koord.y + vihollinen.korkeus &&
            pelaaja.hyokkaamassa
        ) {
            pelaaja.dmgIndicator();
            pelaaja.hyokkaamassa = false;
        }
        else if(pelaaja.menosuunta=="vasen"&&
            pelaaja.ase.position.x - pelaaja.ase.width <= vihollinen.koord.x &&
            pelaaja.ase.position.x >= vihollinen.koord.x - vihollinen.leveys &&
            pelaaja.ase.position.y+pelaaja.korkeus*0.4 + pelaaja.ase.height >= vihollinen.koord.y &&
            pelaaja.ase.position.y+pelaaja.korkeus*0.4 <= vihollinen.koord.y + vihollinen.korkeus &&
            pelaaja.hyokkaamassa
        ) {
            pelaaja.dmgIndicator();
            pelaaja.hyokkaamassa = false;
        }
        else if(pelaaja.menosuunta=="ylos"&&
        pelaaja.ase.position.x+pelaaja.leveys*0.667 + pelaaja.ase.width >= vihollinen.koord.x &&
        pelaaja.ase.position.x+pelaaja.leveys*0.667 <= vihollinen.koord.x + vihollinen.leveys &&
        pelaaja.ase.position.y-pelaaja.korkeus+pelaaja.ase.height >= vihollinen.koord.y &&
        pelaaja.ase.position.y-pelaaja.korkeus<= vihollinen.koord.y + vihollinen.korkeus &&
        pelaaja.hyokkaamassa
        ) {
           pelaaja.dmgIndicator();
           pelaaja.hyokkaamassa = false;
        }
        else if(pelaaja.menosuunta=="alas"&&
        pelaaja.ase.position.x+pelaaja.leveys*0.3 + pelaaja.ase.width >= vihollinen.koord.x &&
        pelaaja.ase.position.x+pelaaja.leveys*0.5 <= vihollinen.koord.x + vihollinen.leveys &&
        pelaaja.ase.position.y+pelaaja.ase.height >= vihollinen.koord.y &&
        pelaaja.ase.position.y<= vihollinen.koord.y + vihollinen.korkeus &&
        pelaaja.hyokkaamassa
        ) {
           pelaaja.dmgIndicator();
           pelaaja.hyokkaamassa = false;
        }
        //aseen osoitussuunta
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