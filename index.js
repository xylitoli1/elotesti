const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080;

const url = 'https://open.faceit.com/data/v4/players';

app.get('/', async (req, res) => {
  const faceitnimi = req.query.nimi;

  if (!faceitnimi) {
    return res.status(400).json({ error: 'nimi-parametri puuttuu' });
  }

  try {
    const tiedot = await axios.get(`${url}?nickname=${faceitnimi}`, {
      headers: {
        'Authorization': 'Bearer 02532f35-7c82-4e0b-b436-b812544d981c',
        'Content-Type': 'application/json'
      }
    });

    const pelaajatiedot = tiedot.data;
    const tililuotu = new Date(pelaajatiedot.activated_at);
    const tamapaiva = new Date();
    const millisekunnit = tamapaiva - tililuotu;
    const sekunnit = Math.floor(millisekunnit / 1000);
    const minuutit = Math.floor(sekunnit / 60);
    const tunnit = Math.floor(minuutit / 60);
    const paivat = Math.floor(tunnit / 24);
    const pelaajaid = pelaajatiedot.player_id;
    const statsit = await axios.get(`https://open.faceit.com/data/v4/players/${pelaajaid}/stats/cs2`, {
      headers: {
        'Authorization': 'Bearer 02532f35-7c82-4e0b-b436-b812544d981c',
        'Content-Type': 'application/json'
      }});
      const pelaajastatsit = statsit.data; 
    res.json({
      nimi: pelaajatiedot.nickname,
      playerid: pelaajatiedot.player_id,
      maa: pelaajatiedot.country,
      elo: pelaajatiedot.games.cs2.faceit_elo,
      lvl: pelaajatiedot.games.cs2.skill_level,
      luotu: pelaajatiedot.activated_at,
      ika_pv: paivat,
      pelit: pelaajastatsit.lifetime.Matches,
      voitot: pelaajastatsit.lifetime.Wins,
      voittoputki: pelaajastatsit.lifetime["Longest Win Streak"]
    });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: 'rikki on',
        details: error.response.data
      });
    } else {
      res.status(500).json({
        error: 'rikki on',
        details: error.message
      });
    }
  }
});

app.listen(PORT);