// Email Handler usando EmailJS
class EmailHandler {
    constructor() {
        // Inizializza EmailJS quando il DOM è caricato
        this.init();
    }

    init() {
        // Usa la configurazione dal file email-config.js
        if (typeof EMAIL_CONFIG !== 'undefined') {
            this.publicKey = EMAIL_CONFIG.publicKey;
            this.serviceId = EMAIL_CONFIG.serviceId;
            this.templateId = EMAIL_CONFIG.templateId;
        } else {
            console.error('EMAIL_CONFIG non trovato. Assicurati che email-config.js sia caricato.');
            return;
        }

        // Verifica che le credenziali siano configurate
        if (this.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY' || 
            this.serviceId === 'YOUR_EMAIL_SERVICE_ID' || 
            this.templateId === 'YOUR_EMAIL_TEMPLATE_ID') {
            console.warn('⚠️ EmailJS: Credenziali non configurate! Modifica email-config.js con le tue credenziali reali.');
            console.warn('📋 Guida: https://dashboard.emailjs.com');
        }

        // Inizializza EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.publicKey);
        } else {
            console.error('EmailJS non è caricato. Assicurati che lo script sia incluso.');
        }

        this.setupFormHandlers();
    }

    setupFormHandlers() {
        // Handler per il form principale nella sezione contatti
        const mainContactForm = document.getElementById('contact-form');
        if (mainContactForm) {
            mainContactForm.addEventListener('submit', (e) => this.handleMainContactForm(e));
        }

        // Handler per il form nel modal
        const modalContactForm = document.getElementById('contactForm');
        if (modalContactForm) {
            modalContactForm.addEventListener('submit', (e) => this.handleModalContactForm(e));
        }
    }

    async handleMainContactForm(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        const templateParams = {
            from_name: formData.get('name') || 'Nome non specificato',
            from_email: formData.get('email') || 'Email non specificata',
            phone: formData.get('phone') || 'Telefono non specificato',
            message: formData.get('message') || 'Nessun messaggio',
            form_type: 'Contatto Generale',
            checkin: '',
            checkout: '',
            room_type: ''
        };

        await this.sendEmail(templateParams, 'form-status');
    }

    async handleModalContactForm(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        const templateParams = {
            from_name: formData.get('nome') || 'Nome non specificato',
            from_email: formData.get('email') || 'Email non specificata',
            phone: formData.get('telefono') || 'Telefono non specificato',
            checkin: formData.get('checkin') || 'Non specificato',
            checkout: formData.get('checkout') || 'Non specificato',
            room_type: formData.get('camera') || 'Non specificata',
            message: formData.get('note') || 'Nessuna nota speciale',
            form_type: 'Richiesta Prenotazione'
        };

        await this.sendEmail(templateParams, 'form-message');
    }

    async sendEmail(templateParams, statusElementId) {
        const statusElement = document.getElementById(statusElementId);
        const messageElement = statusElementId === 'form-message' ? 
            document.getElementById('form-message-text') : statusElement;

        try {
            // DEBUG: Log per vedere cosa stiamo inviando
            console.log('📧 Parametri template inviati:', templateParams);
            console.log('🔧 Service ID:', this.serviceId);
            console.log('📝 Template ID:', this.templateId);

            // Mostra loading
            this.showStatus(statusElement, messageElement, 'Invio in corso...', 'loading');

            const result = await emailjs.send(this.serviceId, this.templateId, templateParams);
            
            if (result.status === 200) {
                console.log('✅ Email inviata con successo!', result);
                this.showStatus(statusElement, messageElement, 
                    'Messaggio inviato con successo! Ti risponderemo presto.', 'success');
                
                // Reset form dopo successo
                setTimeout(() => {
                    const form = document.querySelector(`#${statusElementId === 'form-message' ? 'contactForm' : 'contact-form'}`);
                    if (form) form.reset();
                    
                    // Chiudi il modal se è quello del modal
                    if (statusElementId === 'form-message') {
                        setTimeout(() => closeEmailForm(), 2000);
                    }
                }, 2000);
            }
        } catch (error) {
            console.error('❌ Errore invio email:', error);
            console.error('📋 Dettagli errore:', error.text || error.message);
            this.showStatus(statusElement, messageElement, 
                'Errore nell\'invio del messaggio. Riprova più tardi.', 'error');
        }
    }

    showStatus(statusElement, messageElement, message, type) {
        if (statusElement) {
            statusElement.style.display = 'block';
            statusElement.className = `form-message ${type}`;
        }
        
        if (messageElement) {
            messageElement.textContent = message;
        }

        // Nascondi il messaggio dopo 5 secondi (eccetto per loading)
        if (type !== 'loading') {
            setTimeout(() => {
                if (statusElement) {
                    statusElement.style.display = 'none';
                }
            }, 5000);
        }
    }
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    new EmailHandler();
});

// Funzione di fallback per PHP (vedi opzione 2)
async function sendEmailWithPHP(formData, isModal = false) {
    try {
        const response = await fetch('send-email.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        const statusElementId = isModal ? 'form-message' : 'form-status';
        const statusElement = document.getElementById(statusElementId);
        const messageElement = isModal ? 
            document.getElementById('form-message-text') : statusElement;

        if (result.success) {
            showStatus(statusElement, messageElement, 
                'Messaggio inviato con successo!', 'success');
        } else {
            showStatus(statusElement, messageElement, 
                result.message || 'Errore nell\'invio', 'error');
        }
    } catch (error) {
        console.error('Errore:', error);
        const statusElement = document.getElementById(isModal ? 'form-message' : 'form-status');
        const messageElement = isModal ? 
            document.getElementById('form-message-text') : statusElement;
        showStatus(statusElement, messageElement, 
            'Errore di connessione', 'error');
    }
}

function showStatus(statusElement, messageElement, message, type) {
    if (statusElement) {
        statusElement.style.display = 'block';
        statusElement.className = `form-message ${type}`;
    }
    
    if (messageElement) {
        messageElement.textContent = message;
    }

    setTimeout(() => {
        if (statusElement) {
            statusElement.style.display = 'none';
        }
    }, 5000);
}
