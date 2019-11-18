// Opzet van de game:
let canvas = document.getElementById('gamescreen');
let ctx = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height;

var player = new Image();
player.src = "images/knight.png";
var playerHeight = 50;
var playerWidth = 25;
var playerX = 50;
var playerY = gameHeight - playerHeight; // speler staat op de bodem

var stone = new Image();
stone.src = "images/stone.png";


// Score laten zien:
var score = 0;

var scoreText = score;
ctx.fillStyle = "#ffffff";
ctx.font = "20px 'Press Start 2P'";


// Snelheden en andere variabelen die het spel laten bewegen:
var jumping = false;

var jumpSpeed = 4;

var stoneSpeed = 5;
var tussenAfstand = 0; // extra afstand tussen stenen, bovenop de 100x stoneSpeed 


// Stenen:
var stones = [];
stones[0] = {
    width: 50,
    x: canvas.width,
    y: canvas.height - 50
}

// Klik op een toets om te springen:
document.addEventListener("keydown", jump); // klik op een toets om te springen
document.addEventListener("touchstart", jump); // tap om te springen

function jump() {
    if (jumping == false) { // als je al in de lucht bent, mag je niet nogmaals springen
        jumping = true;
        ctx.clearRect(playerX, playerY, playerWidth, playerHeight);
        jumpSpeed = -jumpSpeed;

        setTimeout(function () { // na 0.4 seconden val je weer omlaag
            jumpSpeed = -jumpSpeed;
        }, 400);
    }
}

// Tekenen van onderdelen in de game / frames updaten:
function drawGame() {
    for (var i = 0; i < stones.length; i++) {
        ctx.drawImage(stone, stones[i].x, stones[i].y); // update steen frames
        ctx.clearRect(stones[i].x + stone.width, stones[i].y, stone.width, stone.height);

        stones[i].x -= stoneSpeed; // stenen bewegen naar links

        // score bijhouden, over steen = +1 punt, steen raken = punten gereset:
        if (stones[i].x >= playerX + playerWidth - 3 && stones[i].x <= playerX + playerWidth) {
            if (playerY + playerHeight < stones[i].y) {
                score++;
            }
            if (playerY + playerHeight >= stones[i].y) {
                score = 0;
            }
        }

        // update scoreboard:
        ctx.clearRect(gameWidth - 80, 0, 100, 100);
        ctx.fillText(score, gameWidth - 75, 50);


        // als de de steen 100x stoneSpeed vanaf de rechterwand is, doe dan:
        if (stones[i].x == (gameWidth + tussenAfstand) - 100 * stoneSpeed) {
            tussenAfstand = Math.ceil(Math.random() * 200); // genereer random extra afstand tussen de volgende stenen
            stones.push({
                width: 50,
                x: canvas.width + tussenAfstand,
                y: canvas.height - 50
            })
        }
    }

    playerY += jumpSpeed; // zwaartekracht op speler

    // collision met grond: 
    if (playerY + playerHeight >= gameHeight) {
        playerY = gameHeight - playerHeight;
        jumping = false;
    }


    ctx.clearRect(playerX, playerY, playerWidth, playerHeight); // update speler frames
    ctx.drawImage(player, playerX, playerY);

    requestAnimationFrame(drawGame);
}



drawGame();
