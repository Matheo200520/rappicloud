const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

let users = []; // temporal (luego Postgres)

app.post('/usuarios/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, nombre, email, password: hashed });

  res.json({ mensaje: 'Usuario registrado correctamente' });
});

app.post('/usuarios/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: 'Usuario no existe' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET);
  res.json({ token });
});

app.listen(3001, () => console.log('Servicio Usuarios en puerto 3001'));
