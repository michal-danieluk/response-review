# Review Responder AI

Prosta aplikacja webowa (MVP) do generowania profesjonalnych odpowiedzi na opinie klientów przy użyciu AI.

## Stack Technologiczny

- **Backend:** Node.js + Express
- **Frontend:** Vanilla HTML5 + Tailwind CSS (CDN)
- **AI:** OpenAI API (model `gpt-4o-mini`)

## Instalacja i Uruchomienie

### 1. Sklonuj repozytorium (jeśli nie masz jeszcze kodu)

```bash
git clone <repository-url>
cd response-review
```

### 2. Zainstaluj zależności

```bash
npm install
```

### 3. Skonfiguruj klucz API OpenAI

1. Skopiuj plik `.env.example` do `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edytuj plik `.env` i dodaj swój klucz API OpenAI:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

   Klucz API możesz uzyskać na: https://platform.openai.com/api-keys

### 4. Uruchom serwer

```bash
npm start
```

Aplikacja będzie dostępna pod adresem: **http://localhost:3000**

## Funkcjonalności

- Generowanie odpowiedzi na opinie klientów w różnych tonach:
  - Profesjonalny i Dyplomatyczny
  - Empatyczny i Przepraszający
  - Lekki i z Humorem
  - Krótki i Zwięzły
- Kopiowanie wygenerowanej odpowiedzi do schowka
- Responsywny design (Mobile First)

## Struktura Projektu

```
response-review/
├── package.json
├── .env (nie commitowany)
├── .env.example
├── server.js (backend)
├── README.md
└── public/
    └── index.html (frontend)
```

## API Endpoints

- `POST /api/generate` - Generuje odpowiedź na opinię klienta
- `GET /api/health` - Healthcheck endpoint

## Uwagi

- Projekt nie używa bazy danych (MVP)
- Wszystkie zapytania są przetwarzane w czasie rzeczywistym
- Koszty API OpenAI zależą od liczby zapytań

## Licencja

ISC
