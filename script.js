const canvas = document.getElementById("drawingCanvas");
const context = canvas.getContext("2d");
let isDrawing = false;
let isErasing = false;
let selectedColor = "#000"; // Varsayılan çizim rengi

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("touchstart", startDrawingTouch);
canvas.addEventListener("touchmove", drawTouch);
canvas.addEventListener("touchend", stopDrawingTouch);

const eraserButton = document.getElementById("eraserButton");
eraserButton.addEventListener("click", toggleEraser);

const colorButtons = document.querySelectorAll(".color-button");
colorButtons.forEach(button => {
    button.addEventListener("click", changeColor);
});

function startDrawing(event) {
    isDrawing = true;
    draw(event);
}

function draw(event) {
    if (!isDrawing) return;

    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    context.lineWidth = isErasing ? 20 : 2;
    context.lineCap = isErasing ? "square" : "round";
    context.strokeStyle = isErasing ? "#f0f0f0" : selectedColor;

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

function toggleEraser() {
    isErasing = !isErasing;
    eraserButton.classList.toggle("active");

    if (isErasing) {
        context.strokeStyle = "#f0f0f0";
        context.lineCap = "square";
        canvas.style.cursor = "url('img/eraser.png'), auto";
    } else {
        context.strokeStyle = selectedColor;
        context.lineCap = "round";
        canvas.style.cursor = "url('img/pencil.png'), auto";
    }
}

function startDrawingTouch(event) {
    event.preventDefault();
    isDrawing = true;
    drawTouch(event);
}

function drawTouch(event) {
    if (!isDrawing) return;

    const x = event.touches[0].clientX - canvas.offsetLeft;
    const y = event.touches[0].clientY - canvas.offsetTop;

    context.lineWidth = isErasing ? 20 : 2;
    context.lineCap = isErasing ? "square" : "round";
    context.strokeStyle = isErasing ? "#f0f0f0" : selectedColor;

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}

function stopDrawingTouch(event) {
    event.preventDefault();
    isDrawing = false;
    context.beginPath();
}

function changeColor(event) {
    selectedColor = event.target.style.backgroundColor;
    context.strokeStyle = isErasing ? "#f0f0f0" : selectedColor;
}
