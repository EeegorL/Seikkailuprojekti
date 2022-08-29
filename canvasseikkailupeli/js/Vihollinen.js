"use strict";


class Vihollinen extends Hahmo{
    constructor(koord, kiihtyvyys, vari,vari2,elossa,hp,id){
        super(koord, kiihtyvyys, vari,vari2,elossa,hp,id);//ottaa käyttöön parent-classin
    this.nimi;
    }
    
    
    async paivitaVihollinen(id) {
        super.paivita();

        // const optiot={
        //     method:'GET',
        //     headers:{'Content-Type':'application/json'},
        // };

        //     let tulos
        //         = await fetch(`http://localhost:3000/vihollinen/${id}`,optiot)
        //         .then(tulos => tulos.json());

        //         document.getElementById("vihNimi").innerHTML="Vihollisen nimi: "+tulos[0].nimi;
        //         document.getElementById("vihId").innerHTML="Vihollisen id: "+tulos[0].id;
        //         document.getElementById("vihHp").innerHTML="Vihollisen hp: "+tulos[0].hp;
        //         document.getElementById("vihDmg").innerHTML="Vihollisen vahinko per lyönti: "+tulos[0].dmg;
        //         document.getElementById("vihHuone").innerHTML="Vihollisen huone: "+tulos[0].huone;
        // k.fillText(200,200,200,200);


        }
        liikehdinta() { //liikkuminen
            k.fillStyle = this.vari;
            k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);
    
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
            
    
};