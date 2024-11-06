// Variables del juego
let raquetaJugador, raquetaComputadora, pelota, fondo, imagePelota, imageRaquetaJugador, imageRaquetaComputadora, velocidadPelota;
let velocidadRaqueta = 10;
let velocidadComputadora = 8;
const anchoRaqueta = 10, altoRaqueta = 100;
let puntuacionJugador = 0, puntuacionComputadora = 0;

function preload() {
    fondo = loadImage('./Sprites/fondo2.png');
    imagePelota = loadImage('./Sprites/bola.png');
    imageRaquetaJugador = loadImage('./Sprites/barra1.png');
    imageRaquetaComputadora = loadImage('./Sprites/barra2.png');
    
}

// Configuración inicial
function setup() {
    createCanvas(800, 400);
    iniciarElementos();
}

// Configura las posiciones iniciales de la pelota y raquetas
function iniciarElementos() {
    raquetaJugador = crearRaqueta(30);
    raquetaComputadora = crearRaqueta(width - 40);
    pelota = crearPelota();
    velocidadPelota = createVector(5, 5);
}

// Función para crear una raqueta en una posición X
function crearRaqueta(posX) {
    return createVector(posX, height / 2 - altoRaqueta / 2);
}

// Función para crear la pelota en el centro
function crearPelota() {
    return createVector(width / 2, height / 2);
}

// Actualiza el estado del juego en cada fotograma
function draw() {
    image(fondo, 0, 0, width, height);
    mostrarPuntuacion();
    moverPelota();
    verificarColisiones();
    moverRaquetas();
    dibujarElementos();
}

// Dibuja la pelota y las raquetas
function dibujarElementos() {
    fill(255);
    rect(raquetaJugador.x, raquetaJugador.y, anchoRaqueta, altoRaqueta);
    rect(raquetaComputadora.x, raquetaComputadora.y, anchoRaqueta, altoRaqueta);
    ellipse(pelota.x, pelota.y, 20, 20);
}

// Mueve la pelota y verifica rebotes en los bordes
function moverPelota() {
    pelota.x += velocidadPelota.x;
    pelota.y += velocidadPelota.y;

    // Rebote en los bordes superior e inferior
    if (pelota.y < 0 || pelota.y > height) {
        velocidadPelota.y *= -1;
    }
}

// Verifica colisiones con las raquetas y marca los puntos
function verificarColisiones() {
    // Colisión con la raqueta del jugador
    if (colisionRaqueta(raquetaJugador)) {
        velocidadPelota.x *= -1;
    }

    // Colisión con la raqueta de la computadora
    if (colisionRaqueta(raquetaComputadora)) {
        velocidadPelota.x *= -1;
    }

    // La pelota sale por la izquierda (punto para la computadora)
    if (pelota.x < 0) {
        puntuacionComputadora++;
        reiniciarPelota();
    }

    // La pelota sale por la derecha (punto para el jugador)
    if (pelota.x > width) {
        puntuacionJugador++;
        reiniciarPelota();
    }
}

// Comprueba si la pelota colisiona con una raqueta
function colisionRaqueta(raqueta) {
    return (pelota.x - 10 < raqueta.x + anchoRaqueta && pelota.x + 10 > raqueta.x &&
        pelota.y > raqueta.y && pelota.y < raqueta.y + altoRaqueta);
}

// Mueve la raqueta del jugador y la computadora
function moverRaquetas() {
    moverRaquetaJugador();
    moverRaquetaComputadora();
}

// Mover la raqueta del jugador con las teclas
function moverRaquetaJugador() {
    if (keyIsDown(UP_ARROW)) {
        raquetaJugador.y = max(0, raquetaJugador.y - velocidadRaqueta);
    } else if (keyIsDown(DOWN_ARROW)) {
        raquetaJugador.y = min(height - altoRaqueta, raquetaJugador.y + velocidadRaqueta);
    }
}

// Mover la raqueta de la computadora (IA con velocidad reducida)
function moverRaquetaComputadora() {
    // Mover la raqueta hacia la posición de la pelota, pero con un límite de velocidad
    if (pelota.y < raquetaComputadora.y) {
      raquetaComputadora.y = max(0, raquetaComputadora.y - velocidadComputadora);
    } else if (pelota.y > raquetaComputadora.y + altoRaqueta) {
      raquetaComputadora.y = min(height - altoRaqueta, raquetaComputadora.y + velocidadComputadora);
    }
  }

// Reinicia la pelota en el centro
function reiniciarPelota() {
    pelota = crearPelota();
    velocidadPelota.x *= -1;
    hablarMarcador();
}

// Muestra la puntuación en la pantalla
function mostrarPuntuacion() {
    textSize(32);
    textAlign(CENTER);
    text(puntuacionJugador, width / 4, 50);
    text(puntuacionComputadora, 3 * width / 4, 50);
}