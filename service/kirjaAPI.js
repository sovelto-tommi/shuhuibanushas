const express = require('express');
const router = express.Router();
const kirjat = require('./kirjat');
const Kirja = require('../service/kirja').Kirja;

/* GET books listing. */
router.route('')
  .get((req, res) => {
    res.send(kirjat.kaikki());
  })
  .post((req, res) => {
    let kirja; 
    try {
      kirja = new Kirja(req.body);
      kirjat.lisää(kirja);
    } catch (err) {
      res.status(400).send({ error: err.message||'tuntematon virhe' });
    }
    res.status(201)
      .location('http://localhost:3000/api/kirjat/' + kirja.isbn)
      .send();
  });

router.route('/:isbn')
  .get((req, res) => {
    // isbn olisi hyvä kaivaa esille
    const kirja = kirjat.haeYksi(isbn);
    if (!kirja) {
      // Tähän olisi hyvä kirjoittaa koodia
    } else {
      // niin tähänkin
    }
  });

module.exports = router;
