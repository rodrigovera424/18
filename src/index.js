/*
Entrega 18 - Clase 36
Alumno: Jo Repossi
Backend: NodeJS
Comisión 30995
Profesor: Diego Jofre
Fecha: Martes 27 Septiembre 2022
**/

const Server = require("./models/server");
const exphbs = require("express-handlebars");

const express = require("express");
const server = new Server();

const app = express();
app.set("view engine", "handlebars");

app.engine("handlebars", exphbs.engine());
// eslint-disable-next-line no-undef
app.set("views", __dirname + "/public/views");
server.listen();
