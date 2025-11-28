const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let restaurantes = [];

app.get('/restaurantes', (req, res) => {
  res.json(restaurantes);
});

app.post('/restaurantes', (req, res) => {
  restaurantes.push(req.body);
  res.json({ mensaje: 'Restaurante agregado' });
});

app.listen(3002, () => console.log('Servicio Restaurantes en puerto 3002'));
