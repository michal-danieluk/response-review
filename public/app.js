// Global state
let currentType = 'review';
let currentLang = 'en';

// Translations
const translations = {
    en: {
        // Navbar
        appName: 'ReviewHero',
        badge: 'BETA',

        // Hero section
        heroTitle: 'Professional review responses in seconds',
        heroDesc: 'Stop wasting hours crafting the perfect response. Generate professional, empathetic replies to customer reviews instantly with AI.',

        // Tabs
        tabReview: 'Reviews & Social Media',
        tabEmail: 'Email Response',

        // Input section
        labelReview: 'Review or comment',
        labelEmail: 'Email content',
        placeholderReview: 'Paste customer review or social media comment...',
        placeholderEmail: 'Paste the received email...',
        languageNotice: 'I detect language automatically. I will respond in the same language.',

        // Tone label
        toneLabel: 'Response tone',

        // Tone options - Review
        toneReviewProfessional: 'Professional & Diplomatic',
        toneReviewEmpathetic: 'Empathetic & Apologetic',
        toneReviewLight: 'Light & Friendly',
        toneReviewBrief: 'Brief & Concise',

        // Tone options - Email
        toneEmailAssertive: 'Assertive but courteous',
        toneEmailExplanatory: 'Explanatory',
        toneEmailSoft: 'Soft (acknowledging)',
        toneEmailSales: 'Sales-oriented',

        // Button
        btnGenerate: 'Generate Response',
        btnGenerating: 'Generating...',

        // Privacy
        privacyDisclaimer: "We don't store your data. Text is sent to OpenAI solely to generate a response.",

        // Output
        outputLabel: 'Generated response',
        btnCopy: 'Copy',
        btnCopied: 'Copied',

        // Errors
        errorReview: 'Please paste a review or comment.',
        errorEmail: 'Please paste the received email.',
        errorGeneral: 'An error occurred. Please try again.',

        // Benefits
        benefit1Title: 'Save Time',
        benefit1Desc: 'Stop spending hours on a single response. AI generates professional replies in seconds.',
        benefit2Title: 'Improve SEO',
        benefit2Desc: 'Responding to reviews signals to Google that you care about customers, boosting your visibility.',
        benefit3Title: 'Stay Professional',
        benefit3Desc: 'AI never gets emotional. Every response is diplomatic, even to harsh criticism.',

        // Footer
        footer: '© 2025 ReviewHero'
    },
    pl: {
        // Navbar
        appName: 'ReviewHero',
        badge: 'BETA',

        // Hero section
        heroTitle: 'Profesjonalne odpowiedzi na opinie w sekundy',
        heroDesc: 'Przestań tracić godziny na tworzenie idealnej odpowiedzi. Generuj profesjonalne, empatyczne odpowiedzi na opinie klientów natychmiast dzięki AI.',

        // Tabs
        tabReview: 'Opinie i Social Media',
        tabEmail: 'Odpowiedź na Email',

        // Input section
        labelReview: 'Opinia lub komentarz',
        labelEmail: 'Treść emaila',
        placeholderReview: 'Wklej opinię klienta lub komentarz z social media...',
        placeholderEmail: 'Wklej treść otrzymanego maila...',
        languageNotice: 'Wykrywam język automatycznie. Odpiszę w tym samym języku.',

        // Tone label
        toneLabel: 'Ton odpowiedzi',

        // Tone options - Review
        toneReviewProfessional: 'Profesjonalny i dyplomatyczny',
        toneReviewEmpathetic: 'Empatyczny i przepraszający',
        toneReviewLight: 'Lekki i przyjazny',
        toneReviewBrief: 'Krótki i zwięzły',

        // Tone options - Email
        toneEmailAssertive: 'Stanowczy ale uprzejmy',
        toneEmailExplanatory: 'Wyjaśniający',
        toneEmailSoft: 'Miękki (przyznanie racji)',
        toneEmailSales: 'Sprzedażowy',

        // Button
        btnGenerate: 'Generuj Odpowiedź',
        btnGenerating: 'Generowanie...',

        // Privacy
        privacyDisclaimer: 'Nie przechowujemy Twoich danych. Tekst jest wysyłany do OpenAI wyłącznie w celu wygenerowania odpowiedzi.',

        // Output
        outputLabel: 'Wygenerowana odpowiedź',
        btnCopy: 'Kopiuj',
        btnCopied: 'Skopiowano',

        // Errors
        errorReview: 'Wklej opinię lub komentarz.',
        errorEmail: 'Wklej treść otrzymanego emaila.',
        errorGeneral: 'Wystąpił błąd. Spróbuj ponownie.',

        // Benefits
        benefit1Title: 'Oszczędzaj Czas',
        benefit1Desc: 'Przestań spędzać godziny na pojedynczej odpowiedzi. AI generuje profesjonalne odpowiedzi w sekundy.',
        benefit2Title: 'Popraw SEO',
        benefit2Desc: 'Odpowiadanie na opinie sygnalizuje Google, że dbasz o klientów, zwiększając Twoją widoczność.',
        benefit3Title: 'Zachowaj Profesjonalizm',
        benefit3Desc: 'AI nigdy się nie denerwuje. Każda odpowiedź jest dyplomatyczna, nawet wobec ostrej krytyki.',

        // Footer
        footer: '© 2025 ReviewHero'
    }
};

