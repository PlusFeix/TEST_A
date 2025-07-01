document.addEventListener('DOMContentLoaded', () => {
    const COOKIE_CONSENT_KEY = 'amelia_cookie_consent';
    const COOKIE_EXPIRATION_MONTHS = 6;

    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');

    /**
     * Attiva tutti gli script che richiedono il consenso.
     * Cerca gli script con type="text/plain" e data-consent-needed="true",
     * poi li esegue cambiando il loro tipo in "text/javascript".
     */
    function activateConsentedScripts() {
        document.querySelectorAll('script[type="text/plain"][data-consent-needed="true"]').forEach(script => {
            const newScript = document.createElement('script');
            // Copia tutti gli attributi dal vecchio script al nuovo
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            newScript.type = 'text/javascript'; // Imposta il tipo corretto per l'esecuzione
            newScript.innerHTML = script.innerHTML; // Copia il contenuto dello script (per script inline)
            script.parentNode.replaceChild(newScript, script);
        });
        console.log('Script di terze parti attivati in base al consenso.');
    }

    /**
     * Salva la scelta dell'utente nel localStorage.
     * @param {boolean} hasConsented - true se l'utente ha accettato, false altrimenti.
     * @param {object} categories - (Futuro) Oggetto per le categorie di cookie.
     */
    function saveConsent(hasConsented, categories = null) {
        const consentData = {
            accepted: hasConsented,
            timestamp: new Date().getTime(),
            // Per il futuro: qui si potrebbero salvare le categorie scelte
            // categories: { analytics: true, marketing: false, ... }
        };
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    }

    function hideBanner() {
        if (banner) {
            banner.style.display = 'none';
        }
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            saveConsent(true);
            hideBanner();
            activateConsentedScripts();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            saveConsent(false);
            hideBanner();
        });
    }

    /**
     * Controlla lo stato del consenso al caricamento della pagina.
     */
    function checkConsent() {
        const consentData = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consentData) {
            if (banner) banner.style.display = 'block';
            return;
        }

        try {
            const { accepted, timestamp } = JSON.parse(consentData);
            const expirationTime = COOKIE_EXPIRATION_MONTHS * 30 * 24 * 60 * 60 * 1000;
            const isExpired = (new Date().getTime() - timestamp) > expirationTime;

            if (isExpired) {
                localStorage.removeItem(COOKIE_CONSENT_KEY);
                if (banner) banner.style.display = 'block';
            } else {
                hideBanner();
                if (accepted) {
                    activateConsentedScripts();
                }
            }
        } catch (e) {
            localStorage.removeItem(COOKIE_CONSENT_KEY);
            if (banner) banner.style.display = 'block';
            console.error("Errore nel parsing del consenso cookie:", e);
        }
    }

    // La chiamata a checkConsent() viene spostata fuori per garantire
    // che il DOM sia completamente caricato prima di qualsiasi manipolazione.
    checkConsent();

    /**
     * Rende la funzione revokeCookieConsent globale per poterla chiamare dall'HTML.
     */
    window.revokeCookieConsent = function() {
        const COOKIE_CONSENT_KEY = 'amelia_cookie_consent';
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        window.location.reload(); // Ricarica per mostrare di nuovo il banner
    };
});
