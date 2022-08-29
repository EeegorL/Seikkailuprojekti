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
        //         .then(tulos => tulos.json()); //saattaa aiheuttaa ylikuormitusvirheitä ja hidastaa

        //         document.getElementById("vihNimi").innerHTML="Vihollisen nimi: "+tulos[0].nimi;
        //         document.getElementById("vihId").innerHTML="Vihollisen id: "+tulos[0].id;
        //         document.getElementById("vihHp").innerHTML="Vihollisen hp (ei toimi): "+tulos[0].hp;
        //         document.getElementById("vihDmg").innerHTML="Vihollisen vahinko per lyönti: "+tulos[0].dmg;
        //         document.getElementById("vihHuone").innerHTML="Vihollisen huone: "+tulos[0].huone;
        // k.fillText(200,200,200,200);


        }
        liikehdinta() { //liikkuminen
            this.checkColl();
            k.fillStyle = this.vari;
            k.fillRect(this.koord.x, this.koord.y, this.leveys, this.korkeus);

        }
        checkColl(){
            if(this.koord.y>=seinat[0]?.koord.y-90){//lattia
                this.koord.y=kanvaasi.height-90;
            }
            if(this.koord.y<=seinat[1]?.koord.y+30){//kattos
                this.koord.y=30;
            }
            if(this.koord.x>=seinat[2]?.koord.x-60){//oikea seinä
                this.koord.x=kanvaasi.width-75;
            }
            if(this.koord.x<=seinat[3]?.koord.x+15){//oikea seinä
                this.koord.x=15;
            }
        }
    
};