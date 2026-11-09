/**
 * Personalización de la interfaz: color de fondo, tema visual
 * y persistencia de las preferencias con cookies.
 */

// === 1. REFERENCIAS Y CONSTANTES ===

const inputNombre = document.getElementById("nombre");
const inputColor = document.getElementById("color-fondo");
const selectTema = document.getElementById("tema");
const formulario = document.getElementById("form-preferencias");

/** @type {number} Días que duran las cookies de nombre y color. */
const DIAS_CADUCIDAD = 7;

// === 2. ASPECTO VISUAL ===

/**
 * Aplica un color al fondo de la página como estilo en línea del body.
 * @param {string} color - Color en hexadecimal.
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

// === 3. GESTIÓN DE COOKIES ===

/**
 * Calcula la fecha de caducidad sumando días a la fecha actual.
 * @param {number} dias - Días a partir de hoy.
 * @returns {string} Fecha en formato UTC, la que exige el atributo expires.
 */
function calcularCaducidad(dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
    return fecha.toUTCString();
}

/**
 * Crea o sobrescribe una cookie.
 * Si no se indican días, es una cookie de sesión:
 * el navegador la borra al cerrarse.
 * @param {string} nombre - Nombre de la cookie.
 * @param {string} valor - Valor a guardar.
 * @param {number} [dias] - Días hasta que caduca.
 */
function guardarCookie(nombre, valor, dias) {
    // encodeURIComponent protege los espacios, tildes y la "#" del color
    let cookie = `${nombre}=${encodeURIComponent(valor)}; path=/`;

    if (dias !== undefined) {
        cookie += `; expires=${calcularCaducidad(dias)}`;
    }

    document.cookie = cookie;
}

/**
 * Busca una cookie por su nombre dentro de document.cookie,
 * que devuelve todas en una sola cadena: "nombre=Dani; colorFondo=%23ff0000; tema=oscuro".
 * @param {string} nombre - Nombre de la cookie buscada.
 * @returns {string|null} Su valor decodificado, o null si no existe.
 */
function leerCookie(nombre) {
    const pares = document.cookie.split("; ");

    for (const par of pares) {
        const [clave, valor] = par.split("=");
        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}

// === 4. PREFERENCIAS DEL USUARIO ===

/**
 * Guarda las tres preferencias en tres cookies diferentes:
 * nombre y color caducan en 7 días; el tema es una cookie de sesión.
 */
function guardarPreferencias() {
    guardarCookie("nombre", inputNombre.value, DIAS_CADUCIDAD);
    guardarCookie("colorFondo", inputColor.value, DIAS_CADUCIDAD);
    guardarCookie("tema", selectTema.value);
}

/**
 * Lee las cookies guardadas y, si existen, rellena el formulario
 * y aplica el color y el tema a la página.
 */
function restaurarPreferencias() {
    const nombre = leerCookie("nombre");
    const color = leerCookie("colorFondo");
    const tema = leerCookie("tema");

    if (nombre !== null) {
        inputNombre.value = nombre;
    }

    if (color !== null) {
        inputColor.value = color;
        aplicarColorFondo(color);
    }

    if (tema !== null) {
        selectTema.value = tema;
        aplicarTema(tema);
    }
}

// === 5. EVENTOS E INICIO ===

// "input" se dispara en cada cambio mientras se elige el color: el fondo cambia al instante.
inputColor.addEventListener("input", () => aplicarColorFondo(inputColor.value));

// "change" se dispara al seleccionar otra opción del desplegable.
selectTema.addEventListener("change", () => aplicarTema(selectTema.value));

// "submit" se dispara al enviar el formulario (botón Guardar Preferencias).
formulario.addEventListener("submit", (evento) => {
    // Evita el comportamiento por defecto del formulario: enviar los datos y recargar la página.
    evento.preventDefault();
    guardarPreferencias();
});

// Al cargar la página se recuperan las preferencias guardadas.
// Gracias a "defer", el HTML ya está construido cuando se ejecuta esta línea.
restaurarPreferencias();