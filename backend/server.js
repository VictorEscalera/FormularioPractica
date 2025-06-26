require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Base de datos conectada");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error al conectar MongoDB:", err.message);
  });


const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: email,
  carrera: String,
  telefono: Number,
  fecha: Date,
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

app.post('/enviar', async (req, res) => {
  try {
    await Usuario.create(req.body);
    res.status(200).send('Datos guardados');
  } catch (error) {
    console.error("Error al guardar en la DB:", error.message);
    res.status(500).send("Error del servidor");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
