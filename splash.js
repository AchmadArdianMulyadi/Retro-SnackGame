const splashScreen =
    document.getElementById("splashScreen");

document.addEventListener(
    "keydown",
    function () {

        splashScreen.style.display = "none";

    }
);

document.addEventListener(
    "click",
    function () {

        playSound(sound.click);

        splashScreen.style.display = "none";

    }
);