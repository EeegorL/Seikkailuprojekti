"use strict";

const path = require("path");
const express = require("express");
const exp = express();
const port = 3000;
const host = "localhost";
const Tietovarasto = require("./tietovarasto/tietovarastokerros");
const varasto = new Tietovarasto();

exp.use(express.static(path.join(__dirname,"canvasseikkailupeli")));


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

exp.use(cors(corsOptions));

exp.get("/"),(req,res)=>res.render(__dirname,"index.html");

exp.get("/vihollinen/:id",async (req,res)=>{
    try{
        res.json(await varasto.vihollisenTiedot(req.params.id));
    }
    catch(err){
        res.send(err);
    }
});
exp.get("/pelaaja",async (req,res)=>{
    try{
        res.json(await varasto.testi());
    }
    catch(err){
        res.send(err);
    }
});


exp.listen(port, host, () => console.log(`${host}:${port} kuuntelee korvat höröllä`));
