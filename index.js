const { response } = require('express');
const { json } = require('express/lib/response');
var querystring = require('querystring');
var url = require('url');


const app = require('express')();
const port = process.env.PORT || 8080;

let sijanti = "tyhjyys";

if (typeof window !== "undefined") {
    sijanti = window.location.href; 
}


let objelo;
let objlvl;

fetch('https://open.faceit.com/data/v4/players?nickname=LaterMay6e&game=cs2', {
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

   app.get('/elo', (req, res) => {
    res.status(200).send({
        faceitnickname: req.query.nimi,
        elo: objelo,
        lvl: objlvl,
        testi: sijanti
        
    })
})

app.listen(port, () => {
  console.log("toimii")
}
)
