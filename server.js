require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Inicjalizacja klienta OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint do generowania odpowiedzi
app.post('/api/generate', async (req, res) => {
  try {
    const { reviewText, tone, type = 'review' } = req.body;

    // Walidacja inputu
    if (!reviewText || reviewText.trim().length === 0) {
      return res.status(400).json({
        error: 'Treść nie może być pusta'
      });
    }

    // Konfiguracja dla Review Mode
    const reviewToneInstructions = {
      'professional': 'Odpowiedz w profesjonalny i dyplomatyczny sposób.',
      'empathetic': 'Odpowiedz w empatyczny sposób, z przeprosinami jeśli to właściwe.',
      'light': 'Odpowiedz w lekki i przyjazny sposób, dodając subtelny humor gdzie to stosowne.',
      'brief': 'Odpowiedz krótko i zwięźle, maksymalnie 2-3 zdania.'
    };

    // Konfiguracja dla Email Mode
    const emailToneInstructions = {
      'assertive': 'Odpowiedź powinna być stanowcza, ale uprzejma. Wyraź jasno swoją pozycję, zachowując profesjonalizm.',
      'explanatory': 'Odpowiedź powinna być wyjaśniająca i edukacyjna. Dokładnie wytłumacz kwestię krok po kroku.',
      'soft': 'Odpowiedź powinna być miękka i wykazująca zrozumienie. Przyznaj rację tam gdzie to właściwe i zaproponuj kompromis.',
      'sales': 'Odpowiedź powinna być sprzedażowa - podkreśl wartość, korzyści i zachęć do działania.'
    };

    let systemPrompt, userPrompt;

    if (type === 'email') {
      // Email mode
      const toneInstruction = emailToneInstructions[tone] || emailToneInstructions['assertive'];

      systemPrompt = `Jesteś asystentem biurowym. Napisz odpowiedź na ten email. Formatuj to jako profesjonalny email z następującymi sekcjami:

Temat: [Proponowany temat odpowiedzi]

Treść:
[Treść odpowiedzi na email]

---
[Podpis - zostaw jako szablon np. "[Twoje imię]" lub "Z poważaniem,"]

${toneInstruction}

Nie używaj hashtagów. Bądź konkretny. Zwróć tylko sformatowany email bez dodatkowych komentarzy.`;

      userPrompt = `Email do odpowiedzi:\n\n${reviewText}`;
    } else {
      // Review mode (default)
      const toneInstruction = reviewToneInstructions[tone] || reviewToneInstructions['professional'];

      systemPrompt = `Jesteś ekspertem ds. wizerunku i obsługi klienta (Customer Success). Twoim zadaniem jest tworzenie profesjonalnych, uprzejmych i budujących zaufanie odpowiedzi na opinie klientów. Nigdy nie bądź agresywny. Jeśli opinia jest negatywna, zaproponuj rozwiązanie i zachęć do kontaktu. ${toneInstruction} Zwróć tylko treść odpowiedzi bez cudzysłowów i dodatkowych komentarzy.`;

      userPrompt = `Opinia klienta: "${reviewText}"`;
    }

    // Wywołanie OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: type === 'email' ? 800 : 500
    });

    const response = completion.choices[0].message.content.trim();

    res.json({ response });

  } catch (error) {
    console.error('Błąd podczas generowania odpowiedzi:', error);

    // Obsługa różnych typów błędów
    if (error.code === 'insufficient_quota') {
      return res.status(500).json({
        error: 'Przekroczono limit API OpenAI. Sprawdź swoje konto.'
      });
    }

    if (error.code === 'invalid_api_key') {
      return res.status(500).json({
        error: 'Nieprawidłowy klucz API OpenAI.'
      });
    }

    res.status(500).json({
      error: 'Wystąpił błąd podczas generowania odpowiedzi. Spróbuj ponownie.'
    });
  }
});

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export dla Vercel serverless
module.exports = app;

// Local development server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serwer działa na porcie ${PORT}`);
    console.log(`📱 Otwórz http://localhost:${PORT} w przeglądarce`);
  });
}
