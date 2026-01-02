# Grafika dla Google Play Store - Wymagania i Wytyczne

## Spis treści

1. [Wymagane zasoby](#wymagane-zasoby)
2. [Szczegółowe specyfikacje](#szczegółowe-specyfikacje)
3. [Wytyczne projektowe](#wytyczne-projektowe)
4. [Przykładowe zrzuty ekranu](#przykładowe-zrzuty-ekranu)
5. [Narzędzia do tworzenia](#narzędzia-do-tworzenia)
6. [Weryfikacja jakości](#weryfikacja-jakości)

---

## Wymagane zasoby

### Obowiązkowe (wymagane do publikacji)

| Zasób | Wymiary | Format | Opis |
|-------|---------|--------|------|
| **Ikona aplikacji** | 512x512 px | PNG | Główna ikona w Play Store |
| **Grafika wyróżniająca** | 1024x500 px | PNG/JPEG | Banner na stronie aplikacji |
| **Zrzuty ekranu** | Zależne od urządzenia | PNG/JPEG | Minimum 2, maksymalnie 8 |

### Opcjonalne (zalecane)

| Zasób | Wymiary | Format | Opis |
|-------|---------|--------|------|
| **Film promocyjny** | 30 sekund max | MP4/MOV | Krótki film demonstracyjny |
| **Grafika dla TV** | 1920x1080 px | PNG/JPEG | Dla Android TV |
| **Grafika dla tabletów** | 2048x1440 px | PNG/JPEG | Dla tabletów w Play Store |

---

## Szczegółowe specyfikacje

### Ikona aplikacji (Icon)

```
Rozmiar: 512 x 512 pikseli
Format:  PNG (32-bit RGBA)
Maksymalny rozmiar pliku: 1 MB

Wytyczne:
- Zachowaj margines bezpieczeństwa (padding)
- Użyj przezroczystego tła LUB tło wypełnione kolorem
- Logo powinno zajmować ok. 77% powierzchni
- Zachowaj proporcje oryginalnego logo
- Unikaj efektów 3D i gradientów (opcjonalnie)
- Tytuł/tekst NIE jest wymagany

Margines bezpieczeństwa:
- Tło: 512x512 px (pełny rozmiar)
- Obszar roboczy: ~ 398x398 px (77%)
- Padding: ~ 57 px z każdej strony
```

**Przykładowy układ ikony:**

```
┌─────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░┌───────────────┐░░░░░ │
│ ░░░░░░░░░│               │░░░░░ │
│ ░░░░░░░░░│    LOGO       │░░░░░ │
│ ░░░░░░░░░│               │░░░░░ │
│ ░░░░░░░░░└───────────────┘░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────┘
```

### Grafika wyróżniająca (Feature Graphic)

```
Rozmiar: 1024 x 500 pikseli
Format:  PNG lub JPEG
Maksymalny rozmiar pliku: 1 MB

Wytyczne:
- Nie umieszczaj tekstu w dolnych 250 px
- Użyj tego samego koloru tła co ikona
- Tekst/title powinien być czytelny
- Unikaj zbyt wielu elementów

Zasada bezpiecznego obszaru:
┌─────────────────────────────────────────────────┐
│                                                 │
│  Obszar bezpieczny dla tekstu/logo (górne 250px)│
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Tylko tło/obraz (dolne 250px)                  │
│  - brak tekstu                                  │
│  - brak elementów interaktywnych                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Zrzuty ekranu (Screenshots)

```
Wymiary:
- Telefony: 1080x1920 px (zalecane, akceptowane od 320px)
- Format:  PNG lub JPEG
- Maksymalny rozmiar pliku: 8 MB każdy

Liczba wymagana:
- Minimum: 2 zrzuty ekranu
- Maksimum: 8 zrzutów ekranu
- Zalecane: 4-6 zrzutów

Orientacja:
- Dla każdej orientacji (portret/poziom) możesz dodać osobne zrzuty
- Domyślnie używaj orientacji pionowej (portret)
```

**Zalecane zrzuty ekranu dla BreboTeam:**

1. **Ekran główny z kalendarzem** - Pierwsze wrażenie
2. **Formularz dodawania wpisu** - Główna funkcja
3. **Lista wpisów** - Zarządzanie danymi
4. **Statystyki i raporty** - Wartość dla użytkownika
5. **Zarządzanie projektami** - Funkcje biznesowe
6. **Ustawienia profilu** - Personalizacja

---

## Wytyczne projektowe

### Kolory (zgodne z aplikacją)

```css
/* Główne kolory aplikacji */
--primary: #3b82f6;      /* Niebieski */
--primary-dark: #1d4ed8; /* Ciemniejszy niebieski */
--background: #020617;   /* Ciemny background */
--surface: #1e293b;      /* Powierzchnia kart */
--text: #f8fafc;         /* Tekst główny */
--text-muted: #94a3b8;   /* Tekst pomocniczy */
```

### Typografia

```
Nagłówki: Segoe UI Bold, Arial Bold
Tekst:    Segoe UI Regular, Roboto
Rozmiar:  Minimum 12pt (16px) dla czytelności
```

### Zasady dla zrzutów ekranu

✅ **DO:**

- Używaj jasnego, czytelnego tekstu
- Pokazuj aplikację w najlepszym świetle
- Dodawaj krótkie opisy pod zrzutami
- Używaj zrzutów z różnych sekcji aplikacji
- Zachowaj spójność stylu

❌ **NIE:**

- Nie używaj zrzutów z emulatorów (używaj prawdziwego urządzenia)
- Nie edytuj zrzutów wprowadzająco w błąd
- Nie dodawaj fałszywych przycisków czy funkcji
- Nie używaj rozmytych lub niskiej jakości obrazów
- Nie publikuj zrzutów z danymi osobowymi

---

## Przykładowe zrzuty ekranu

### 1. Ekran główny

```
┌─────────────────────────────────────┐
│  🔙 BreboTeam                   ⚙️  │  ← Header z logo i ustawieniami
├─────────────────────────────────────┤
│                                     │
│     Grudzień 2024                   │  ← Kalendarz
│     Pn Wt Śr Cz Pt So Nd            │
│      1  2  3  4  5  6  7            │
│      8  9 10 11 12 13 14            │
│     15 16 17 18 19 20 21            │
│     22 23 24 25 26 27 28            │
│     29 30 31                        │
│                                     │
├─────────────────────────────────────┤
│  Dodaj wpis +                      │  ← Przycisk akcji
├─────────────────────────────────────┤
│                                     │
│  02.12.2024 (Pon)                   │  ← Lista wpisów
│  08:00 - 16:00 (8h)                 │
│  Praca nad projektem A              │
│                                     │
│  01.12.2024 (Nd)                    │
│  09:00 - 17:00 (7.5h)               │
│  Spotkanie zespołu                  │
│                                     │
└─────────────────────────────────────┘
```

### 2. Formularz wpisu

```
┌─────────────────────────────────────┐
│  🔙 Nowy wpis czasu pracy           │
├─────────────────────────────────────┤
│                                     │
│  Data *                             │
│  ┌─────────────────────────────┐    │
│  │ 02.12.2024              📅 │    │
│  └─────────────────────────────┘    │
│                                     │
│  Godzina rozpoczęcia *              │
│  ┌─────────────────────────────┐    │
│  │ 08:00                      │    │
│  └─────────────────────────────┘    │
│                                     │
│  Godzina zakończenia *              │
│  ┌─────────────────────────────┐    │
│  │ 16:00                      │    │
│  └─────────────────────────────┘    │
│                                     │
│  Przerwa (minuty)                   │
│  ┌─────────────────────────────┐    │
│  │ 30                         │    │
│  └─────────────────────────────┘    │
│                                     │
│  Opis *                             │
│  ┌─────────────────────────────┐    │
│  │ Praca nad projektem...      │    │
│  └─────────────────────────────┘    │
│                                     │
│            ZAPISZ                   │
│         (+ 8.0 godz.)               │
└─────────────────────────────────────┘
```

### 3. Statystyki

```
┌─────────────────────────────────────┐
│  📊 Przegląd                       │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ Dzisiaj     │ │ Ten miesiąc │   │
│  │   8.5h      │ │   156h      │   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ Dni pracy   │ │ Średnia     │   │
│  │    18       │ │   8.7h/dzień│   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  Wykres godzin tygodniowo           │
│  ██████░░░░  Pn                     │
│  ██████████  Wt                     │
│  ████░░░░░░  Śr                     │
│  ████████░░  Cz                     │
│  ░░░░░░░░░░  Pt                     │
│  ░░░░░░░░░░  So                     │
│  ████░░░░░░  Nd                     │
│                                     │
└─────────────────────────────────────┘
```

---

## Narzędzia do tworzenia

### Darmowe narzędzia online

| Narzędzie | Zastosowanie | Link |
|-----------|--------------|------|
| **Canva** | Tworzenie grafik | canva.com |
| **Photopea** | Edycja zrzutów | photopea.com |
| **ezgif** | Optymalizacja GIF | ezgif.com |
| **PNG压缩** | Kompresja PNG | pngcompressor.com |

### Narzędzia desktop

| Narzędzie | Platforma | Zastosowanie |
|-----------|-----------|--------------|
| **GIMP** | Windows/Mac/Linux | Edycja obrazów |
| **Inkscape** | Windows/Mac/Linux | Grafika wektorowa |
| **Shottr** | Windows/Mac | Zrzuty ekranu |
| **ShareX** | Windows | Zrzuty ekranu |

### Tworzenie zrzutów z urządzenia

```bash
# Przez ADB (Android Debug Bridge)
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Przez Chrome DevTools
# 1. Połącz urządzenie przez USB
# 2. Otwórz chrome://inspect
# 3. Wybierz zrzut ekranu
```

---

## Weryfikacja jakości

### Checklist przed publikacją

- [ ] Ikona ma dokładnie 512x512 px
- [ ] Ikona ma przezroczystość (jeśli wymagane) lub pełne tło
- [ ] Grafika wyróżniająca ma 1024x500 px
- [ ] Zrzuty ekranu są w orientacji pionowej
- [ ] Wszystkie zrzuty są tego samego rozmiaru
- [ ] Tekst na zrzutach jest czytelny
- [ ] Brak danych osobowych na zrzutach
- [ ] Rozmiar plików jest poniżej limitu (1MB ikona, 8MB zrzut)
- [ ] Format PNG lub JPEG (bez innych formatów)
- [ ] Kolory są zgodne z brandingiem

### Typowe błędy do uniknięcia

❌ **Ikona ma zły rozmiar** - Upewnij się, że dokładnie 512x512 px

❌ **Zrzuty z emulatora** - Używaj zrzutów z prawdziwego urządzenia

❌ **Zbyt duży tekst** - Upewnij się, że tekst jest czytelny

❌ **Brak spójności** - Zachowaj ten sam styl wszystkich zrzutów

❌ **Dane wrażliwe** - Usuń wszystkie dane osobowe z zrzutów

---

## Szybkie odniesienie

```
╔══════════════════════════════════════════════════════════════════╗
║                  WYMAGANIA GRAFICZNE - PODSUMOWANIE              ║
╠══════════════════════════════════════════════════════════════════╣
║  Ikonka aplikacji:         512x512 px  │  PNG  │  ≤ 1 MB         ║
║  Grafika wyróżniająca:    1024x500 px  │  PNG  │  ≤ 1 MB         ║
║  Zrzuty ekranu (min):      320x px     │  PNG  │  ≤ 8 MB/szt     ║
║  Zrzuty ekranu (zalecane): 1080x1920px │  PNG  │  ≤ 8 MB/szt     ║
║  Liczba zrzutów:           2-8 sztuk   │       │                 ║
╠══════════════════════════════════════════════════════════════════╣
║  Format nazw plików:                                        ║
║  - icon.png, feature-graphic.png                           ║
║  - screenshot1.png, screenshot2.png, ...                   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Pomoc

Jeśli potrzebujesz pomocy przy tworzeniu grafik:

1. **Canva Templates**: Szukaj "Google Play Store" lub "App Icon"
2. **Dokumentacja Google**: [play.google.com/console/help](https://support.google.com/googleplay/android-developer)
3. **Wytyczne design**: [developer.android.com/distribute/google-play/guides](https://developer.android.com/docs/google/play/billing)

---

*Wygenerowano: 2024-12-30*
*Wersja: 1.0*
