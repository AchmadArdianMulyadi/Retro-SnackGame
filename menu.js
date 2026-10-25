const playBtn =
    document.getElementById("playBtn");

const menuScreen =
    document.getElementById("menuScreen");

const mapScreen =
    document.getElementById("mapScreen");

const mapContainer =
    document.getElementById("mapContainer");

const resetBtn =
    document.getElementById("resetBtn");

const backToMenuBtn =
    document.getElementById("backToMenuBtn");

let selectedMap = "";

playBtn.onclick = function () {

    playSound(sound.click);

    menuScreen.classList.add("hidden");

    mapScreen.classList.remove("hidden");

    loadMaps();

};

backToMenuBtn.onclick = function () {

    playSound(sound.click);

    mapScreen.classList.add("hidden");

    menuScreen.classList.remove("hidden");

};

resetBtn.onclick = function () {

    playSound(sound.click);

    localStorage.removeItem(
        "snake_progress"
    );

    alert(
        "Progress berhasil direset!"
    );

    location.reload();

};

function loadMaps() {

    mapContainer.innerHTML = "";

    let progress =
        loadProgress();

    maps.forEach(map => {

        let div =
            document.createElement("div");

        div.classList.add("mapCard");

        div.innerHTML = map.name;

        if (
            !progress.unlocked.includes(map.id)
        ) {

            div.classList.add("locked");

            div.innerHTML += "<br>🔒";

        }
        else {

            div.onclick = function () {

                playSound(sound.click);

                selectedMap = map.id;

                showMapInfo(map.id);

                mapScreen.classList.add("hidden");

                speedScreen.classList.remove("hidden");

            };

        }

        mapContainer.appendChild(div);

    });

}

function showMapInfo(mapId) {

    const info =
        document.getElementById("mapInfo");

    if (mapId === "classic") {

        info.innerHTML = `
        <h3>CLASSIC</h3>

        <p>
            ✔ Tembus dinding.
        </p>

        <p>
            ✔ Tidak memiliki obstacle.
        </p>

        <p>
            ✔ Mendapat 10 score setiap makanan.
        </p>

        <p>
            ✔ Kontrol menggunakan tombol arah atau touchpad.
        </p>
    `;

    }

    if (mapId === "squares") {

        info.innerHTML = `
        <h3>SQUARES</h3>

        <p>
            ✔ Area tengah memiliki dinding.
        </p>

        <p>
            ✔ Tidak boleh menyentuh dinding tengah.
        </p>

        <p>
            ✔ Tersedia 2 pintu menuju area luar.
        </p>

        <p>
            ✔ Mendapat 10 score setiap makanan.
        </p>
    `;

    }

    if (mapId === "outer") {

        info.innerHTML = `
        <h3>OUTER</h3>

        <p>
            ✔ Tidak bisa menembus dinding luar.
        </p>

        <p>
            ✔ Jika menyentuh dinding maka Game Over.
        </p>

        <p>
            ✔ Mendapat 15 score setiap makanan.
        </p>

    `;

    }

    if (mapId === "maze") {

        info.innerHTML = `
        <h3>MAZE</h3>

        <p>
            ✔ Map seperti labirin.
        </p>

        <p>
            ✔ Jika menyentuh Obstacle maka game over.
        </p>

        <p>
            ✔ Mendapat 30 score setiap makanan.
        </p>

    `;

    }

    if (mapId === "melting") {

        info.innerHTML = `
        <h3>MELTING</h3>

        <p>
            ✔ Tidak bisa menembus dinding luar.
        </p>

        <p>
            ✔ Jika menyentuh Obstacle maka game over.
        </p>

        <p>
            ✔ Mendapat 40 score setiap makanan.
        </p>

    `;

    }

    if (mapId === "freak") {

        info.innerHTML = `
        <h3>FREAK</h3>

        <p>
            ✔ Map random setiap kali  masuk game.
        </p>

        <p>
            ✔  Jika menyentuh Obstacle maka game over.
        </p>

        <p>
            ✔ Mendapat 50 score setiap makanan.
        </p>

    `;

    }

}