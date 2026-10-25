// ===========================
// AUDIO GAME
// ===========================

const sound = {

    eat: new Audio("assets/eat.mp3"),

    click: new Audio("assets/klik.mp3"),

    gameOver: new Audio("assets/gameover.mp3"),

    unlock: new Audio("assets/unlock.mp3")

};


// ===========================
// PLAY SOUND
// ===========================

function playSound(audio){

    audio.pause();

    audio.currentTime = 0;

    audio.play().catch(() => {});

}