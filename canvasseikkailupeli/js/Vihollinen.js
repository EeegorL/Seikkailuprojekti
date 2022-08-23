"use strict";


class Vihollinen extends Hahmo{
    constructor(koord, kiihtyvyys, vari,vari2,elossa,hp){
        super(koord, kiihtyvyys, vari,vari2,elossa,hp);//ottaa käyttöön parent-classin
    }
    
    async paivitaVihollinen(id) {
        super.paivita();
        const optiot={
            method:'GET',
            headers:{'Content-Type':'application/json'},
            id:1
        };
        try{
            let tulos = await fetch(`http://localhost:3000/vihollinen/${id}`,optiot).then(tulos => tulos.json());
            let teksti= tulos[0]?.nimi || "Tuntematon";
            return teksti;
        }
        catch(err){
            console.log(err);
        }

    }
    
};