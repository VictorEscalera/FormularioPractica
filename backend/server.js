require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Modelo de usuario
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  carrera: String,
  telefono: Number,
  fecha: Date,
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Ruta para recibir datos
app.post('/enviar', async (req, res) => {
  try {
    await Usuario.create(req.body);
    res.status(200).send({ mensaje: 'Datos guardados con éxito' });
  } catch (error) {
    console.error("Error al guardar en la DB:", error.message);
    res.status(500).send({ mensaje: 'Error del servidor' });
  }
});

// Conectar a MongoDB y luego iniciar servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Base de datos conectada");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error al conectar MongoDB:", err.message);
  });
