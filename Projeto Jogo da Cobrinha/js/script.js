let canvas = document.querySelector('#snake');
// Vai renderizar o que acontece dentro do canvas
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
// Tamanho
snake[0] = {
    x: 8 * box, 
    y: 8 * box
}

// Variável da direção da cobrinha
let direction = 'right';

// Variável da comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criaBG() {
    context.fillStyle = 'lightgreen';
    // Vai desenhar o bg na tela
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    // Percorrendo o array da cobrinha
   for (i = 0; i < snake.length; i++) {
       context.fillStyle = 'green';
       // Tamanho
       context.fillRect(snake[i].x, snake[i].y, box, box);
   }
}

// Criando a comida
function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

// Evento do teclado
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {
    // Evitando que a cobrinha saia do canvas
    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 15 * box;

    // Fim de jogo
    // Checando para ver se a cabeça chocar com o corpo
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[1].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over!');
        }
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Coordenadas
    if (direction == 'right') snakeX += box;
    if (direction == 'left') snakeX -= box;
    if (direction == 'up') snakeY -= box;
    if (direction == 'down') snakeY += box;

    // Aumentando o tamanho da cobrinha
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Criando a cabeça da cobrinha
    let newHead = {
        x: snakeX, 
        y: snakeY
    }

    snake.unshift(newHead);

    criaBG();
    criarCobrinha();
    drawFood();
}

// Intervalo para iniciar o jogo
let jogo = setInterval(iniciarJogo, 100);

