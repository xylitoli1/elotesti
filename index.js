const { response } = require('express');
const { json } = require('express/lib/response');
const path = require('path')
var querystring = require('querystring');
var url = require('url');
const express = require("express")
const app = require('express')();
const port = process.env.PORT || 8080;

let objelo;
let objlvl;

app.listen(port, () => {
  console.log("toimii")
});

async function main(osote) {
  const response = await fetch('https://open.faceit.com/data/v4/players?nickname='+osote+'&game=cs2', {
    headers: {
      'Authorization': 'Bearer 02532f35-7c82-4e0b-b436-b812544d981c',
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .then(data => {
    objelo = data.games.cs2.faceit_elo;
    objlvl = data.games.cs2.skill_level;
    testi = JSON.stringify(objelo)
    testi2 = JSON.stringify(objlvl)
    console.log(data)
   }); 
}

app.get('/elo', (req, res, next) => {
  main(req.query.nimi);
  next();
}, (req, res) => {
  res.status(200).send({
    nimi: req.query.nimi,
    elo: objelo,
    lvl: objlvl
    
});
});