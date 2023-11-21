

// Función para cargar las imágenes en un orden aleatorio
function cargarImagenesAleatorias() {
    // Un array que contiene objetos con la información de las imágenes
    var imagenesEo = [
        { id: "drag1", src: "/images/eolica/imagen-0.jpg", area: "div1" },
        { id: "drag2", src: "/images/eolica/imagen-1.jpg", area: "div2" },
        { id: "drag3", src: "/images/eolica/imagen-2.jpg", area: "div3" },
        { id: "drag4", src: "/images/eolica/imagen-3.jpg", area: "div4" },
        { id: "drag5", src: "/images/eolica/imagen-4.jpg", area: "div5" },
        { id: "drag6", src: "/images/eolica/imagen-5.jpg", area: "div6" },
        { id: "drag7", src: "/images/eolica/imagen-6.jpg", area: "div7" },
        { id: "drag8", src: "/images/eolica/imagen-7.jpg", area: "div8" },
        { id: "drag9", src: "/images/eolica/imagen-8.jpg", area: "div9" }
    ];

    // Mezcla aleatoriamente el orden de las imágenes en el array
    imagenesEo.sort(function() {
        return 0.5 - Math.random();
    });

    // Obtén el elemento contenedor donde se cargarán las imágenes
    var grilla = document.getElementById("grilla");

    // Crea y asigna las imágenes en el orden aleatorio a los elementos img
    for (var i = 0; i < imagenesEo.length; i++) {
        let j = i + 1;
        let cadaImagenQuevoyApintar = "<img id='" + imagenesEo[i].id + "' class='DragContainer' src='" + imagenesEo[i].src + "' draggable='true' ondragstart='drag(event)' areaDondeSoltar='" + imagenesEo[i].area + "'></img>";
        grilla.innerHTML += cadaImagenQuevoyApintar;
    }
}


let piezaCorrectaSound = new Audio('/media/piezacorrecta.mp3');
let gameOverSound = new Audio('/media/gameover.mp3');






// Llama a la función para cargar las imágenes en un orden aleatorio después de que el DOM se haya cargado completamente
document.addEventListener("DOMContentLoaded", function() {
    cargarImagenesAleatorias();
});




// Función que se activa cuando un elemento arrastrado se encuentra sobre un área que puede recibirlo.
function allowDrop(ev) {
    ev.preventDefault();
}

// Función que se activa cuando comienza a arrastrar un elemento.
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

// Función que se activa cuando se suelta un elemento.
function drop(ev, areaId) {
    ev.preventDefault();
    var idElementQueSeArrastra = ev.dataTransfer.getData("text");
    var imagenQueSeArrastra = document.getElementById(idElementQueSeArrastra);
    var zonaCorrectaParaSoltarImagen = document.getElementById(areaId);
    var piezasCorrectas = 0;
    


    if (imagenQueSeArrastra.getAttribute('areaDondeSoltar') === zonaCorrectaParaSoltarImagen.id) {
        zonaCorrectaParaSoltarImagen.appendChild(imagenQueSeArrastra);
        piezaCorrectaSound.play();
    }
}

// Función para verificar si el rompecabezas está completo
function verificarRompecabezasCompleto() {
    // Verifica si todas las piezas están en su lugar correcto
    var piezasCorrectas = 0;

    // Verifica que cada área tenga una imagen con el atributo areaDondeSoltar correspondiente
    for (var i = 1; i <= 9; i++) {
        var area = document.getElementById("div" + i);
        var pieza = area.querySelector(".DragContainer");

        if (pieza && pieza.getAttribute("areaDondeSoltar") === "div" + i) {
            piezasCorrectas++;
        }
    
    }
  if (piezasCorrectas === 9) {
            alert("¡Has completado el rompecabezas! FELICIDADES");
            alert("Te quedaron " + timeLeft + ' Segundos ' + "para terminar");
            window.location.href = "logrado.html"; // Redirige a la página de juego
        }
    // Si todas las piezas están en su lugar correcto
    
}

// Llama a la función de verificación después de cada movimiento (en el evento "dragend")
document.addEventListener("drop", verificarRompecabezasCompleto);

// Tiempo límite en segundos
const TIME_LIMIT = 10;

let timePassed = 0;
let timeLeft = TIME_LIMIT;

let gameInterval = setTimeout(cuentaAtras, 1000);

function cuentaAtras() {
    timePassed++;
    timeLeft = TIME_LIMIT - timePassed;

    let timerElement = document.getElementById('timer');
    timerElement.textContent = 'Te quedan ' + timeLeft + ' Segundos ';

    if (timeLeft <= 0) {
        gameOverSound.play();
        alert("¡TIEMPO!"); // Muestra un mensaje de tiempo agotado
        let result = confirm("¿Quieres volver a jugar?");
        if (result) {
            window.location.href = "index.html"; // Redirige a la página de juego
        } else {
            window.location.href = "adios.html"; // Redirige a la página de inicio
        }
    }
    else {
        gameInterval = setTimeout(cuentaAtras, 1000);
    }
}

window.onload = function sonido() {
          var audio = document.getElementById("miAudio");
          var playButton = document.getElementById("playButton");
          var stopButton = document.getElementById("stopButton");

          playButton.addEventListener("click", function() {
              audio.play();
          });

          stopButton.addEventListener("click", function() {
              audio.pause();
              audio.currentTime = 0;
          });
      };

      