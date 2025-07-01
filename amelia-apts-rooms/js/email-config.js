// Configurazione EmailJS
// IMPORTANTE: Sostituisci questi valori con le tue credenziali reali di EmailJS
// Per ottenere le credenziali:
// 1. Vai su https://dashboard.emailjs.com
// 2. Registrati o accedi
// 3. Crea un nuovo servizio email (Gmail, Outlook, etc.)
// 4. Crea un template email
// 5. Copia qui le credenziali

const EMAIL_CONFIG = {
    // Il tuo Public Key di EmailJS (si trova in Account > API Keys)
    publicKey: 'BAZLAFlhn1tjgHzcz',
    
    // Il tuo Service ID (si trova in Email Services)
    serviceId: 'service_llghl9i',
    
    // Il tuo Template ID (si trova in Email Templates)
    templateId: 'template_1gg8bay'
};

// Esempio di template per EmailJS:
/*
Template Subject: Nuovo messaggio da {{from_name}} - {{form_type}}

Template Body:
Hai ricevuto un nuovo messaggio dal sito web:

**Tipo di richiesta:** {{form_type}}
**Nome:** {{from_name}}
**Email:** {{from_email}}
**Telefono:** {{phone}}

{{#if checkin}}
**Check-in:** {{checkin}}
**Check-out:** {{checkout}}
**Tipo di camera:** {{room_type}}
{{/if}}

**Messaggio:**
{{message}}

---
Messaggio inviato automaticamente dal sito web.
*/
