window.onload = function() {
    var imagenes = document.querySelectorAll('img');
    var zonas = document.querySelectorAll('[id^="zona"]');
    var dragSrcElement = null;

    imagenes.forEach(function(imagen) {
        imagen.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text', event.target.id);
            dragSrcElement = event.target;
        });

        imagen.addEventListener('dragend', function(event) {
            dragSrcElement = null;
        });
    });

    zonas.forEach(function(zona) {
        zona.addEventListener('dragover', function(event) {
            event.preventDefault();
        });

        zona.addEventListener('drop', function(event) {
            event.preventDefault();
            var idImagen = event.dataTransfer.getData('text');
            var imagen = document.getElementById(idImagen);
            var zonaCorrecta = imagen.dataset.zona;

            if (zona.id !== zonaCorrecta) {
                // Si la zona es incorrecta, no hagas nada 
            } else {
                // Si la zona es correcta, mover la imagen a la zona
                zona.appendChild(imagen);
            }
        });
    });
};