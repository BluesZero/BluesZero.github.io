// Obtener elementos del DOM
const videoInput = document.getElementById('videoInput');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const pixelSizeRange = document.getElementById('pixelSizeRange');
const pixelCanvas = document.getElementById('pixelCanvas');
const ctx = pixelCanvas.getContext('2d');

// Declarar la variable video
let video;

// Valor inicial de tamaño de píxel
let pixelSize = parseInt(pixelSizeRange.value, 10);

// Escuchar cambios en la entrada de video
videoInput.addEventListener('change', handleVideo);

function handleVideo(e) {
    const file = e.target.files[0];

    if (file) {
        const videoURL = URL.createObjectURL(file);

        // Mostrar el video seleccionado
        video = document.createElement('video'); // Declarar la variable video
        video.src = videoURL;

        // Cuando el video se cargue, ajustar el tamaño del canvas y aplicar el efecto de píxel art
        video.onloadedmetadata = function () {
            pixelCanvas.width = video.videoWidth;
            pixelCanvas.height = video.videoHeight;
            video.play();

            // Aplicar el efecto de píxel art en cada cuadro del video
            function processFrame() {
                if (!video.paused && !video.ended) {
                    ctx.drawImage(video, 0, 0, pixelCanvas.width, pixelCanvas.height);
                    pixelate(pixelSize); // Tamaño de píxel art
                    requestAnimationFrame(processFrame);
                }
            }

            processFrame();
        };
    }
}

// Botones para controlar la reproducción del video
playButton.addEventListener('click', function () {
    video.play();
});

pauseButton.addEventListener('click', function () {
    video.pause();
});

// Escuchar cambios en el rango de tamaño de píxel
pixelSizeRange.addEventListener('input', function () {
    pixelSize = parseInt(pixelSizeRange.value, 10);
});

function pixelate(pixelSize) {
    const imageData = ctx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
    const data = imageData.data;

    for (let y = 0; y < pixelCanvas.height; y += pixelSize) {
        for (let x = 0; x < pixelCanvas.width; x += pixelSize) {
            const pixelIndex = (y * pixelCanvas.width + x) * 4;
            const red = data[pixelIndex];
            const green = data[pixelIndex + 1];
            const blue = data[pixelIndex + 2];

            // Rellenar un cuadro de píxel con el color promedio
            for (let i = 0; i < pixelSize; i++) {
                for (let j = 0; j < pixelSize; j++) {
                    const index = ((y + i) * pixelCanvas.width + (x + j)) * 4;
                    data[index] = red;
                    data[index + 1] = green;
                    data[index + 2] = blue;
                }
            }
        }
    }

    // Aplicar la imagen pixelada al canvas
    ctx.putImageData(imageData, 0, 0);
}

function applyCRTEffect() {
    const imageData = ctx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
    const data = imageData.data;

    // Aplicar efectos CRT, como distorsión y ruido

    // Aplicar la imagen con efectos CRT al canvas
    ctx.putImageData(imageData, 0, 0);
}
