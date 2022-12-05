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
//root joka renderoi itse pelin
exp.get("/"),(req,res)=>res.render(__dirname,"index.html");
//hakee vihollisen id:llä
exp.get("/vihollinen/:id",async (req,res)=>{
    try{
        res.json(await varasto.vihollisenTiedot(req.params.id));
    }
    catch(err){
        res.send(err);
    }
});
//hakee huoneen viholliset
exp.get("/huoneenViholliset/:huoneId",async (req,res)=>{
    try{
        res.json(await varasto.huoneenViholliset(req.params.huoneId));
    }
    catch(err){
        res.send(err);
    }
});
//hakee pelaajan tiedot
exp.get("/pelaaja",async (req,res)=>{
    try{
        res.json(await varasto.testi());
    }
    catch(err){
        res.send(err);
    }
});
exp.get("/huoneenOvet/:huoneId",async(req,res)=>{
    try{
        res.json(await varasto.huoneenOvet(req.params.huoneId))
    }catch(err){
        res.send(err);
    }
});
exp.get("/huoneenHuonekalut/:huoneId",async(req,res)=>{
    try{
        res.json(await varasto.huoneenHuonekalut(req.params.huoneId));
        
    }catch(err){
        res.send(err);

    }
});
exp.post("/vihollinenElossaFalse/:vihollisenId",async(req,res)=>{
    try{
        let tulos=await varasto.vihollinenElossaFalse(req.params.vihollisenId);
        console.log(tulos);
        
    }catch(err){
        res.send(err);
    }
});

exp.listen(port, host, () => console.log(`${host}:${port} kuuntelee korvat höröllä`));
