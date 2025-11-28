const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Simulación de base de datos
let pedidos = []; // {id_pedido, usuario_id, items, total, estado, repartidor_id}

app.post('/pedidos', (req, res) => {
  const { usuario_id, items, total } = req.body;

  const nuevoPedido = {
    id_pedido: pedidos.length + 1,
    usuario_id,
    items,
    total,
    estado: "pendiente",
    repartidor_id: null
  };

  pedidos.push(nuevoPedido);
  res.json({ mensaje: "Pedido creado", pedido: nuevoPedido });
});

app.get('/pedidos/:id', (req, res) => {
  const pedido = pedidos.find(p => p.id_pedido == req.params.id);
  if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
  res.json(pedido);
});

app.patch('/pedidos/:id/estado', (req, res) => {
  const pedido = pedidos.find(p => p.id_pedido == req.params.id);
  if (!pedido) return res.status(404).json({ error: "Pedido no existe" });

  pedido.estado = req.body.estado;
  res.json({ mensaje: "Estado actualizado", pedido });
});

app.listen(3003, () => console.log("Servicio de Pedidos en puerto 3003"));
