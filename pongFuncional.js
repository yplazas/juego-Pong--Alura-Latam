// Variables del juego
let raquetaJugador, raquetaComputadora, pelota, fondo, imagePelota, imageRaquetaJugador, imageRaquetaComputadora, velocidadPelota, sonidoColision, sonidoPuntos;
let velocidadRaqueta = 10;
let velocidadComputadora = 8;
const anchoRaqueta = 10, altoRaqueta = 100;
let puntuacionJugador = 0, puntuacionComputadora = 0;
let anguloPelota = 0; // Variable para el ángulo de rotación

function preload() {
    fondo = loadImage('./Sprites/fondo2.png');
    imagePelota = loadImage('./Sprites/bola.png');
    imageRaquetaJugador = loadImage('./Sprites/barra1.png');
    imageRaquetaComputadora = loadImage('./Sprites/barra2.png');
    sonidoColision = loadSound('./sonido/colision.wav');
    sonidoPuntos = loadSound('./sonido/puntos.wav');

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
    image(imageRaquetaJugador, raquetaJugador.x, raquetaJugador.y, anchoRaqueta, altoRaqueta);
    image(imageRaquetaComputadora, raquetaComputadora.x, raquetaComputadora.y, anchoRaqueta, altoRaqueta);
    dibujarPelotaGirando();
}

// Función para dibujar la pelota girando
function dibujarPelotaGirando() {
    push(); // Guardar la configuración actual
    translate(pelota.x, pelota.y); // Trasladar el origen de coordenadas a la posición de la pelota
    rotate(anguloPelota); // Rotar el lienzo por el ángulo de la pelota
    image(imagePelota, -10, -10, 20, 20); // Dibujar la pelota en el nuevo origen
    pop(); // Restaurar la configuración del lienzo

    // Incrementar el ángulo de rotación para que la pelota gire
    anguloPelota += 1; // Puedes ajustar este valor para que gire más rápido o más lento
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
        sonidoColision.play(); 
    }

    // Colisión con la raqueta de la computadora
    if (colisionRaqueta(raquetaComputadora)) {
        velocidadPelota.x *= -1;
        sonidoColision.play(); 
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
    // sonidoPuntos.play();
    hablarMarcador();
}

// Muestra la puntuación en la pantalla
function mostrarPuntuacion() {
    textSize(32);
    textAlign(CENTER);
    text(puntuacionJugador, width / 4, 50);
    text(puntuacionComputadora, 3 * width / 4, 50);
}

// Función para anunciar el marcador utilizando síntesis de voz
function hablarMarcador() {
    let mensaje = `El jugador tiene ${puntuacionJugador} puntos, y la computadora tiene ${puntuacionComputadora} puntos.`;
    let voz = new SpeechSynthesisUtterance(mensaje); // Crear una instancia de síntesis de voz
    window.speechSynthesis.speak(voz); // Ejecutar la voz
}
