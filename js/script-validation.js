document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fields = [
      {
        id: "nombre",
        label: "Nombre",
        required: true,
        minLength: 3,
      },
      {
        id: "apellido",
        label: "Apellido",
        required: true,
        minLength: 3,
      },
      {
        id: "email",
        label: "Email",
        required: true,
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        errorMsg: "El email no es válido.",
      },
      {
        id: "fecha-de-nacimiento",
        label: "Fecha de nacimiento",
        required: true,
        validator: (field) => {
          const today = new Date().toISOString().split("T")[0];
          if (field.value > today) {
            return "La fecha de nacimiento no puede ser una fecha futura.";
          }
          return null; // No error
        },
      },
      {
        id: "pais-de-residencia",
        label: "País de residencia",
        required: true,
        initialValue: "Seleccione su país",
        validator: (field) => {
          if (field.value === "" || field.value === "Seleccione su país") {
            return "El país de residencia es requerido.";
          }
          return null; // No error
        },
      },
    ];

    let valid = true;

    // Reset error messages
    document
      .querySelectorAll(".form-text")
      .forEach((el) => (el.textContent = ""));

    for (const field of fields) {
      const input = document.getElementById(field.id);
      const errorElement = document.getElementById(`error-${field.id}`);

      const errorMessage = validateField(input, field);
      if (errorMessage) {
        errorElement.textContent = errorMessage;
        valid = false;
        input.classList.add("is-invalid");
      } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
    }

    if (valid) {
      // Submit the form if all fields are valid
      alert("Formulario enviado con éxito.");
      // Reset validation classes
      form
        .querySelectorAll(".form-control, .form-select")
        .forEach((el) => el.classList.remove("is-invalid", "is-valid"));
      // Reset validation classes (optional)
      form.reset();
    }
  });
});

function validateField(field, fieldConfig) {
  if (fieldConfig.required && field.value.trim() === "") {
    return `${fieldConfig.label} es requerido.`;
  }
  if (
    fieldConfig.minLength &&
    field.value.trim().length < fieldConfig.minLength
  ) {
    return `${fieldConfig.label} debe tener al menos ${fieldConfig.minLength} caracteres.`;
  }
  if (fieldConfig.pattern && !fieldConfig.pattern.test(field.value)) {
    return fieldConfig.errorMsg || "El formato no es válido.";
  }
  if (fieldConfig.validator) {
    const customError = fieldConfig.validator(field);
    return customError;
  }
  return null; // No error
}
