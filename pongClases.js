// Clase Raqueta
class Raqueta {
    constructor(x) {
        this.x = x;
        this.y = height / 2 - Raqueta.alto / 2;
    }

    // Dibujar la raqueta
    dibujar() {
        fill(255);
        rect(this.x, this.y, Raqueta.ancho, Raqueta.alto);
    }

    // Mover la raqueta del jugador
    moverJugador() {
        if (keyIsDown(UP_ARROW)) {
            this.y = max(0, this.y - Raqueta.velocidad);
        } else if (keyIsDown(DOWN_ARROW)) {
            this.y = min(height - Raqueta.alto, this.y + Raqueta.velocidad);
        }
    }

    // Mover la raqueta de la computadora
    moverComputadora(pelota) {
        this.y = pelota.y - Raqueta.alto / 2;
    }
}

// Propiedades estáticas para la clase Raqueta
Raqueta.ancho = 10;
Raqueta.alto = 100;
Raqueta.velocidad = 10;

// Clase Pelota
class Pelota {
    constructor() {
        this.reset();
    }

    // Dibujar la pelota
    dibujar() {
        fill(255);
        ellipse(this.x, this.y, Pelota.tamano);
    }

    // Mover la pelota
    mover() {
        this.x += this.velocidadX;
        this.y += this.velocidadY;

        // Rebote en los bordes superior e inferior
        if (this.y < 0 || this.y > height) {
            this.velocidadY *= -1;
        }
    }

    // Verifica colisión con las raquetas
    colision(raqueta) {
        return (
            this.x - Pelota.tamano / 2 < raqueta.x + Raqueta.ancho &&
            this.x + Pelota.tamano / 2 > raqueta.x &&
            this.y > raqueta.y &&
            this.y < raqueta.y + Raqueta.alto
        );
    }

    // Reinicia la posición y velocidad de la pelota
    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.velocidadX = random([-5, 5]);
        this.velocidadY = random(-3, 3);
    }
}

// Propiedades estáticas para la clase Pelota
Pelota.tamano = 20;

// Variables del juego
let jugador, computadora, pelota;
let puntuacionJugador = 0, puntuacionComputadora = 0;

// Configuración inicial
function setup() {
    createCanvas(800, 400);
    jugador = new Raqueta(30);
    computadora = new Raqueta(width - 40);
    pelota = new Pelota();
}

// Actualización del estado del juego
function draw() {
    background(0);
    mostrarPuntuacion();

    pelota.mover();
    verificarColisiones();

    jugador.dibujar();
    jugador.moverJugador();

    computadora.dibujar();
    computadora.moverComputadora(pelota);

    pelota.dibujar();
}

// Verificar colisiones y gestionar puntuaciones
function verificarColisiones() {
    if (pelota.colision(jugador)) {
        pelota.velocidadX *= -1;
    }

    if (pelota.colision(computadora)) {
        pelota.velocidadX *= -1;
    }

    // Verificar si la pelota sale de los bordes laterales
    if (pelota.x < 0) {
        puntuacionComputadora++;
        pelota.reset();
    } else if (pelota.x > width) {
        puntuacionJugador++;
        pelota.reset();
    }
}

// Mostrar la puntuación en la pantalla
function mostrarPuntuacion() {
    textSize(32);
    textAlign(CENTER);
    text(puntuacionJugador, width / 4, 50);
    text(puntuacionComputadora, 3 * width / 4, 50);
}
