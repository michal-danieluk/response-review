# Project Specification: ReviewHero (Review & Email Responder)
# Role: Senior Fullstack Developer & Product Owner

## 1. Cel Projektu
Stworzenie prostej, działającej aplikacji webowej (MVP), która pomaga małym firmom generować profesjonalne odpowiedzi na:
- Opinie klientów (Google/Yelp/Allegro)
- Emaile biznesowe

Jedno narzędzie załatwiające 90% pisania w małej firmie.

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

Endpoint przyjmuje 3 parametry:
- `reviewText` - treść opinii lub emaila
- `tone` - wybrany ton odpowiedzi
- `type` - tryb: `'review'` lub `'email'` (domyślnie 'review')

**Review Mode (Opinie):**
- **System Prompt:** "Jesteś ekspertem ds. wizerunku i obsługi klienta (Customer Success). Twoim zadaniem jest tworzenie profesjonalnych, uprzejmych i budujących zaufanie odpowiedzi na opinie klientów. Nigdy nie bądź agresywny. Jeśli opinia jest negatywna, zaproponuj rozwiązanie i zachęć do kontaktu."
- **Tony:** Professional, Empathetic, Light, Brief
- **Max tokens:** 500
- **Format:** Krótka odpowiedź do Google Maps/Allegro

**Email Mode:**
- **System Prompt:** "Jesteś asystentem biurowym. Napisz odpowiedź na ten email. Formatuj to jako profesjonalny email (Temat, Treść, Stopka). Nie używaj hashtagów. Bądź konkretny."
- **Tony:** Stanowczy ale uprzejmy, Wyjaśniający, Miękki (przyznanie racji), Sprzedażowy
- **Max tokens:** 800
- **Format:** Pełny email z tematem i podpisem

### Krok 3: Frontend (UI/UX)
Stwórz `public/index.html` używając Tailwind CSS.
Elementy interfejsu:
1. **Nagłówek:** "ReviewHero" z logo i badge "BETA" - prosty i czytelny.
2. **System Zakładek (Tabs):**
   - Dwa przyciski w stylu iOS: "Google/Allegro Reviews" | "Email Response"
   - Aktywna zakładka: białe tło + cień, nieaktywna: przezroczysta
   - Przełączanie zmienia placeholder, label i opcje tonów
3. **Sekcja Input:**
   - Textarea z dynamicznym placeholderem:
     - Review mode: "Paste the customer review here..."
     - Email mode: "Wklej treść otrzymanego maila..."
   - Select (Dropdown) z wyborem tonu - **zmienia się w zależności od trybu:**

     **Review Mode:**
     - "Professional & Diplomatic" (Domyślny)
     - "Empathetic & Apologetic"
     - "Light & Friendly"
     - "Brief & Concise"

     **Email Mode:**
     - "Stanowczy ale uprzejmy" (Domyślny)
     - "Wyjaśniający"
     - "Miękki (przyznanie racji)"
     - "Sprzedażowy"
4. **Action:** Duży przycisk "Generate Response" (stan ładowania/spinner).
5. **Sekcja Output:**
   - Kontener na wynik (ukryty domyślnie)
   - Przycisk "Copy" z visual feedback
   - Wygląd: szare tło, border, pre-wrap formatting

## 5. Instrukcje dla Claude Code
- Najpierw stwórz strukturę plików.
- Napisz kod serwera (`server.js`).
- Stwórz plik `.env.example` z miejscem na `OPENAI_API_KEY`.
- Napisz kod frontendu (`index.html`).
- Na końcu podaj komendę do uruchomienia serwera.
- Nie pytaj o każdą drobnostkę. Podejmuj decyzje zgodne z zasadami "Clean Code".
