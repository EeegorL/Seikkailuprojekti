/* kayttoliittyma.js  IH 2017/2022*/

(function () {
      
    let lansi;
    let ita;
    let pohjoinen;
    let etela;
    let valinnat;
    let pisteAlue;
    let hpAlue;
    let peli;
    let tekijat;
    let huoneentaulu;
    let uusi;
    let huone;
    
    document.addEventListener('DOMContentLoaded', alustaPeli);
    
    function alustaPeli(){
        
        huoneentaulu = document.getElementById('huoneentaulu');
        lansi = document.getElementById('lansi');
        ita = document.getElementById('ita');
        pohjoinen = document.getElementById('pohjoinen');
        etela = document.getElementById('etela');
        valinnat=document.getElementById('valinnat');
        pisteAlue=document.getElementById('pisteet');
        hpAlue=document.getElementById('hp');
        tekijat=document.getElementById('tekijat');
        uusi = document.getElementById("uusiPeli");
        huone = document.getElementById('huone');
        uusiPeli();
        
        uusi.addEventListener('click', function() {
            location.reload();
        });
 
    }
    console.log("testii");
    function uusiPeli() {
        peli=new Peli();
        pohjoinen.addEventListener('click', ()=>{suoritaToiminto(Peli.SUUNTA.POHJOINEN);});
        ita.addEventListener('click', ()=>{suoritaToiminto(Peli.SUUNTA.ITA);});
        etela.addEventListener('click', ()=>{suoritaToiminto(Peli.SUUNTA.ETELA);});
        lansi.addEventListener('click', ()=>{suoritaToiminto(Peli.SUUNTA.LANSI);});
        pohjoinen.textContent=TASO.tekstit.pohjoinen;
        ita.textContent=TASO.tekstit.ita;
        etela.textContent=TASO.tekstit.etela;
        lansi.textContent=TASO.tekstit.lansi;
        document.getElementById("pisteotsikko").textContent=TASO.tekstit.pisteotsikko;
        document.getElementById("hpotsikko").textContent=TASO.tekstit.hpotsikko;
            
        naytaPisteet();
        naytaHp();
        tekijat.textContent=peli.tekijat;
        
        paivitaHuoneenTiedot(peli.haeHuoneenTiedot());
        uusi.textContent=TASO.tekstit.uusiNappi;
        uusi.setAttribute('class','eivalittavissa');
    }
    
    function suoritaToiminto(suunta) {
        if(peli.peliLoppu) {
           viesti(peli.haeHuoneenTiedot()); 
           valinnat.innerHTML="";
           uusi.removeAttribute('class');
           return;
        }
        try{
            peli.siirryHuoneeseen(suunta);
            paivitaHuoneenTiedot(peli.haeHuoneenTiedot());
            naytaPisteet();
            naytaHp();
        }
        catch(e) {       
            viesti(e.message);            
        };   
    };

    function paivitaHuoneenTiedot(teksti) {
        try{
            huoneentaulu.textContent = teksti;
            huone.setAttribute('class', 'huone'+peli.aktiivinenHuone.huoneNro);
            if(!peli.peliLoppu) {
                paivitaNapit(lansi, peli.lansi);
                paivitaNapit(ita, peli.ita);
                paivitaNapit(pohjoinen,peli.pohjoinen);
                paivitaNapit(etela, peli.etela);
                paivitaLista();
            }
            else {
                napitPois();
                valinnat.innerHTML='';
                uusi.removeAttribute('class');
            }
        }
        catch(e) {       
            viesti(e.message);            
        };
    }
    
    function luoLista(teksti,toiminto){
        valinnat.innerHTML='';       
        let h2=document.createElement('button');
        h2.textContent=teksti;
        h2.onclick=function() {
                let teksti=toiminto();
                naytaPisteet();
                naytaHp();
                paivitaHuoneenTiedot(teksti);
            } 
        valinnat.appendChild(h2);   
    }
    
    function kamppaile() {
        let teksti=peli.kamppaile();
        if(peli.peliLoppu) {
            if(peli.pelaajanTappio) {
                teksti=peli.tappioteksti;
            }
            else {
                teksti=peli.voittoTeksti;
            }
        }
        return teksti;
    }
    
    function tarkastaAvain(){
        return peli.tarkastaAvain();
    }
    
    function tarkastaEsine() {
        let teksti=peli.tarkastaEsine();
        if(peli.peliLoppu) {
            if(peli.pelaajanTappio) {
                teksti=peli.tappioteksti;
            }
            else {
                teksti=peli.voittoTeksti+' '+teksti;;
            }
        }
        return teksti;
    }
    
    function paivitaLista() {
        valinnat.innerHTML='';
        if(peli.huoneessaOnVastustaja){
            luoLista(peli.vastustajaTeksti, kamppaile);
            napitPois();
            switch(peli.edellinenSuunta) {
                case Peli.SUUNTA.POHJOINEN:
                pohjoinen.removeAttribute('class');
                break;
            case Peli.SUUNTA.ITA:
                 ita.removeAttribute('class');
                break;
            case Peli.SUUNTA.ETELA:
                 etela.removeAttribute('class');
                break;
            case Peli.SUUNTA.LANSI:
                 lansi.removeAttribute('class');
            }
        }
        else if(peli.huoneessaOnAvain){
            luoLista(peli.avainTeksti,tarkastaAvain);
        }
        else if(peli.huoneessaOnEsine){
            luoLista(peli.esineTeksti,tarkastaEsine);
        }
    }
    
    function naytaPisteet() {
        pisteAlue.textContent=peli.pelaaja.pisteet;
    }
    function naytaHp() {
        hpAlue.textContent=peli.pelaaja.hp; 
    }
    function napitPois(){
        pohjoinen.setAttribute('class','eivalittavissa');
        ita.setAttribute('class','eivalittavissa');
        etela.setAttribute('class','eivalittavissa');
        lansi.setAttribute('class','eivalittavissa');
    }
    
    function viesti(teksti) {
        napitPois();
        huoneentaulu.textContent=teksti;       
    }

    function paivitaNapit(nappi, ovi) {
        if (ovi === null) {
            nappi.setAttribute('class','eivalittavissa');
        }
        else if(ovi.avain===null){
            nappi.setAttribute('class','valittavissa');
        }
        else if( peli.onAvainOveen(ovi)){
            nappi.setAttribute('class','valittavissa');
            huoneentaulu.textContent=huoneentaulu.textContent+' '+peli.haeAvainSelitys(ovi.avain);
        }
        else {
            nappi.setAttribute('class','eivalittavissa');
        }
    }

})();