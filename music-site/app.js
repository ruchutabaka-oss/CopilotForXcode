const trackList = document.querySelector("#track-list");
const catalogStatus = document.querySelector("#catalog-status");
const playerBar = document.querySelector("#player-bar");
const playerTitle = document.querySelector("#player-title");
const audioPlayer = document.querySelector("#audio-player");
const playerError = document.querySelector("#player-error");

function showCatalogError(message) {
    catalogStatus.textContent = message;
    catalogStatus.classList.add("catalog-error");
}

function makeTrackRow(track, index) {
    const row = document.createElement("li");
    row.className = "track-row";

    const number = document.createElement("span");
    number.className = "track-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const playButton = document.createElement("button");
    playButton.className = "track-play";
    playButton.type = "button";
    playButton.setAttribute("aria-label", `Odtwórz ${track.title}`);
    playButton.innerHTML = '<span aria-hidden="true">▶</span>';
    playButton.addEventListener("click", () => {
        playerError.textContent = "";
        playerBar.hidden = false;
        playerTitle.textContent = track.title;
        audioPlayer.src = track.file;
        audioPlayer.play().catch(() => {
            playerError.textContent = "Nie udało się odtworzyć pliku. Sprawdź, czy plik istnieje i jest dostępny.";
        });
    });

    const details = document.createElement("div");
    details.className = "track-details";
    const title = document.createElement("h3");
    title.textContent = track.title;
    const release = document.createElement("p");
    release.textContent = track.release || "Utwór";
    details.append(title, release);

    const download = document.createElement("a");
    download.className = "download-link";
    download.href = track.file;
    download.download = "";
    download.setAttribute("aria-label", `Pobierz ${track.title}`);
    download.innerHTML = 'POBIERZ <span aria-hidden="true">↓</span>';

    row.append(number, playButton, details, download);
    return row;
}

function renderCatalog() {
    if (!Array.isArray(window.MUSIC_TRACKS)) {
        showCatalogError("Nie udało się wczytać listy utworów. Sprawdź plik tracks.js.");
        return;
    }

    const tracks = window.MUSIC_TRACKS;
    const invalidTrack = tracks.find(
        track =>
            !track ||
            typeof track.title !== "string" ||
            !track.title.trim() ||
            typeof track.file !== "string" ||
            !track.file.trim()
    );

    if (invalidTrack) {
        showCatalogError("Lista utworów zawiera nieprawidłowy wpis. Sprawdź plik tracks.js.");
        return;
    }

    if (tracks.length === 0) {
        catalogStatus.textContent = "Wkrótce pojawią się tu moje utwory.";
        return;
    }

    catalogStatus.textContent = `${String(tracks.length).padStart(2, "0")} UTWORÓW`;
    tracks.forEach((track, index) => {
        trackList.append(makeTrackRow(track, index));
    });
}

audioPlayer.addEventListener("error", () => {
    playerError.textContent = "Nie udało się wczytać utworu. Sprawdź ścieżkę do pliku.";
});

renderCatalog();
