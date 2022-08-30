"use strict";

class Ovi{
    constructor(ilmansuunta){
        this.ilmansuunta=ilmansuunta;
        this.koord={x:0,y:0};
        this.leveys=0;
        this.korkeus;
    }
    piirra(){
        k.save();
        k.fillStyle = "black";
        k.beginPath();

        switch(this.ilmansuunta){
            
            case "etela":
                this.koord={x:kanvaasi.width/2-57,y:kanvaasi.height-50};
                this.leveys=125;
                this.korkeus=50;
                k.fillRect(this.koord.x,this.koord.y,this.leveys,this.korkeus);
            break;
            
            case "pohjoinen":
                this.koord={x:kanvaasi.width/2-57, y:0};
                this.leveys=125;
                this.korkeus=50;
                k.fillRect(this.koord.x,this.koord.y,this.leveys,this.korkeus);
            break;

            case "ita":
                this.koord={x:kanvaasi.width-50, y:kanvaasi.height/2-55,};
                this.leveys=50;
                this.korkeus=125;
                k.fillRect(this.koord.x,this.koord.y,this.leveys,this.korkeus);
            break;

            case "lansi":
                this.koord={x:0, y:kanvaasi.height/2-55,};
                this.leveys=50;
                this.korkeus=125;
                k.fillRect(this.koord.x,this.koord.y,this.leveys,this.korkeus);
            break;
        }
    }
}