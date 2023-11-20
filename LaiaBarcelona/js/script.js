// Galería de imágenes para la página "eolica.html"
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
  
  // Galería de imágenes para la página "solar.html"
  var imagenesSol = [
    { id: "drag1", src: "/images/solar/imagen-0.jpg", area: "div1" },
    { id: "drag2", src: "/images/solar/imagen-1.jpg", area: "div2" },
    { id: "drag3", src: "/images/solar/imagen-2.jpg", area: "div3" },
    { id: "drag4", src: "/images/solar/imagen-3.jpg", area: "div4" },
    { id: "drag5", src: "/images/solar/imagen-4.jpg", area: "div5" },
    { id: "drag6", src: "/images/solar/imagen-5.jpg", area: "div6" },
    { id: "drag7", src: "/images/solar/imagen-6.jpg", area: "div7" },
    { id: "drag8", src: "/images/solar/imagen-7.jpg", area: "div8" },
    { id: "drag9", src: "/images/solar/imagen-8.jpg", area: "div9" }
  ];
  
  // Función para cargar las imágenes en un orden aleatorio
  function cargarImagenesAleatorias(galeria) {
    // Mezcla aleatoriamente el orden de las imágenes en el array
    galeria.sort(function() {
      return 0.5 - Math.random();
    });
  
    // Obtén el elemento contenedor donde se cargarán las imágenes
    var grilla = document.getElementById("grilla");
  
    // Crea y asigna las imágenes en el orden aleatorio a los elementos img
    for (var i = 0; i < galeria.length; i++) {
      let j = i + 1;
      let cadaImagenQuevoyApintar = "<img id='" + galeria[i].id + "' class='DragContainer' src='" + galeria[i].src + "' draggable='true' ondragstart='drag(event)' areaDondeSoltar='" + galeria[i].area + "'></img>";
      grilla.innerHTML += cadaImagenQuevoyApintar;
    }
  }
  

  
 
  
  // Llama a la función para cargar las imágenes en un orden aleatorio después de que el DOM se haya cargado completamente
  document.addEventListener("DOMContentLoaded", function() {
    var currentPage = window.location.pathname; // Obtiene la ruta de la página actual
  
    if (currentPage.includes("eolica.html")) {
      cargarImagenesAleatorias(imagenesEo);
    } else if (currentPage.includes("solar.html")) {
      cargarImagenesAleatorias(imagenesSol);
    }
  });
  
  
// Función que se activa cuando un elemento arrastrado se encuentra sobre un área que puede recibirlo.
function allowDrop(ev) {
    ev.preventDefault();
}

// Función que se activa cuando comienza a arrastrar un elemento.
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

let piezaCorrectaSound = new Audio('/media/piezacorrecta.mp3');


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
      timeSound.pause();
      alert("¡Has completado el rompecabezas! FELICIDADES");

      let tiempoPorcentaje = ((timeLeft*100)/TIME_LIMIT);
      
            alert("TIEMPO PORCENTAJE " + tiempoPorcentaje + ' ' + "");
            
            let puntaje = (tiempoPorcentaje + 50);
            
            // Redondear a la cifra entera más cercana
            let puntajeRedondeado = Math.round(puntaje);
            
            // Convertir a un entero
            let puntajeEntero = parseInt(puntajeRedondeado);
            
            alert("Obtuviste " + puntajeEntero + ' PUNTOS En esta prueba ' + "");

                      
                       
                    var currentPage = window.location.pathname; // Obtiene la ruta de la página actual
                
                    if (currentPage.includes("eolica.html")) {
                        window.location.href = "logradoEO.html"; 
                    } else if (currentPage.includes("solar.html")) {
                        window.location.href = "logradoSOL.html"; 
                    }
                      
        }
    
}

function salir() {
  gameOverSound.play();
  var respuesta = confirm('¿Deseas cerrar?');
    if (respuesta) {
      window.location.href = 'adios.html';
  }
}


// Llama a la función de verificación después de cada movimiento (en el evento "dragend")
document.addEventListener("drop", verificarRompecabezasCompleto);




// Tiempo límite en segundos
const TIME_LIMIT = 60;

let timePassed = 0;
let timeLeft = TIME_LIMIT;



let gameInterval = setTimeout(cuentaAtras, 1000);
let timeSound = new Audio('/media/time.mp3');
let gameOverSound = new Audio('/media/gameover.mp3');

function cuentaAtras() {
    timePassed++;
    timeLeft = TIME_LIMIT - timePassed;

    let timerElement = document.getElementById('timer');
    timerElement.textContent = 'Te quedan ' + timeLeft + ' Segundos ';

    if (timeLeft < 16){
      timeSound.play();

    }
    
    
    if (timeLeft <= 0) {

      timeSound.pause();
      timeSound.currentTime = 0;
      gameOverSound.play();
        
        alert("¡TIEMPO!"); // Muestra un mensaje de tiempo agotado
        gameOverSound.play();
        let result = confirm("¿Quieres volver a jugar?");
        if (result) {
          var currentPage = window.location.pathname; // Obtiene la ruta de la página actual
               
              if (currentPage.includes("solar.html")) {
                  window.location.href = "solar.html"; 
              } if (currentPage.includes("eolica.html")) {
                  window.location.href = "eolica.html"; 
              }
            
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
  audio.volume = 0.2; // Establecer volumen al 20%
  audio.play(); // Reproducir automáticamente el archivo de audio

  audio.addEventListener("ended", function() {
      audio.currentTime = 0; // Reiniciar el tiempo de reproducción al inicio
      audio.play(); // Reproducir nuevamente el archivo de audio
  });
};

      