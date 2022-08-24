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
            
    
};