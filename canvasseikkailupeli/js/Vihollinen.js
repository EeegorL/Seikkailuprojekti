"use strict";


class Vihollinen extends Hahmo{
    constructor(koord, kiihtyvyys, vari,vari2,elossa,hp,id){
        super(koord, kiihtyvyys, vari,vari2,elossa,hp,id);//ottaa käyttöön parent-classin
    }
    
    async paivitaVihollinen(id) {
        this.liikehdinta();
        super.paivita();
        const optiot={
            method:'GET',
            headers:{'Content-Type':'application/json'},
            id:1
        };
        try{
            let tulos = await fetch(`http://localhost:3000/vihollinen/${id}`,optiot).then(tulos => tulos.json());
            k.save();
            k.fillStyle="red";
            k.strokeText(tulos,500,200); //pitäis kertoo vihollisen tietoja
            k.fillRect(200,200,200,200);

            
        }
        catch(err){
            console.log(err);
        }

    }
    
    
};