const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");

const gameScreen =
    document.getElementById("gameScreen");

const scoreText =
    document.getElementById("scoreText");

const speedScreen =
    document.getElementById("speedScreen");

const slowBtn =
    document.getElementById("slowBtn");

const mediumBtn =
    document.getElementById("mediumBtn");

const fastBtn =
    document.getElementById("fastBtn");

const backToMapBtn =
    document.getElementById("backToMapBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const backMenuBtn =
    document.getElementById("backMenuBtn");

const pauseScreen =
    document.getElementById("pauseScreen");

const resumeBtn =
    document.getElementById("resumeBtn");

const restartBtn =
    document.getElementById("restartBtn");

const pauseMenuBtn =
    document.getElementById("pauseMenuBtn");

const gameOverPopup =
    document.getElementById("gameOverPopup");

const finalScore =
    document.getElementById("finalScore");

const restartPopupBtn =
    document.getElementById("restartPopupBtn");

const menuPopupBtn =
    document.getElementById("menuPopupBtn");

let gameSpeed = 150;
let freakWalls = [];
let snake;
let food;
let dx;
let dy;
let score;
let gameLoopInterval;
let currentMap;
let walls = [];
let paused = false;

function startGame(mapId) {

    currentMap = mapId;

    mapScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    snake = [
        { x: 200, y: 200 }
    ];

    food = randomFood();
    if (currentMap === "freak") {

        generateFreakWalls();

    }

    dx = 20;
    dy = 0;

    score = 0;

    clearInterval(gameLoopInterval);

    gameLoopInterval =
        setInterval(gameLoop, gameSpeed);

}

function randomFood() {

    let foodPos;

    let valid = false;

    while (!valid) {

        foodPos = {

            x: Math.floor(Math.random() * 20) * 20,
            y: Math.floor(Math.random() * 20) * 20

        };

        valid = true;

        // cek tabrak dinding
        walls.forEach(w => {

            if (

                foodPos.x >= w.x &&
                foodPos.x < w.x + w.w &&
                foodPos.y >= w.y &&
                foodPos.y < w.y + w.h

            ) {

                valid = false;

            }

        });

        // cek obstacle freak
        if (currentMap === "freak") {

            freakWalls.forEach(w => {

                if (

                    foodPos.x >= w.x &&
                    foodPos.x < w.x + w.w &&
                    foodPos.y >= w.y &&
                    foodPos.y < w.y + w.h

                ) {

                    valid = false;

                }

            });

        }

    }

    return foodPos;

}
function generateFreakWalls() {

    freakWalls = [];

    for (let i = 0; i < 5; i++) {

        let randomWall = {

            x: Math.floor(Math.random() * 18) * 20,
            y: Math.floor(Math.random() * 18) * 20,
            w: 20,
            h: 20

        };

        freakWalls.push(randomWall);

    }

}

function drawSnake() {

    snake.forEach(part => {

        ctx.fillStyle = "green";

        ctx.fillRect(
            part.x,
            part.y,
            20,
            20
        );

    });

}

function drawFood() {

    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x,
        food.y,
        20,
        20
    );

}

function moveSnake() {

    let head = {

        x: snake[0].x + dx,
        y: snake[0].y + dy

    };
    mapCollision(head);

    // tembus dinding
    if (head.x >= 400)
        head.x = 0;

    if (head.x < 0)
        head.x = 380;

    if (head.y >= 400)
        head.y = 0;

    if (head.y < 0)
        head.y = 380;

    if (currentMap === "squares") {

        let left = 60;
        let right = 340;

        let top = 60;
        let bottom = 340;

        if (head.x >= 400)
            head.x = 0;

        if (head.x < 0)
            head.x = 380;

        if (head.y >= 400)
            head.y = 0;

        if (head.y < 0)
            head.y = 380;

    }

    snake.unshift(head);

    if (
        head.x === food.x &&
        head.y === food.y
    ) {
        playSound(sound.eat)

        if (currentMap === "classic") {

            score += 10;

        }
        else if (currentMap === "squares") {

            score += 10;

        }
        else if (currentMap === "outer") {

            score += 15;

        }
        else if (currentMap === "maze") {

            score += 30;

        }
        else if (currentMap === "melting") {

            score += 40;

        }
        else if (currentMap === "freak") {

            score += 50;

        }

        scoreText.innerHTML =
            "Score : " + score;

        food = randomFood();

        unlockMaps(score);

    }
    else {

        snake.pop();

    }

}

