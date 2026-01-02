# BreboTeam TWA - Trusted Web Activity dla Google Play Store

## Spis treści

1. [O projekcie](#o-projekcie)
2. [Wymagania wstępne](#wymagania-wstępne)
3. [Szybki start](#szybki-start)
4. [Szczegółowa instrukcja instalacji](#szczegółowa-instrukcja-instalacji)
5. [Konfiguracja projektu](#konfiguracja-projektu)
6. [Budowanie aplikacji](#budowanie-aplikacji)
7. [Weryfikacja domeny](#weryfikacja-domeny)
8. [Publikacja w Google Play Store](#publikacja-w-google-play-store)
9. [Rozwiązywanie problemów](#rozwiązywanie-problemów)
10. [FAQ](#faq)

---

## O projekcie

BreboTeam to profesjonalna aplikacja PWA do zarządzania czasem pracy i projektami. Ten projekt zawiera kompletne narzędzia do spakowania aplikacji jako Trusted Web Activity (TWA) i opublikowania jej w Google Play Store.

### Czym jest TWA?

Trusted Web Activity to technologia Google, która pozwala na opakowanie istniejącej aplikacji webowej (PWA) w natywną aplikację Android. Korzyści:

- **Aktualizacje bez instalacji** - zmiany w aplikacji są widoczne natychmiast
- **Mniejszy rozmiar** - brak duplikacji kodu
- **Natywne doświadczenie** - pełnoekranowy tryb, integracja z systemem
- **Dostęp do Play Store** - łatwiejsze odkrywanie przez użytkowników

---

## Wymagania wstępne

### 1. Node.js (v18 lub wyższy)

```bash
# Sprawdź wersję
node --version

# Instalacja (jeśli nie zainstalowany)
# Windows: https://nodejs.org/
# Mac: brew install node
# Linux: sudo apt install nodejs
```

### 2. Java JDK 17

```bash
# Sprawdź wersję
java -version

# Instalacja
# Windows/Mac/Linux: https://adoptium.net/
# Wybierz: Eclipse Temurin 17 (JDK)
```

**WAŻNE:** Wymagana jest dokładnie wersja 17. Nowsze wersje mogą powodować problemy z kompatybilnością.

### 3. Android SDK (opcjonalne do testowania lokalnego)

Bubblewrap automatycznie pobierze wymagane komponenty, ale dla zaawansowanych operacji:

```bash
# Instalacja Android SDK Command Line Tools
# Pobierz z: https://developer.android.com/studio#command-line-tools
```

---

## Szybki start

### Krok 1: Pobierz projekt

```bash
git clone <repository-url>
cd breboteam-twa
```

### Krok 2: Uruchom skrypt budowania

**Windows:**
```batch
build.bat
```

**Linux/Mac:**
```bash
chmod +x build.sh
./build.sh
```

### Krok 3: Postępuj z instrukcjami na ekranie

Skrypt przeprowadzi Cię przez:
- Instalację Bubblewrap
- Konfigurację projektu (klucze podpisywania)
- Budowanie pakietu
- Generowanie plików weryfikacyjnych

---

## Szczegółowa instrukcja instalacji

### Ręczna instalacja Bubblewrap

Jeśli automatyczna instalacja nie działa:

```bash
# Instalacja globalna
npm install -g @bubblewrap/cli

# Weryfikacja
bubblewrap --version
```

### Konfiguracja środowiska

Utwórz plik `.env` w katalogu projektu:

```env
# Ścieżki do narzędzi (jeśli nie w PATH)
JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot
ANDROID_HOME=C:\Users\[username]\AppData\Local\Android\Sdk
```

---

## Konfiguracja projektu

### Struktura plików

```
breboteam-twa/
├── build.sh              # Skrypt budowania (Linux/Mac)
├── build.bat             # Skrypt budowania (Windows)
├── twa-manifest.json     # Konfiguracja TWA (pre-definiowana)
├── README.md             # Ten plik
├── signing-key-info.txt  # Informacje o kluczu (generowany)
├── android-project/      # Projekt Android (generowany)
└── gradle/               # Gradle wrapper (generowany)
```

### Klucz podpisywania

**KRYTYCZNE:** Podczas inicjalizacji zostaniesz poproszony o utworzenie klucza podpisywania.

**Zapisz te informacje w bezpiecznym miejscu:**
- Lokalizacja keystore: `./breboteam-release.keystore`
- Alias klucza: `breboteam_key`
- Hasło keystore: **[TWÓJ-WYBOR]**
- Hasło klucza: **[TWÓJ-WYBOR]**

⚠️ **UWAGA:** Bez tego klucza NIE będziesz mógł aktualizować aplikacji w Google Play Store!

### Konfiguracja TWA (twa-manifest.json)

Główne ustawienia:

| Parametr | Wartość | Opis |
|----------|---------|------|
| `packageName` | `io.minimax.breboteam` | Unikalny identyfikator aplikacji |
| `host` | `ogxhm8fvphgw.space.minimax.io` | Adres hosta PWA |
| `startUrl` | `/` | URL startowy |
| `name` | `BreboTeam` | Pełna nazwa aplikacji |
| `shortName` | `BreboTeam` | Krótka nazwa |
| `themeColor` | `#3b82f6` | Kolor motywu |
| `backgroundColor` | `#020617` | Kolor tła |
| `display` | `standalone` | Tryb wyświetlania |

---

## Budowanie aplikacji

### Automatycznie (zalecane)

```bash
# Linux/Mac
./build.sh

# Windows
build.bat
```

### Ręcznie

```bash
# Krok 1: Inicjalizacja
bubblewrap init --manifest https://ogxhm8fvphgw.space.minimax.io/manifest.json

# Odpowiedz na pytania:
# - Application name: BreboTeam
# - Application ID: io.minimax.breboteam
# - Create new keystore: Yes
# - Key store password: [strong-password]
# - Key password: [strong-password]
# - Validity (years): 25+
# - Name: BreboTeam Developer
# - Organizational Unit: Development
# - City: Warsaw
# - State: Mazovia
# - Country Code: PL

# Krok 2: Budowanie
bubblewrap build
```

### Wynik budowania

Po udanym budowaniu otrzymasz:

```
app-release-bundle.aab      # Pakiet do Play Store (wymagany)
app-release-signed.apk      # Do testów na urządzeniu
assetlinks.json             # Do weryfikacji domeny
breboteam-release.keystore  # Klucz podpisywania (BĄDŹ OSTROŻNY!)
```

---

## Weryfikacja domeny

### Dlaczego to ważne?

Bez poprawnej weryfikacji domeny aplikacja będzie wyświetlać pasek URL Chrome zamiast pełnoekranowego trybu natywnego.

### Krok 1: Pobierz assetlinks.json

Plik został wygenerowany w katalogu projektu.

### Krok 2: Prześlij na serwer

Prześlij plik do katalogu `.well-known/` na swoim serwerze:

```bash
# Via SCP (Linux/Mac)
scp assetlinks.json user@ogxhm8fvphgw.space.minimax.io:.well-known/

# Via FTP
# Prześlij do: /.well-known/assetlinks.json
```

### Krok 3: Weryfikacja

Sprawdź, czy plik jest dostępny:

```bash
curl https://ogxhm8fvphgw.space.minimax.io/.well-known/assetlinks.json
```

Oczekiwany wynik:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "io.minimax.breboteam",
    "sha256_fingerprint": "XX:XX:XX:..."
  }
}]
```

### Generowanie assetlinks.json ręcznie

Jeśli plik nie został wygenerowany:

```bash
# Pobierz fingerprint klucza
keytool -list -v -keystore breboteam-release.keystore -alias breboteam_key

# Skopiuj SHA-256 fingerprint
# Następnie utwórz assetlinks.json:
```

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "io.minimax.breboteam",
    "sha256_fingerprint": "TWÓJ-FINGERPRINT-HERE"
  }
}]
```

---

## Publikacja w Google Play Store

### Krok 1: Utwórz konto deweloperskie

1. Wejdź na [Google Play Console](https://play.google.com/console)
2. Zapłać jednorazową opłatę rejestracyjną ($25 USD)
3. Zweryfikuj konto

### Krok 2: Utwórz nową aplikację

1. Kliknij "Create App"
2. Wypełnij:
   - **Name:** BreboTeam
   - **Default language:** Polish (pl)
   - **App type:** Android App (TWA)
3. Kliknij "Create"

### Krok 3: Wypełnij informacje o aplikacji

#### Sklep (Store listing)

| Pole | Wartość |
|------|---------|
| **Title** | BreboTeam |
| **Short description** | Profesjonalna aplikacja do zarządzania czasem pracy |
| **Full description** | (Pełny opis - patrz poniżej) |

**Pełny opis (PL):**

```
BreboTeam to profesjonalna aplikacja do kompleksowego zarządzania czasem pracy i projektami. Idealne rozwiązanie dla firm, freelancerów i zespołów projektowych.

GŁÓWNE FUNKCJE:
• Śledzenie czasu pracy - łatwe dodawanie i zarządzanie wpisami
• Kalendarz - wizualizacja dni pracy i wolnych
• Projekty - tworzenie i monitorowanie projektów
• Statystyki - szczegółowe raporty i analizy
• Eksport - generowanie raportów do Excel i WhatsApp
• Szablony AI - automatyczne tworzenie raportów
• Tryb offline - pełna funkcjonalność bez internetu
• Wiele motywów - dark, light i onyx

ZALETY:
✓ Intuicyjny interfejs
✓ Bezpieczne przechowywanie danych
✓ Synchronizacja między urządzeniami
✓ Regularne aktualizacje
✓ Polska wersja językowa

Zacznij efektywniej zarządzać czasem pracy już dziś!
```

#### Grafika

Przygotuj i prześlij:

| Typ | Rozmiar | Wymagania |
|-----|---------|-----------|
| **Ikona aplikacji** | 512x512 px | PNG, przezroczystość opcjonalna |
| **Grafika wyróżniająca** | 1024x500 px | PNG/JPEG |
| **Zrzuty ekranu** | Zależne od urządzenia | 2-8 sztuk |

Zrzuty ekranu (rekomendowane):
1. Ekran główny z kalendarzem
2. Formularz dodawania wpisu
3. Lista wpisów
4. Statystyki
5. Zarządzanie projektami

### Krok 4: Prześlij pakiet AAB

1. Przejdź do sekcji "Testing" > "Internal testing"
2. Kliknij "Create new release"
3. Prześlij plik `app-release-bundle.aab`
4. Wypełnij informacje o wersji
5. Kliknij "Save" i "Review release"

### Krok 5: Wypełnij Testy i Treść

Przejdź przez wszystkie wymagane sekcje:

- **Testy** - Wybór testów (Automatyczne lub Zamknięte)
- **Treść aplikacji** - Klasyfikacja wiekowa, deklaracje
- **Ceny i dystrybucja** - Dystrybucja globalna

### Krok 6: Opublikuj

1. Kliknij "Start rollout to Internal testing"
2. Poczekaj na weryfikację (zazwyczaj kilka godzin)
3. Przenieś do "Closed testing" (testy z beta testerami)
4. Po akceptacji - "Open testing" (publiczna beta)
5. Finalnie - "Production" (pełna publikacja)

---

## Rozwiązywanie problemów

### Problem: Bubblewrap nie instaluje się

```bash
# Spróbuj z uprawnieniami administratora
sudo npm install -g @bubblewrap/cli

# Lub użyj nvm do zarządzania Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
npm install -g @bubblewrap/cli
```

### Problem: Błąd Java JDK

```bash
# Sprawdź wersję Java
java -version

# Ustaw JAVA_HOME (Linux/Mac)
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Windows - zmienna systemowa
# JAVA_HOME = C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot
```

### Problem: assetlinks.json nie weryfikuje się

1. Sprawdź, czy plik jest dostępny przez HTTPS
2. Upewnij się, że nagłówek Content-Type to `application/json`
3. Zweryfikuj format JSON
4. Sprawdź, czy fingerprint SHA-256 jest poprawny

```bash
# Weryfikacja dostępności
curl -I https://domena/.well-known/assetlinks.json

# Sprawdzenie Content-Type
curl -sI https://domena/.well-known/assetlinks.json | grep -i content-type
```

### Problem: Aplikacja wyświetla pasek URL

Oznacza to problem z weryfikacją domeny:

1. Sprawdź `assetlinks.json` na serwerze
2. Zweryfikuj fingerprint SHA-256
3. Upewnij się, że aplikacja jest podpisana tym samym kluczem

### Problem: Błąd podczas budowania

```bash
# Wyczyść projekt
bubblewrap clean

# Spróbuj ponownie
bubblewrap build
```

### Problem: Nie można zainstalować APK

1. Włącz "Instalacja z nieznanych źródeł" w ustawieniach Androida
2. Dla Android 8+: Przyznaj uprawnienia dla przeglądarki
3. Sprawdź, czy APK jest poprawnie podpisany

---

## FAQ

### Czy muszę umieć programować w Kotlinie/Java?

Nie. Bubblewrap tworzy kompletny projekt Android. Ty tylko konfigurujesz i budujesz.

### Czy aplikacja będzie się aktualizować automatycznie?

Tak. Wszystkie zmiany w PWA są natychmiast widoczne w aplikacji TWA.

### Co jeśli stracę klucz podpisywania?

**NIE MOŻESZ** opublikować aktualizacji. Będziesz musiał utworzyć nową aplikację w Play Store z nowym ID.

### Jak często mogę aktualizować aplikację?

Bez ograniczeń. Aktualizacje mogą być publikowane w dowolnym momencie.

### Czy muszę płacić za publikację?

Jednorazowa opłata $25 USD za konto deweloperskie Google. Brak opłat za publikację.

### Jak długo trwa weryfikacja w Play Store?

- Weryfikacja początkowa: 1-3 dni robocze
- Aktualizacje: zazwyczaj kilka godzin

### Czy mogę użyć własnej domeny?

Tak. Zmień `host` w `twa-manifest.json` na swoją domenę.

### Jak przetestować aplikację przed publikacją?

```bash
# Zainstaluj APK na urządzeniu
adb install app-release-signed.apk

# Lub prześlij do wewnętrznego testowania w Play Console
```

### Czy TWA działa na iOS?

Nie. TWA to technologia wyłącznie dla Android. Dla iOS użyj Apple App Store (wymaga osobnego procesu).

---

## Wsparcie

W razie problemów:

1. Sprawdź [dokumentację Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
2. Przeszukaj [Stack Overflow](https://stackoverflow.com/) z tagiem `bubblewrap`
3. Sprawdź [oficjalne przykłady TWA](https://github.com/GoogleChrome/samples/tree/gh-pages/web-bluetooth)

---

## Licencja

Ten projekt jest częścią aplikacji BreboTeam.

**© 2024 BreboTeam**

---

Wygenerowano: 2024-12-30
Wersja dokumentacji: 1.0
