# Strona muzyczna

Lekka, responsywna strona artysty do prezentowania, strumieniowego odtwarzania i
pobierania własnych utworów. Działa jako statyczna strona — nie wymaga instalacji
pakietów ani procesu budowania.

## Dodawanie muzyki

1. Skopiuj swoje pliki audio do folderu `music/`.
2. Otwórz `tracks.js` i dodaj wpis dla każdego utworu:

   ```js
   window.MUSIC_TRACKS = [
       {
           title: "Mój utwór",
           release: "Singiel · 2026",
           file: "music/moj-utwor.mp3",
       },
   ];
   ```

   `file` wskazuje ścieżkę do pliku względem `index.html`. Obsługiwane formaty
   zależą od przeglądarki; MP3 jest dobrym wyborem dla szerokiej zgodności.
   Przycisk odtwarzania używa wbudowanego odtwarzacza przeglądarki, a link
   „MP3” umożliwia pobranie pliku.
3. W `index.html` zmień nazwę artysty, opis i adres e-mail. Dodaj swoje linki
   społecznościowe i skopiuj pliki okładek do `covers/`, jeśli chcesz rozszerzyć
   projekt o własne grafiki.

Strona udostępnia bezpośrednie pliki do pobrania — nie tworzy archiwum ZIP.
Publikując ją, umieść razem pliki strony oraz katalog `music/` na hostingu
obsługującym statyczne pliki. Udostępniaj tylko nagrania, do których masz prawa.

## Podgląd lokalny

W katalogu `music-site/` uruchom:

```sh
python3 -m http.server 8000
```

Otwórz `http://localhost:8000` w przeglądarce. Zatrzymaj serwer skrótem
`Ctrl+C`.