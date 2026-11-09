/**
 * Personalización de la interfaz: color de fondo, tema visual
 * y persistencia de las preferencias con cookies.
 */

// === 1. REFERENCIAS A LOS ELEMENTOS DEL FORMULARIO ===

const inputColor = document.getElementById("color-fondo");
const selectTema = document.getElementById("tema");

// === 2. ASPECTO VISUAL ===

/**
 * Aplica un color al fondo de la página como estilo en línea del body.
 * @param {string} color - Color en hexadecimal (ej: "#ff0000").
 */
function aplicarColorFondo(color) {
    document.body.style.backgroundColor = color;
}

/**
 * Activa en el body la clase del tema elegido y quita la del otro.
 * Los estilos de cada tema están definidos en estilos.css.
 * @param {string} tema - "claro" u "oscuro".
 */
function aplicarTema(tema) {
    if (tema === "oscuro") {
        document.body.classList.remove("tema-claro");
        document.body.classList.add("tema-oscuro");
    } else {
        document.body.classList.remove("tema-oscuro");
        document.body.classList.add("tema-claro");
    }
}

// === 3. EVENTOS ===

// "input" se dispara en cada cambio mientras se elige el color: el fondo cambia al instante.
inputColor.addEventListener("input", () => aplicarColorFondo(inputColor.value));

// "change" se dispara al seleccionar otra opción del desplegable.
selectTema.addEventListener("change", () => aplicarTema(selectTema.value));