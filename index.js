document.getElementById("miFormulario").addEventListener("submit", async function (e) {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    carrera: document.getElementById("carrera").value,
    telefono: document.getElementById("telefono").value,
    fecha: document.getElementById("fecha").value,
  };

  try {
  const response = await fetch('https://formulario-backend.onrender.com/enviar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });


    const result = await response.json();
    alert(result.mensaje || 'Formulario enviado correctamente');
    document.getElementById("miFormulario").reset();
  } catch (error) {
    alert("Error al enviar datos: " + error.message);
  }
});
