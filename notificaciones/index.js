const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Simulación de envío de notificaciones
app.post('/notificaciones/enviar', (req, res) => {
  const { tipo, mensaje, usuario_id } = req.body;

  console.log(`📨 Notificación enviada:
    Tipo: ${tipo}
    Usuario: ${usuario_id}
    Mensaje: ${mensaje}
  `);

  res.json({ mensaje: "Notificación enviada correctamente" });
});

app.listen(3006, () => console.log("Servicio de Notificaciones en puerto 3006"));
