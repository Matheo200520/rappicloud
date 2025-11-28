const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

let pagos = []; // {id_transaccion, pedido_id, monto, metodo_pago, status}

app.post('/pagos/confirmar', (req, res) => {
  const { pedido_id, monto, metodo_pago } = req.body;

  const nuevoPago = {
    id_transaccion: pagos.length + 1,
    pedido_id,
    monto,
    metodo_pago,
    status: "aprobado"  // simulación
  };

  pagos.push(nuevoPago);

  res.json({ mensaje: "Pago aprobado", pago: nuevoPago });
});

app.get('/pagos/:id', (req, res) => {
  const pago = pagos.find(p => p.id_transaccion == req.params.id);
  if (!pago) return res.status(404).json({ error: "Pago no encontrado" });

  res.json(pago);
});

app.listen(3004, () => console.log("Servicio de Pagos en puerto 3004"));
