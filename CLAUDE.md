# Project Specification: Review Responder MVP
# Role: Senior Fullstack Developer & Product Owner

## 1. Cel Projektu
Stworzenie prostej, działającej aplikacji webowej (MVP), która pomaga małym firmom generować profesjonalne odpowiedzi na opinie klientów (Google/Yelp/Allegro) przy użyciu AI.

## 2. Zasady Główne (Non-Negotiables)
- **KISS (Keep It Simple, Stupid):** Żadnych skomplikowanych frameworków frontendowych (React/Vue/Angular). Żadnych narzędzi do budowania (Webpack/Vite). Czysty HTML/JS.
- **Stack Technologiczny:**
  - Backend: Node.js + Express.
  - Frontend: Vanilla HTML5 + Tailwind CSS (ładowany przez CDN).
  - AI: OpenAI API (model `gpt-4o-mini` dla szybkości i niskich kosztów).
- **Design:** Minimalistyczny, responsywny (Mobile First), estetyka "SaaS".
- **Baza danych:** BRAK. Na tym etapie nie zapisujemy danych.

## 3. Struktura Projektu
project-root/
├── package.json
├── .env (nie commitowany)
├── server.js (logika backendu)
├── CLAUDE.md (ten plik)
└── public/
    ├── index.html (cały frontend w jednym pliku)
    └── script.js (opcjonalnie, lub inline w HTML)

## 4. Szczegóły Implementacji

### Krok 1: Inicjalizacja i Backend
1. Zainicjuj projekt Node.js.
2. Zainstaluj zależności: `express`, `dotenv`, `openai`, `cors`, `body-parser`.
3. Skonfiguruj `server.js`:
   - Serwuj pliki statyczne z folderu `public`.
   - Stwórz endpoint POST `/api/generate`.
   - Obsługa błędów (try/catch) - jeśli API OpenAI zawiedzie, zwróć czytelny błąd do frontendu.

### Krok 2: Logika AI (Prompt Engineering)
W endpoincie `/api/generate`, skonstruuj wywołanie do OpenAI.
- **System Prompt:** "Jesteś ekspertem ds. wizerunku i obsługi klienta (Customer Success). Twoim zadaniem jest tworzenie profesjonalnych, uprzejmych i budujących zaufanie odpowiedzi na opinie klientów. Nigdy nie bądź agresywny. Jeśli opinia jest negatywna, zaproponuj rozwiązanie i zachęć do kontaktu."
- **User Input:** Odbierasz z requestu: `reviewText` (treść opinii) oraz `tone` (wybrany ton).
- **Format:** Zwróć samą treść odpowiedzi, bez cudzysłowów i meta-komentarzy.

### Krok 3: Frontend (UI/UX)
Stwórz `public/index.html` używając Tailwind CSS.
Elementy interfejsu:
1. **Nagłówek:** "Review Responder AI" - prosty i czytelny.
2. **Sekcja Input:**
   - Textarea: "Wklej treść opinii klienta..." (min. 4 wiersze).
   - Select (Dropdown) z wyborem tonu:
     - "Profesjonalny i Dyplomatyczny" (Domyślny)
     - "Empatyczny i Przepraszający"
     - "Lekki i z Humorem"
     - "Krótki i Zwięzły"
3. **Action:** Duży, wyraźny przycisk "Generuj Odpowiedź" (dodaj stan ładowania/spinner po kliknięciu).
4. **Sekcja Output:**
   - Kontener na wynik, domyślnie ukryty lub pusty.
   - Przycisk "Kopiuj do schowka" obok wyniku.
   - Wygląd wyniku powinien przypominać "dymek" czatu lub edytor tekstu.

## 5. Instrukcje dla Claude Code
- Najpierw stwórz strukturę plików.
- Napisz kod serwera (`server.js`).
- Stwórz plik `.env.example` z miejscem na `OPENAI_API_KEY`.
- Napisz kod frontendu (`index.html`).
- Na końcu podaj komendę do uruchomienia serwera.
- Nie pytaj o każdą drobnostkę. Podejmuj decyzje zgodne z zasadami "Clean Code".
