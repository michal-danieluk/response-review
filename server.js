require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Inicjalizacja klienta OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint do generowania odpowiedzi
app.post('/api/generate', async (req, res) => {
  try {
    const { reviewText, tone } = req.body;

    // Walidacja inputu
    if (!reviewText || reviewText.trim().length === 0) {
      return res.status(400).json({
        error: 'Treść opinii nie może być pusta'
      });
    }

    // Mapowanie tonu na odpowiednie instrukcje
    const toneInstructions = {
      'professional': 'Odpowiedz w profesjonalny i dyplomatyczny sposób.',
      'empathetic': 'Odpowiedz w empatyczny sposób, z przeprosinami jeśli to właściwe.',
      'light': 'Odpowiedz w lekki i przyjazny sposób, dodając subtelny humor gdzie to stosowne.',
      'brief': 'Odpowiedz krótko i zwięźle, maksymalnie 2-3 zdania.'
    };

    const toneInstruction = toneInstructions[tone] || toneInstructions['professional'];

    // System prompt
    const systemPrompt = `Jesteś ekspertem ds. wizerunku i obsługi klienta (Customer Success). Twoim zadaniem jest tworzenie profesjonalnych, uprzejmych i budujących zaufanie odpowiedzi na opinie klientów. Nigdy nie bądź agresywny. Jeśli opinia jest negatywna, zaproponuj rozwiązanie i zachęć do kontaktu. ${toneInstruction} Zwróć tylko treść odpowiedzi bez cudzysłowów i dodatkowych komentarzy.`;

    // Wywołanie OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Opinia klienta: "${reviewText}"` }
      ],
      temperature: 0.7,
      max_tokens: 500
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

// Export dla Vercel serverless
module.exports = app;

// Local development server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serwer działa na porcie ${PORT}`);
    console.log(`📱 Otwórz http://localhost:${PORT} w przeglądarce`);
  });
}