function drawMap() {

    walls = [];

    // =========================
    // CLASSIC
    // =========================

    if (currentMap === "classic") {

        // kosong
    }

    // =========================
    // SQUARES
    // =========================

    if (currentMap === "squares") {

        walls = [

            // atas
            { x: 100, y: 100, w: 200, h: 20 },

            // bawah
            { x: 100, y: 280, w: 200, h: 20 },

            // kiri atas
            { x: 100, y: 120, w: 20, h: 60 },

            // kiri bawah
            { x: 100, y: 220, w: 20, h: 60 },

            // kanan atas
            { x: 280, y: 120, w: 20, h: 60 },

            // kanan bawah
            { x: 280, y: 220, w: 20, h: 60 }

        ];

    }

    // =========================
    // OUTER
    // =========================

    if (currentMap === "outer") {

        ctx.strokeStyle = "black";

        ctx.lineWidth = 6;

        ctx.strokeRect(
            0,
            0,
            400,
            400
        );

    }

    // =========================
    // MAZE
    // =========================

    if (currentMap === "maze") {

        walls = [

            { x: 80, y: 80, w: 20, h: 120 },
            { x: 80, y: 180, w: 200, h: 20 },
            { x: 260, y: 80, w: 20, h: 120 },

            { x: 120, y: 260, w: 200, h: 20 },
            { x: 200, y: 260, w: 20, h: 100 }

        ];

    }

    // =========================
    // MELTING
    // =========================

    if (currentMap === "melting") {

        walls = [

            { x: 80, y: 40, w: 20, h: 160 },
            { x: 240, y: 120, w: 120, h: 20 },

            { x: 80, y: 300, w: 120, h: 20 },

            { x: 260, y: 220, w: 20, h: 140 }

        ];

    }
    if (currentMap === "freak") {

        walls = [];

        freakWalls.forEach(w => {

            walls.push(w);

            ctx.fillStyle = "black";

            ctx.fillRect(
                w.x,
                w.y,
                w.w,
                w.h
            );

        });

    }

    // gambar obstacle
    walls.forEach(w => {

        ctx.fillStyle = "black";

        ctx.fillRect(
            w.x,
            w.y,
            w.w,
            w.h
        );

    });

}

function gameLoop() {

    if (paused) return;

    ctx.clearRect(0, 0, 400, 400);

    drawMap();

    moveSnake();

    checkCollision();

    drawSnake();

    drawFood();

}

document.addEventListener("keydown", function (e) {

    if (e.key === "ArrowUp" && dy === 0) {

        dx = 0;
        dy = -20;

    }

    if (e.key === "ArrowDown" && dy === 0) {

        dx = 0;
        dy = 20;

    }

    if (e.key === "ArrowLeft" && dx === 0) {

        dx = -20;
        dy = 0;

    }

    if (e.key === "ArrowRight" && dx === 0) {

        dx = 20;
        dy = 0;

    }

});
function checkCollision() {
    let head = snake[0];
    //nabrak badan sendiri
    for (let i = 1; i < snake.length; i++) {
        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {
            gameOver();
        }
    }
}

function gameOver() {

    playSound(sound.gameOver);

    clearInterval(gameLoopInterval);

    finalScore.innerHTML =
        "Final Score : " + score;

    gameOverPopup.classList.remove("hidden");

}

