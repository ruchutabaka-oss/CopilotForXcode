# Strona muzyczna

Lekka, statyczna strona do prezentowania, odtwarzania i pobierania własnych
utworów. Nie wymaga instalowania pakietów ani budowania aplikacji.

## Dodawanie muzyki

1. Skopiuj pliki audio do folderu `music/`.
2. Otwórz `tracks.js` i dodaj wpis dla każdego utworu do tablicy
   `window.MUSIC_TRACKS`. Przykład:

   ```js
   window.MUSIC_TRACKS = [
       {
           title: "Mój utwór",
           release: "Single · 2026",
           file: "music/moj-utwor.mp3",
       },
   ];
   ```

3. W `index.html` podmień nazwę artysty, opis i adres kontaktowy. Możesz też
   umieścić własne zdjęcia i okładki w folderze `covers/` i dostosować stronę.

Każdy wpis na liście otrzymuje odtwarzacz i bezpośredni link do pobrania
pliku. Stronę oraz pliki audio należy opublikować razem na hostingu
obsługującym statyczne pliki. Link do pobrania pobiera plik pojedynczego
utworu — strona nie tworzy archiwum ZIP.

## Podgląd lokalny

W katalogu `music-site/` uruchom:

```sh
python3 -m http.server 8000
```

Następnie otwórz `http://localhost:8000`. Zatrzymaj serwer skrótem
`Ctrl+C`.
