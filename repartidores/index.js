const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

let repartidores = [
  { id_repartidor: 1, disponibilidad: true, ubicacion: "Cali", rating: 4.5 },
  { id_repartidor: 2, disponibilidad: true, ubicacion: "Palmira", rating: 4.8 }
];

app.get('/repartidores/disponibles', (req, res) => {
  const disponibles = repartidores.filter(r => r.disponibilidad === true);
  res.json(disponibles);
});

app.post('/repartidores/:id/aceptar', (req, res) => {
  const repartidor = repartidores.find(r => r.id_repartidor == req.params.id);
  if (!repartidor) return res.status(404).json({ error: "Repartidor no encontrado" });

  repartidor.disponibilidad = false;
  res.json({ mensaje: "Pedido asignado a repartidor", repartidor });
});

app.listen(3005, () => console.log("Servicio de Repartidores en puerto 3005"));
