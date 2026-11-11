const trackList = document.querySelector("#track-list");
const catalogStatus = document.querySelector("#catalog-status");
const playerBar = document.querySelector("#player-bar");
const playerTitle = document.querySelector("#player-title");
const audioPlayer = document.querySelector("#audio-player");
const playerError = document.querySelector("#player-error");
const tracks = Array.isArray(window.MUSIC_TRACKS) ? window.MUSIC_TRACKS : [];

function createTrackRow(track, index) {
    const row = document.createElement("li");
    row.className = "track-row";

    const trackIdentity = document.createElement("div");
    trackIdentity.className = "track-identity";

    const number = document.createElement("span");
    number.className = "track-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const playButton = document.createElement("button");
    playButton.className = "track-play";
    playButton.type = "button";
    playButton.setAttribute("aria-label", `Odtwórz ${track.title}`);
    playButton.textContent = "▶";
    playButton.addEventListener("click", () => playTrack(track));

    const title = document.createElement("span");
    title.className = "track-title";
    title.textContent = track.title;

    trackIdentity.append(number, playButton, title);

    const release = document.createElement("span");
    release.className = "track-release";
    release.textContent = track.release || "Singiel";

    const download = document.createElement("a");
    download.className = "track-download";
    download.href = track.file;
    download.download = "";
    download.setAttribute("aria-label", `Pobierz utwór ${track.title}`);
    download.innerHTML = '<span aria-hidden="true">↓</span> MP3';

    row.append(trackIdentity, release, download);
    return row;
}

function playTrack(track) {
    playerError.textContent = "";
    playerBar.hidden = false;
    playerTitle.textContent = track.title;
    audioPlayer.src = track.file;
    audioPlayer.play().catch(() => {
        playerError.textContent = "Nie udało się odtworzyć utworu. Sprawdź, czy plik jest dostępny.";
    });
}

if (tracks.length === 0) {
    catalogStatus.textContent = "Lista utworów jest jeszcze pusta. Dodaj pliki i wpisy w tracks.js, aby udostępnić swoją muzykę.";
} else {
    tracks.forEach((track, index) => {
        if (typeof track.title !== "string" || typeof track.file !== "string") {
            console.error(`Pominięto utwór nr ${index + 1}: wpis musi zawierać title i file.`);
            return;
        }

        trackList.append(createTrackRow(track, index));
    });
}

audioPlayer.addEventListener("error", () => {
    playerError.textContent = "Nie udało się wczytać pliku audio. Sprawdź jego nazwę i format.";
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());