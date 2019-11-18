// Opzet van de game

let canvas = document.getElementById('gamescreen');
let ctx = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height;

var player = new Image();
player.src = "images/knight.png";

var stone = new Image();
stone.src = "images/stone.png";


// Variabelen in game

var playerHeight = 50;
var playerX = 50;
var playerY = gameHeight - playerHeight;

var jumping = false;

var gravity = 4;

var stoneSpeed = 3;

// Stenen

var stones = [];
stones[0] = {
    x: canvas.width,
    y: canvas.height - 50
}

// Klik op een toets

document.addEventListener("keydown", jump); // klik op een toets om te springen

function jump() {
    if (jumping == false) { // als je al in de lucht bent, mag je niet nogmaals springen
        jumping = true;
        ctx.clearRect(playerX, playerY, player.width, playerHeight);
        gravity = -gravity;

        setTimeout(function () {
            gravity = -gravity;
        }, 400);
    }
}

// Tekenen van onderdelen in de game / frames updaten

function drawGame() {
    for (var i = 0; i < stones.length; i++) {
        ctx.drawImage(stone, stones[i].x, stones[i].y);

        ctx.clearRect(stones[i].x + stone.width, stones[i].y, stone.width, stone.height);

        stones[i].x -= stoneSpeed;

        if (stones[i].x == gameWidth-100*stoneSpeed) {
            stones.push({
                x: canvas.width,
                y: canvas.height - 50
            })

            stoneSpeed = Math.ceil(Math.random()*5);
                    console.log(stoneSpeed);

        }

    }


    playerY += gravity; // zwaartekracht op speler

    if (playerY + playerHeight >= gameHeight) { // collision met de grond
        playerY = gameHeight - playerHeight;
        jumping = false;
    }

    ctx.clearRect(playerX, playerY, player.width, playerHeight); // update speler frames
    ctx.drawImage(player, playerX, playerY);

    requestAnimationFrame(drawGame);
}

drawGame();
