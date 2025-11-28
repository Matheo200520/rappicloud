const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(express.json());

// ========================
//  API GATEWAY – RAPPLICLOUD
// ========================

// LOG DE TODAS LAS PETICIONES
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} - ${req.originalUrl}`);
  next();
});

// ========================
//  SERVICIO DE USUARIOS
// ========================
app.use('/usuarios', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
}));

// ========================
//  SERVICIO DE RESTAURANTES
// ========================
app.use('/restaurantes', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true
}));

// ========================
//  SERVICIO DE PEDIDOS
// ========================
app.use('/pedidos', createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true
}));

// ========================
//  SERVICIO DE PAGOS
// ========================
app.use('/pagos', createProxyMiddleware({
  target: 'http://localhost:3004',
  changeOrigin: true
}));

// ========================
//  SERVICIO DE REPARTIDORES
// ========================
app.use('/repartidores', createProxyMiddleware({
  target: 'http://localhost:3005',
  changeOrigin: true
}));

// ========================
//  SERVICIO DE NOTIFICACIONES
// ========================
app.use('/notificaciones', createProxyMiddleware({
  target: 'http://localhost:3006',
  changeOrigin: true
}));

// ========================
//  INICIO DEL GATEWAY
// ========================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway corriendo en puerto ${PORT}`);
  console.log("🛣  Rutas activas:");
  console.log("   /usuarios → 3001");
  console.log("   /restaurantes → 3002");
  console.log("   /pedidos → 3003");
  console.log("   /pagos → 3004");
  console.log("   /repartidores → 3005");
  console.log("   /notificaciones → 3006");
});