function mapCollision(head) {

    if (currentMap === "squares") {

        walls.forEach(w => {

            if (
                head.x >= w.x &&
                head.x < w.x + w.w &&
                head.y >= w.y &&
                head.y < w.y + w.h
            ) {

                gameOver();

            }

        });

    }

    // OUTER
    if (currentMap === "outer") {

        if (
            head.x < 0 ||
            head.x >= 400 ||
            head.y < 0 ||
            head.y >= 400
        ) {

            gameOver();

        }

    }

    // MAZE
    if (currentMap === "maze") {

        walls.forEach(w => {

            if (
                head.x >= w.x &&
                head.x < w.x + w.w &&
                head.y >= w.y &&
                head.y < w.y + w.h
            ) {

                gameOver();

            }

        });

    }

    // MELTING
    if (currentMap === "melting") {

        walls.forEach(w => {

            if (
                head.x >= w.x &&
                head.x < w.x + w.w &&
                head.y >= w.y &&
                head.y < w.y + w.h
            ) {

                gameOver();

            }

        });

    }
    //
    // FREAK
    //
    if (currentMap === "freak") {

        freakWalls.forEach(w => {

            if (
                head.x >= w.x &&
                head.x < w.x + w.w &&
                head.y >= w.y &&
                head.y < w.y + w.h
            ) {

                gameOver();

            }

        });

    }

}
slowBtn.onclick = function () {

    playSound(sound.click);

    gameSpeed = 220;

    speedScreen.classList.add("hidden");

    startGame(selectedMap);

};

mediumBtn.onclick = function () {

    playSound(sound.click);

    gameSpeed = 150;

    speedScreen.classList.add("hidden");

    startGame(selectedMap);

};

fastBtn.onclick = function () {

    playSound(sound.click);

    gameSpeed = 80;

    speedScreen.classList.add("hidden");

    startGame(selectedMap);

};

backToMapBtn.onclick = function () {

    playSound(sound.click);

    speedScreen.classList.add("hidden");

    mapScreen.classList.remove("hidden");

};

canvas.addEventListener(
    "click",
    function (event) {

        // posisi mouse
        const rect =
            canvas.getBoundingClientRect();

        const mouseX =
            event.clientX - rect.left;

        const mouseY =
            event.clientY - rect.top;

        // kepala snake
        const head =
            snake[0];

        // selisih posisi
        const diffX =
            mouseX - head.x;

        const diffY =
            mouseY - head.y;

        // gerak horizontal
        if (
            Math.abs(diffX) >
            Math.abs(diffY)
        ) {

            // kanan
            if (diffX > 0) {

                dx = 20;
                dy = 0;

            }

            // kiri
            else {

                dx = -20;
                dy = 0;

            }

        }

        // gerak vertical
        else {

            // bawah
            if (diffY > 0) {

                dx = 0;
                dy = 20;

            }

            // atas
            else {

                dx = 0;
                dy = -20;

            }

        }

    });

pauseBtn.onclick = function () {

    playSound(sound.click);

    paused = true;

    pauseScreen.classList.remove("hidden");

};

resumeBtn.onclick = function () {

    playSound(sound.click);

    paused = false;

    pauseScreen.classList.add("hidden");

};

restartBtn.onclick = function () {

    paused = false;

    pauseScreen.classList.add("hidden");

    startGame(currentMap);

};

pauseMenuBtn.onclick = function () {

    playSound(sound.click);

    clearInterval(gameLoopInterval);

    paused = false;

    pauseScreen.classList.add("hidden");

    gameScreen.classList.add("hidden");

    menuScreen.classList.remove("hidden");

};

restartPopupBtn.onclick = function () {

    playSound(sound.click);

    gameOverPopup.classList.add("hidden");

    startGame(currentMap);

};

menuPopupBtn.onclick = function () {

    playSound(sound.click);

    gameOverPopup.classList.add("hidden");

    gameScreen.classList.add("hidden");

    mapScreen.classList.add("hidden");

    menuScreen.classList.remove("hidden");

};