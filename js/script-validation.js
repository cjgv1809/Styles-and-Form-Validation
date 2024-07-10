document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;

    // Borrar errores previos
    document
      .querySelectorAll(".form__error")
      .forEach((el) => (el.textContent = ""));

    // Validar Nombre
    const nombre = document.getElementById("nombre");
    if (nombre.value.trim() === "") {
      valid = false;
      document.getElementById("error-nombre").textContent =
        "El nombre es requerido.";
    }

    // Validar Apellido
    const apellido = document.getElementById("apellido");
    if (apellido.value.trim() === "") {
      valid = false;
      document.getElementById("error-apellido").textContent =
        "El apellido es requerido.";
    }

    // Validar Email contra expresion regular
    const email = document.getElementById("email");
    if (email.value.trim() === "") {
      valid = false;
      document.getElementById("error-email").textContent =
        "El email es requerido.";
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email.value)) {
        valid = false;
        document.getElementById("error-email").textContent =
          "El email no es válido.";
      }
    }

    // Validar Fecha de Nacimiento
    const fecha = document.getElementById("fecha-de-nacimiento");
    const today = new Date().toISOString().split("T")[0];
    if (fecha.value.trim() === "") {
      valid = false;
      document.getElementById("error-fecha-de-nacimiento").textContent =
        "La fecha de nacimiento es requerida.";
    } else if (fecha.value > today) {
      valid = false;
      document.getElementById("error-fecha-de-nacimiento").textContent =
        "La fecha de nacimiento no puede ser una fecha futura.";
    }

    // Validar País de Residencia
    const pais = document.getElementById("pais-de-residencia");
    if (pais.value === "" || pais.value === "--- Seleccione su país ---") {
      valid = false;
      document.getElementById("error-pais-de-residencia").textContent =
        "El país de residencia es requerido.";
    }

    if (valid) {
      // Enviar el form si todos los campos son validos
      alert("Formulario enviado con éxito.");
      // Resetear form
      form.reset();
    }
  });

  // Agregar onblur event listener para borrar errores al perder el foco
  document.querySelectorAll(".form__input, .form__select").forEach((input) => {
    input.addEventListener("blur", function () {
      const errorElement = document.getElementById(`error-${input.id}`);
      if (errorElement) {
        errorElement.textContent = "";
      }
    });
  });
});
