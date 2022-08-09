"use strict";

const path = require("path");
const express = require("express");
const exp = express();
const port = 3000;
const host = "localhost";
const Tietovarasto = require("./back/tietovarastokerros");
const varasto = new Tietovarasto();



exp.listen(port, host, () => console.log(`${host}:${port} kuuntelee korvat höröllä`));
