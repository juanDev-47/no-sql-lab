const express = require('express');
const Author = require('../models/author');

const router = express.Router();

/**
 * GET authors listing.
 */
router.get('/', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/consulta1', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { };
    const authors = await Author.find({ $and:[{publicados:{$lte:20}},{pais:"Colombia"}] },{nombre:1,apellido:1});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Consultar los nombres y los apellidos de los autores que tengan publicaciones inferiores o iguales a 20 y su país sea Colombia.

router.get('/consulta2', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find({apellido: {$ne:" "}},{nombre:1});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Consultar los nombres de los autores que tengan apellido en la base de datos.

router.get('/consulta3', async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find({$or:[{publicados:{$gt:20}},{pais:"Argentina"}]},{apellido:1});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Consultar los apellidos de los autores que tengan más de 20 publicaciones o que su país sea Argentina

/**
 * Create a new Author
 */
router.post('/', async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
