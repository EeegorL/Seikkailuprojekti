"use strict";


class NPC extends Hahmo {
    constructor(id,koord,leveys,korkeus) {
        super(koord, "brown", "brown", true, null, id, "");//ottaa käyttöön parent-classin
        this.nopeus = 0;
        this.kuva = new Image();
        this.kuva.src = "../kuvat/hahmot/irmeli.png";
        this.menosuuntaX;
        this.menosuuntaY;
        this.liikkumassaX;
        this.liikkumassaY;
        this.kiihtyvyys={x:0,y:0};
        this.leveys=leveys;
        this.korkeus=korkeus;
    }


    async paivitaNPC() {
        super.paivita();
    }


    liikehdinta() { //liikkuminen ja sitä vastaava piirtäminen
        this.tarkistaTormaaminen();
        k.beginPath();
        k.fillStyle = "khaki";
        k.drawImage(this.kuva, this.koord.x, this.koord.y,this.leveys,this.korkeus);
        k.closePath();
        setTimeout(() => {//respawn koska miks ei
            suunnanVaihto=true;
        }, 100);
    }
    vaihdaSuunta(){
        let akseli=Math.round(Math.random())==1?"x":"y";

        if(akseli=="x"){
            this.kiihtyvyys.x=0;
            let liikkuuko=Math.round(Math.random())==1?true:false;
            if(liikkuuko){
                let suunta=Math.round(Math.random())==1?"vasen":"oikea";
                if(suunta=="vasen"){
                    this.kiihtyvyys.x=this.nopeus;
                }
                else{
                    this.kiihtyvyys.x=-this.nopeus;
                }
            }
            else{
                this.kiihtyvyys.x=0;
            }
        }
        else if(akseli=="y"){
            this.kiihtyvyys.x=0;
            let liikkuuko=Math.round(Math.random())==1?true:false;
            if(liikkuuko){
                let suunta=Math.round(Math.random())==1?"ylos":"alas";
                if(suunta=="ylos"){
                    this.kiihtyvyys.y=-this.nopeus;
                }
                else{
                    this.kiihtyvyys.y=this.nopeus;
                }
            }
            else{
                this.kiihtyvyys.y=0;
            }

            
        }
    }
    async tarkistaTormaaminen(seinat, huonekalut) { //nimensä mukaan tarkistaa seinät sekä huonekalut ja estää niiden läpi kulkemisen
        //huoneiden seinät
        if (seinat) {
            if (this.menosuunta == "oikea") {
                if (this.koord.x + this.leveys >= seinat[2].koord.x) {
                    this.koord.x = seinat[2].koord.x - this.leveys;
                }
            }
            if (this.menosuunta == "vasen") {
                if (this.koord.x - 10 <= seinat[3].koord.x) {
                    this.koord.x = seinat[3].koord.x + this.leveys - 35;
                }
            }
            if (this.menosuunta == "alas") {
                if (this.koord.y + this.korkeus >= seinat[0].koord.y) {
                    this.koord.y = seinat[0].koord.y - this.korkeus;
                }
            }
            if (this.menosuunta == "ylos") {
                if (this.koord.y - this.korkeus + 70 <= seinat[1].koord.y) {
                    this.koord.y = seinat[1].koord.y + this.korkeus - 65;
                }
            }
        }
        // huoneiden huonekalut
        if (huonekalut) {
            for (let huonekalu of huonekalut) {
                if (!huonekalu.koriste) {
                        const onTormannyt=()=>{
                            if (this.koord.x + this.leveys > huonekalu.koord.x-5 &&
                                this.koord.x < huonekalu.koord.x + huonekalu.koko.leveys+5 &&
                                this.koord.y + this.korkeus > huonekalu.koord.y-5 &&
                                this.koord.y < huonekalu.koord.y + huonekalu.koko.korkeus+5) {
                            return true
                            }
                            else return false;
                        };
                        const onTormannytX=()=>{
                            if (this.koord.x + this.leveys > huonekalu.koord.x-5 &&
                                this.koord.x < huonekalu.koord.x + huonekalu.koko.leveys+5) {
                            return true
                            }
                            else return false;
                        };
                        const onTormannytY=()=>{
                            if (this.koord.y + this.korkeus > huonekalu.koord.y-5 &&
                                this.koord.y < huonekalu.koord.y + huonekalu.koko.korkeus+5) {
                            return true
                            }
                            else return false;
                        };
                        

                    if(this.menosuuntaX=="oikea"){
                        if(onTormannyt() && onTormannytX()){
                            this.koord.x-=this.nopeus;
                        }
                    }
                    else if(this.menosuuntaX=="vasen"){
                        if(onTormannyt()&&onTormannytX()){
                            this.koord.x+=this.nopeus;
                        }
                    }
                    if(this.menosuuntaY=="ylos"){
                        if(onTormannyt()&&onTormannytY()){
                            this.koord.y+=this.nopeus+1;
                            if(this.menosuuntaX=="oikea"){
                                this.koord.x+=this.nopeus;
                            }
                            else {
                                this.menosuuntaX="vasen";
                                this.koord.x-=this.nopeus;
                            }
                        }
                    }
                    else if(this.menosuuntaY=="alas"){
                        if(onTormannyt()&&onTormannytY()){
                            this.koord.y-=this.nopeus+1;
                            if(this.menosuuntaX=="oikea"){
                                this.koord.x+=this.nopeus;
                            }
                            else {
                                this.menosuuntaX="vasen";
                                this.koord.x-=this.nopeus;
                            }
                        }
                    }
                    
                }
            }
        }

    }

};

