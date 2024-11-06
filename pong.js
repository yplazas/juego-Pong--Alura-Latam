// Variables del juego
let raquetaJugador, raquetaComputadora;
let pelota;
let velocidadPelotaX = 5, velocidadPelotaY = 5;
let velocidadRaqueta = 10;
let anchoRaqueta = 10, altoRaqueta = 100;
let puntuacionJugador = 0, puntuacionComputadora = 0;

// Configuración inicial
function setup() {
    createCanvas(1600, 800);

    // Posición inicial de las raquetas
    raquetaJugador = createVector(40, height / 2 - altoRaqueta / 2);
    raquetaComputadora = createVector(width - 50, height / 2 - altoRaqueta / 2);

    // Posición y velocidad inicial de la pelota
    pelota = createVector(width / 2, height / 2);
}

// Dibuja los elementos en la pantalla
function draw() {
    background(0);

    // Dibujar raquetas
    fill(255);
    rect(raquetaJugador.x, raquetaJugador.y, anchoRaqueta, altoRaqueta);
    rect(raquetaComputadora.x, raquetaComputadora.y, anchoRaqueta, altoRaqueta);

    // Dibujar pelota
    ellipse(pelota.x, pelota.y, 20, 20);

    // Mover pelota
    pelota.x += velocidadPelotaX;
    pelota.y += velocidadPelotaY;

    // Rebote de la pelota en los bordes superior e inferior
    if (pelota.y < 0 || pelota.y > height) {
        velocidadPelotaY *= -1;
    }

    // Mover raqueta del jugador
    if (keyIsDown(UP_ARROW)) {
        raquetaJugador.y = max(0, raquetaJugador.y - velocidadRaqueta);
    } else if (keyIsDown(DOWN_ARROW)) {
        raquetaJugador.y = min(height - altoRaqueta, raquetaJugador.y + velocidadRaqueta);
    }

    // Mover raqueta de la computadora (IA básica)
    raquetaComputadora.y = pelota.y - altoRaqueta / 2;

    // Rebote de la pelota en la raqueta del jugador
    if (pelota.x - 10 < raquetaJugador.x + anchoRaqueta &&
        pelota.y > raquetaJugador.y &&
        pelota.y < raquetaJugador.y + altoRaqueta) {
        velocidadPelotaX *= -1;
    }

    // Rebote de la pelota en la raqueta de la computadora
    if (pelota.x + 10 > raquetaComputadora.x &&
        pelota.y > raquetaComputadora.y &&
        pelota.y < raquetaComputadora.y + altoRaqueta) {
        velocidadPelotaX *= -1;
    }

    // Reiniciar pelota si sale por un lado
    if (pelota.x < 0) {
        puntuacionComputadora++;
        reiniciarPelota();
    } else if (pelota.x > width) {
        puntuacionJugador++;
        reiniciarPelota();
    }

    // Mostrar puntuación
    textSize(32);
    text(puntuacionJugador, width / 4, 50);
    text(puntuacionComputadora, 3 * width / 4, 50);
}

// Reinicia la posición y velocidad de la pelota
function reiniciarPelota() {
    pelota.set(width / 2, height / 2);
    velocidadPelotaX *= -1;
}
