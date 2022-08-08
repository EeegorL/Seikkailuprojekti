const cors = require("cors");
const mysql = require("mysql");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { port, host } = require("./config.json");

const Tietovarasto = require("./sql/dbHandler.js");
const varasto = new Tietovarasto();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(
    session({
        key: "user_id",
        secret: null,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
    // console.log(req)

    varasto
        .haeKaikki()
        .then((tulos) => {
            res.send(tulos);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});
app.get("/sivut", (req, res) => {
    varasto.kaikkiSivut()
        .then((tulos) => {res.send(tulos)})
        .catch((err) => {console.log(err);
        res.send(err);
        });
});
app.get("/sivu", (req, res) => {
    const url=req.query.url;
    varasto.haeSivu(url)
        .then((tulos) => {res.send(tulos)})
        .catch((err) => {console.log(err);
        res.send(err);
        });
});
app.get("/pyynnot", (req, res) => {
    varasto
        .haePyynnot()
        .then((tulos) => {
            res.send(tulos);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});
app.get("/testisivuosat", (req, res) => {
    varasto
        .testisivut()
        .then((tulos) => {
            res.send(tulos);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});
app.get("/haeKaikkiTiedot", (req, res) => {
    const nimi=req.query.nimi;
    const url=req.query.url;

    varasto
        .haeKaikkiSivunTiedot(nimi,url)
        .then((tulos) => {
            res.send(tulos);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

app.get("/api/checklogin", (req, res) => {
    if (req.session.user) {
        // console.log(req.session)
        res.send({
            loggedIn: true,
            user: req.session.user,
            userRole: req.session.userRole,
        });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/api/logout", (req, res) => {
    req.session.destroy();
    res.send({ loggedIn: false });
});

app.get("/api/tervetuloa", (req, res) => {
    varasto
        .haeTervetulo()
        .then((tulos) => {
            res.send(tulos);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.post("/tervetuloa", (req, res) => {
    const uusiTeksti=req.body.tervetuloteksti;
    varasto.vaihdaTervetulo(uusiTeksti)
    .then((tulos)=>{res.send(tulos)})
    .catch((err)=>{res.send(err)});
});

app.post("/muokkaa", (req, res) => {
    const nimi = req.body.nimiM;
    const otsikko = req.body.otsikkoM;
    const url = req.body.url;
 
    
    varasto
        .muokkaa(nimi,otsikko,url)
        .then((tulos) => {
                res.send(tulos);
        })
        .catch((err) => {
            res.send(err);
        });
});
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    varasto
        .tarkistaKirjautuminen(username, password)
        .then((tulos) => {
            // console.log(tulos);
            if (tulos.signedIn) {
                req.session.user = tulos.user.kayttajanimi;
                req.session.userRole = tulos.user.rooli;
                res.send(tulos);
            } else {
                res.send(tulos);
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

app.post("/register", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    let role = req.body.role;
    if (role == "" || role == null || role == " ") {
        role = "user";
    }

    varasto
        .lisaaKayttaja(name, password, role)
        .then((tulos) => {
            // console.log(tulos);
            res.send(tulos);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

app.post("/yhteydenotto", (req, res) => {
    const nimi = req.body.nimi;
    const puhnro = req.body.puhnro;
    const sposti = req.body.sposti;
    const viesti = req.body.viesti;

    varasto
        .lisaaYhteydenottopyynto(nimi, puhnro, sposti, viesti)
        .then((tulos) => {
            res.send(tulos);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

app.get("/kuvaa", (req, res) => {
    varasto
        .kuvaaTaulukot()
        .then((tulos) => {
            res.send(tulos);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
     
        });
});
app.post("/lisaaContenttia", (req, res) => {
    let content=req.body.lisattava||req.body.base64Kuva
    let contentType=req.body.mitaLisataan;
    let sivunNimi=req.body.nimi;


    varasto
        .lisaaContenttia(content,contentType,sivunNimi)
        .then((tulos) => {
            res.send(tulos);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
     
        });
});

app.post("/lisaaSivu", (req, res) => {
    const nimi=req.body.nimi;
    const otsikko=req.body.otsikko;
    const teemakuva=req.body.teemakuva;
    const url=req.body.url;

    varasto.lisaaSivu(nimi,otsikko,teemakuva,url)
        .then((tulos) => {
            res.send(tulos);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

app.listen(port, host, () => {
    console.log(`Palvelin käynnistyi portissa ${port}`);
});
// const a = new Tietovarasto();
// a.haePyynnot();