// Tone configurations (will be populated by updateTexts)
const toneConfigs = {
    review: [
        { value: 'professional', labelKey: 'toneReviewProfessional' },
        { value: 'empathetic', labelKey: 'toneReviewEmpathetic' },
        { value: 'light', labelKey: 'toneReviewLight' },
        { value: 'brief', labelKey: 'toneReviewBrief' }
    ],
    email: [
        { value: 'assertive', labelKey: 'toneEmailAssertive' },
        { value: 'explanatory', labelKey: 'toneEmailExplanatory' },
        { value: 'soft', labelKey: 'toneEmailSoft' },
        { value: 'sales', labelKey: 'toneEmailSales' }
    ]
};

// Update all texts based on language
function updateTexts(lang) {
    const t = translations[lang];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });

    // Update input label and placeholder based on current tab
    const inputLabel = document.getElementById('inputLabel');
    const inputText = document.getElementById('inputText');
    if (currentType === 'review') {
        inputLabel.textContent = t.labelReview;
        inputText.placeholder = t.placeholderReview;
    } else {
        inputLabel.textContent = t.labelEmail;
        inputText.placeholder = t.placeholderEmail;
    }

    // Update tone options
    updateToneOptions();
}

// Update tone select options
function updateToneOptions() {
    const t = translations[currentLang];
    const toneSelect = document.getElementById('tone');
    const currentTones = toneConfigs[currentType];

    toneSelect.innerHTML = currentTones.map(tone =>
        `<option value="${tone.value}">${t[tone.labelKey]}</option>`
    ).join('');
}

// Change language
function changeLanguage(lang) {
    currentLang = lang;

    // Update button styles
    const langPL = document.getElementById('langPL');
    const langEN = document.getElementById('langEN');

    if (lang === 'pl') {
        langPL.className = 'px-2 py-1 rounded transition-colors duration-150 bg-slate-100 text-slate-900 font-semibold';
        langEN.className = 'px-2 py-1 rounded transition-colors duration-150 hover:bg-slate-100';
    } else {
        langEN.className = 'px-2 py-1 rounded transition-colors duration-150 bg-slate-100 text-slate-900 font-semibold';
        langPL.className = 'px-2 py-1 rounded transition-colors duration-150 hover:bg-slate-100';
    }

    // Update all texts
    updateTexts(lang);
}

