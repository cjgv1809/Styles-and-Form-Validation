const stylesheet = document.getElementById("stylesheet");
const btnStyles1 = document.getElementById("estilos1");
const btnStyles2 = document.getElementById("estilos2");

// Revisar local storage y chequear si existe el valor de la clave 'stylesheet'
const savedStylesheet = localStorage.getItem("stylesheet") || "css/default.css";
if (savedStylesheet) {
  stylesheet.href = savedStylesheet;
}

btnStyles1.addEventListener("click", () => changeStylesheet("css/default.css"));

btnStyles2.addEventListener("click", () =>
  changeStylesheet("css/high-contrast.css")
);

function changeStylesheet(href) {
  stylesheet.href = href;
  localStorage.setItem("stylesheet", href);
}
