const { response } = require('express');
const { json } = require('express/lib/response');
var querystring = require('querystring');
var url = require('url');

const app = require('express')();
const port = process.env.PORT;


let obj;

fetch('https://open.faceit.com/data/v4/players?nickname=LaterMay6e&game=cs2', {
    headers: {
      'Authorization': 'Bearer 02532f35-7c82-4e0b-b436-b812544d981c',
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .then(data => {
    obj = data.games.cs2.faceit_elo;
    testi = JSON.stringify(obj)
    console.log(testi)
   });

   app.get('/elo', (req, res) => {
    res.status(200).send({
        elo: obj,
        lvl: obj,
        testing: req.query.n,
    })
})

app.listen(port, () => {
  console.log("toimii")
}
)