// Switch between tabs
function switchTab(type) {
    currentType = type;

    const tabReview = document.getElementById('tabReview');
    const tabEmail = document.getElementById('tabEmail');
    const inputText = document.getElementById('inputText');
    const inputLabel = document.getElementById('inputLabel');
    const t = translations[currentLang];

    // Update tab styles
    if (type === 'review') {
        tabReview.className = 'px-4 py-2 text-sm font-medium rounded-md transition-all bg-white text-slate-900 shadow-sm';
        tabEmail.className = 'px-4 py-2 text-sm font-medium rounded-md transition-all text-slate-600 hover:text-slate-900';
        inputLabel.textContent = t.labelReview;
        inputText.placeholder = t.placeholderReview;
    } else {
        tabEmail.className = 'px-4 py-2 text-sm font-medium rounded-md transition-all bg-white text-slate-900 shadow-sm';
        tabReview.className = 'px-4 py-2 text-sm font-medium rounded-md transition-all text-slate-600 hover:text-slate-900';
        inputLabel.textContent = t.labelEmail;
        inputText.placeholder = t.placeholderEmail;
    }

    // Update tone options
    updateToneOptions();

    // Clear input and output
    inputText.value = '';
    document.getElementById('outputSection').classList.add('hidden');
    hideError();
}

async function generateResponse() {
    const inputText = document.getElementById('inputText').value.trim();
    const tone = document.getElementById('tone').value;
    const honeypot = document.getElementById('website').value; // Bot trap
    const generateBtn = document.getElementById('generateBtn');
    const btnText = document.getElementById('btnText');
    const spinner = document.getElementById('spinner');
    const outputSection = document.getElementById('outputSection');
    const responseOutput = document.getElementById('responseOutput');
    const t = translations[currentLang];

    // Validation
    if (!inputText) {
        const errorMsg = currentType === 'review' ? t.errorReview : t.errorEmail;
        showError(errorMsg);
        return;
    }

    // Client-side length validation
    if (inputText.length > 5000) {
        showError('Tekst jest za długi. Maksymalnie 5000 znaków. / Text is too long. Maximum 5000 characters.');
        return;
    }

    // Hide previous messages
    hideError();
    outputSection.classList.add('hidden');

    // Set loading state
    generateBtn.disabled = true;
    btnText.textContent = t.btnGenerating;
    spinner.classList.remove('hidden');

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reviewText: inputText,
                tone,
                type: currentType,
                honeypot // Bot trap field
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || t.errorGeneral);
        }

        // Display result
        responseOutput.textContent = data.response;
        outputSection.classList.remove('hidden');

        // Scroll to result
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        showError(error.message);
    } finally {
        // Restore button state
        generateBtn.disabled = false;
        btnText.textContent = t.btnGenerate;
        spinner.classList.add('hidden');
    }
}

function copyToClipboard() {
    const responseText = document.getElementById('responseOutput').textContent;
    const btn = document.getElementById('copyBtn');
    const t = translations[currentLang];

    navigator.clipboard.writeText(responseText).then(() => {
        // Show visual feedback
        const textSpan = btn.querySelector('[data-i18n="btnCopy"]');
        textSpan.textContent = t.btnCopied;
        btn.classList.add('border-green-600', 'text-green-700');
        btn.classList.remove('border-slate-300', 'text-slate-700', 'hover:border-slate-400', 'hover:text-slate-900');

        setTimeout(() => {
            textSpan.textContent = t.btnCopy;
            btn.classList.remove('border-green-600', 'text-green-700');
            btn.classList.add('border-slate-300', 'text-slate-700', 'hover:border-slate-400', 'hover:text-slate-900');
        }, 2000);
    }).catch(err => {
        console.error('Copy error:', err);
        showError(t.errorGeneral);
    });
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('hidden');
}

// Initialize app on page load
document.addEventListener('DOMContentLoaded', () => {
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const detectedLang = browserLang.toLowerCase().startsWith('pl') ? 'pl' : 'en';

    // Set initial language (default: EN, or detected from browser)
    currentLang = detectedLang;

    // Initialize language UI
    changeLanguage(currentLang);

    // Add event listeners (CSP-compliant, no inline handlers)
    document.getElementById('langPL').addEventListener('click', () => changeLanguage('pl'));
    document.getElementById('langEN').addEventListener('click', () => changeLanguage('en'));
    document.getElementById('tabReview').addEventListener('click', () => switchTab('review'));
    document.getElementById('tabEmail').addEventListener('click', () => switchTab('email'));
    document.getElementById('generateBtn').addEventListener('click', generateResponse);
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);

    // Handle Ctrl/Cmd + Enter in textarea
    document.getElementById('inputText').addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            generateResponse();
        }
    });
});
