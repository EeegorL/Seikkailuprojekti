/* taso.js */

const TASO = {
    "tekijät": ["Kalle I. Köhi", "Ella Hikkiö"],
    "pelaajanAlkuHP": 20,
    "pelaajanMaksimiHP": 100,
    "pisterajaYhdelleHplle": 100,
    "pelinAloitushuoneenNro": 8,
    "pelinLoppuhuoneenNro": 9,
    "tekstit": {
        "pohjoinen":"Pohjoinen",
        "ita":"Itä",
        "etela":"Etelä",
        "lansi":"Länsi",
        "pisteotsikko":"Pisteet:",
        "hpotsikko":"HP:",
        "uusiNappi":"Aloita uusi peli",
        "voitto": "Onnea olet läpäissyt pelin.",
        "tappio": "Valitan hävisit pelin. Yritä uudelleen.",
        "avainSelitys": "Sinulla on ",
        "kohtaaVastustaja": "Kohtaa",
        "otaResurssi": "Ota",
        "kohtalokasVirhe": "Ohjelmassa tapahtui kohtalokas virhe. Peli loppui."
    },

    "huoneet": [
        {
            "huoneNro": 1,
            "huoneteksti": "Olet ison talon pihalla. Edessäsi pohjoissuunnassa on valtava tammiovi. Ovi ei ole lukossa.", 
            "huonehp": {
                "hp": 10, 
                "tekstit": {
                    "vaikutus": "Löysit pihalle. Saat lisää voimaa!", 
                    "loppu": "kaikki voimat käytetty"
                }, 
                "toistoLkm": 2
            },
            "pohjoinen": {"huoneeseen": 2, "avain": null},
            "ita": null,
            "etela": null,
            "lansi": null,
            "vastustaja": null,
            "avain": null,
            "esine": null
        },
        {
            "huoneNro": 2,
            "huoneteksti": "Olet isossa aulassa. Aulan länsiseinällä ja itäseinällä on ovi. Pohjoisseinällä aukeaa portaikko yläkertaan. Portaiden yläpäässä on porrastasanne.",
            "huonehp": null,
            "pohjoinen": {"huoneeseen": 7, "avain": null},
            "ita": {"huoneeseen": 4, "avain": null},
            "etela": {"huoneeseen": 1, "avain": null},
            "lansi": {"huoneeseen": 3, "avain": null},
            "vastustaja": {
                "nimi": "Robotti",
                "teksti": "TR3-sarjan vartijarobotti seisoo keskellä lattiaa. Robotin sivulokerossa on avain.",
                "voittoviesti": "Voitit vartijarobotin. Saat lisää kokemuspisteitä.",
                "tappioviesti": "Hävisit ottelun. Kuntosi sai kolauksen.",
                "pisteet": 100,
                "hp": 10,
                "voittoraja": 10
            },
            "avain": {
                "nimi": "avain",
                "numero": 1,
                "teksti": "Avain kimmeltää kultaisena.",
                "vaikutus": "Avain näyttäisi sopivan vanhaan riippulukkoon!",
                "pisteet": 150,
                "hp": 0
            },
            "esine": null         
        },
        {
            "huoneNro": 3,
            "huoneteksti": "Täällä lemahtaa! Huone on selvästi toiminut jonkinlaisena varastona. Tämä on umpikuja. Pääset ainosastaan takaisin aulaan.",
            "huonehp": null,
            "pohjoinen": null,
            "ita": {"huoneeseen": 2, "avain": null},
            "etela": null,
            "lansi": null,
            "vastustaja": null,
            "avain": null,
            "esine": {
                "nimi": "energiajuoma",
                "teksti": "Takaseinällä olevassa hyllyssä on pölyinen energiajuomapullo",
                "vaikutus": "ilmeisesti juoma oli pilaantunutta ja siitä aiheutui vatsanväänteitä",
                "pisteet": 0,
                "hp": -5
            }            
        },
        {
            "huoneNro": 4,
            "huoneteksti": "Olet pienessä sivuhuoneessa. Pohjoisseinällä on hissi yläkertaan. Eteläseinässä on sortuma. Sortuma paljastaa salahuoneen, jonne voi siirtyä seinässä olevan reiän kautta",
            "huonehp": null,
            "pohjoinen": {"huoneeseen": 5, "avain": null},
            "ita": null,
            "etela": {"huoneeseen": 6, "avain": null},
            "lansi": {"huoneeseen": 2, "avain": null},
            "vastustaja": null,
            "avain": {
                "nimi": "taskulamppu",
                "numero": 2,
                "teksti": "Lattialla on taskulamppu, jolla voit valaista tietäsi",
                "vaikutus": "Nyt voi mennä myös pimeisiin huoneisiin.",
                "pisteet": 200,
                "hp": 0
            },
            "esine": null
        },
        {
            "huoneNro": 5,
            "huoneteksti": "Olet toisessa kerroksessa. Eteläseinässä on kultaisena kiiltävä raskas hissin ovi. Länsiseinässä oleva ovi on lukittu riippulukolla.",
            "huonehp": {
                "hp": 10, 
                "tekstit": {
                    "vaikutus":"Huone on täynnä kultapölyä. Kullan näkeminen piristää kummasti.", 
                    "loppu": "Kultakin loppuu aikanaan"
                }, 
                "toistoLkm": 1
            },
            "pohjoinen": null,
            "ita": null,
            "etela": {"huoneeseen": 4, "avain": null},
            "lansi": {"huoneeseen": 9, "avain": 1},
            "vastustaja": null,
            "avain": null,
            "esine": null  
        },
        {
            "huoneNro": 6,
            "huoneteksti": "Olet osittain sortuneessa salahuoneessa. Onkohan tämä ollut aarrekammio? Huoneen länsiseinässä on naamioitu ovi.",
            "huonehp": {
                "hp": -5, 
                "tekstit": {
                    "vaikutus":"Katosta putusi pieni kivi päähäsi. Terveytesi heikkeni hieman.", 
                    "loppu": "kaikki kivet pudonneet"
                }, 
                "toistoLkm": 10
            },
            "pohjoinen": {"huoneeseen": 4, "avain": null},
            "ita": null,
            "etela": null,
            "lansi": {"huoneeseen": 1, "avain": null},
            "vastustaja": {
                "nimi": "Robotti",
                "teksti": "TR13-sarjan vartijarobotti seisoo keskellä lattiaa.",
                "voittoviesti": "Voitit vartijarobotin. Saat lisää kokemuspisteitä.",
                "tappioviesti": "Hävisit ottelun. Kuntosi sai kolauksen.",
                "pisteet": 0,
                "hp": 30,
                "voittoraja": 10
            },
            "avain": null,
            "esine": {"nimi": "elämän eliksiiri",
                "teksti": "Huoneen keskellä on pullo. Etiketissä lukee \"palauttaa voimia\".",
                "vaikutus": "Olosi tuntuu taas pirteämmältä",
                "pisteet": 0,
                "hp": 10
            }
        },
        {
            "huoneNro": 7,
            "huoneteksti": "Olet porrastasanteella. Kun katsot alas etelään, näet sisääntuloaulan. Itäseinällä on patinoitunut ovi.",
            "huonehp": null,
            "pohjoinen": null,
            "ita": {"huoneeseen": 5, "avain": null},
            "etela": {"huoneeseen": 2, "avain": null},
            "lansi": null,
            "vastustaja": null,
            "avain": null,
            "esine": null
        },
        {
            "huoneNro": 8,
            "huoneteksti": "Edessäsi on upea ja jännittävä seikkailu. Voit liikkua neljään ilmansuuntaan, poimia esineitä ja avaimia sekä taistella vastustajia vastaan. Aloita seikkailu siirtymällä pohjoiseen.",
            "huonehp": null,
            "pohjoinen": {"huoneeseen": 1, "avain": null},
            "ita": null,
            "etela": null,
            "lansi": null,
            "vastustaja": null,
            "avain": null,
            "esine": null
        },
        {
            "huoneNro": 9,
            "huoneteksti": "Olet kulkenut pitkän matkan viimeisen vastustajasi luo. Huoneessa on kaipaamasi aarre, mutta saadaksesi sen sinun on voitettava S.U.M.O",
            "huonehp": null,
            "pohjoinen": {"huoneeseen": 1, "avain": null},
            "ita": null,
            "etela": null,
            "lansi": null,
            "vastustaja": {
                "nimi": "S.U.M.O",
                "teksti": "S.U.M.O robotti odottaa vastustajaa.",
                "voittoviesti": "Voitit S.U.M.O:n! Onnea! Aarre odottaa lattialla.",
                "tappioviesti": "Hävisit ottelun. S.U.M.O on edelleen voittamaton.",
                "pisteet": 0,
                "hp": 90,
                "voittoraja": 0
            },
            "avain": null,
            "esine": {"nimi": "Legendaarinen aarre",
                "teksti": "Häikäisevä seuraavan sukupolven tekstiseikkailu odottaa ottajaansa.",
                "vaikutus": "Nyt heti pelaamaan uutta vielä julkaisematonta tekstiseikkailua!",
                "pisteet": 100,
                "hp": 100
            }
        }
    ]
};






