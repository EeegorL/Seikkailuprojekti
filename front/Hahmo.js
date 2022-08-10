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
            pelaaja.ase.position.y + pelaaja.ase.height >= vihollinen.koord.y &&
            pelaaja.ase.position.y <= vihollinen.koord.y + vihollinen.korkeus &&
            pelaaja.hyokkaamassa
        ) {
            console.log(`
            ase pos x: ${pelaaja.ase.position.x} 
            ase pos y: ${pelaaja.ase.position.y}
            `)
            console.log("Pelaajan osuma!");
            pelaaja.hyokkaamassa = false;
        }
        else if(pelaaja.menosuunta=="vasen"&&
            pelaaja.ase.position.x - pelaaja.ase.width <= vihollinen.koord.x &&
            pelaaja.ase.position.x >= vihollinen.koord.x - vihollinen.leveys &&
            pelaaja.ase.position.y + pelaaja.ase.height >= vihollinen.koord.y &&
            pelaaja.ase.position.y <= vihollinen.koord.y + vihollinen.korkeus &&
            pelaaja.hyokkaamassa
        ) {
            console.log(`
            ase pos x: ${pelaaja.ase.position.x} 
            ase pos y: ${pelaaja.ase.position.y}
            `)
            console.log("Pelaajan osuma!");
            pelaaja.hyokkaamassa = false;
        }
        if(this.menosuunta=="vasen"){
            k.fillRect(this.ase.position.x-130, this.ase.position.y, this.ase.width=150, this.ase.height=10);
        }
        else if(this.menosuunta=="oikea"){
            k.fillRect(this.ase.position.x+20, this.ase.position.y, this.ase.width=150, this.ase.height=10);
        }
        else if(this.menosuunta=="ylos"){
            k.fillRect(this.ase.position.x+20, this.ase.position.y-100, this.ase.width=10, this.ase.height=150);
        }
        else if(this.menosuunta=="alas"){
            k.fillRect(this.ase.position.x+20, this.ase.position.y+50, this.ase.width=10, this.ase.height=150);
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

module.exports={Hahmo};