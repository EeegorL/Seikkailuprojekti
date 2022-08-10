"use strict";

const path = require("path");
const express = require("express");
const exp = express();
const port = 3000;
const host = "localhost";
const Tietovarasto = require("./back/tietovarastokerros");
const varasto = new Tietovarasto();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

exp.use(cors(corsOptions));

exp.get("/testi",(req,res)=>{
    try{
        console.log(varasto.testi());
        res.json("varasto.testi()");
    }
    catch(err){
        res.send(err);
    }
});

exp.listen(port, host, () => console.log(`${host}:${port} kuuntelee korvat höröllä`));
