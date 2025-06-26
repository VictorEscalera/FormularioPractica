// server.js
require('dotenv').config(); // carga variables .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware para CORS - permite todas las solicitudes (modifica origin para producción)
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(express.json());

// Conexión a MongoDB Atlas con URI en variable de entorno
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err);
    process.exit(1); // salir si no conecta
  });

// Esquema y modelo para datos del formulario
const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  carrera: String,
  telefono: String,
  fecha: String,
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Ruta POST para recibir datos y guardarlos
app.post('/enviar', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ mensaje: '✅ Datos guardados correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar:', error);
    res.status(500).json({ mensaje: '❌ Error al guardar datos', error: error.message });
  }
});

// Puerto dinámico para Render o local
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
