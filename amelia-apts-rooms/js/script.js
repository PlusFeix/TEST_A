// This file contains JavaScript functionality for the Amelia Apts & Rooms landing page.

let modalSwiperInstance = null;
let attractionsGallerySwiper = null;

// Dati delle attrazioni con gallerie aggiornati con tutti i percorsi corretti
const attractionsData = {
    'centro-storico': {
        title: {
            it: 'Centro Storico di Alghero',
            en: 'Alghero Historic Center'
        },
        description: {
            it: 'Passeggia tra i vicoli medievali e le mura catalane del centro storico di Alghero, dichiarato patrimonio dell\'umanità.',
            en: 'Stroll through the medieval alleys and Catalan walls of Alghero\'s historic center, declared a UNESCO World Heritage site.'
        },
        media: [
            { type: 'image', src: 'images/attractions/centro-storico/vicoli-medievali.jpg', srcWebp: 'images/attractions/centro-storico/vicoli-medievali.webp', alt: 'Vicoli Medievali di Alghero' },
            { type: 'image', src: 'images/attractions/centro-storico/mura-catalane.jpg', srcWebp: 'images/attractions/centro-storico/mura-catalane.webp', alt: 'Mura Catalane di Alghero' },
            { type: 'image', src: 'images/attractions/centro-storico/piazza-civica.jpg', srcWebp: 'images/attractions/centro-storico/piazza-civica.webp', alt: 'Piazza Civica di Alghero' }
        ]
    },
    'mare': {
        title: {
            it: 'Spiagge di Alghero',
            en: 'Alghero Beaches'
        },
        description: {
            it: 'Scopri le meravigliose spiagge di sabbia dorata e acque cristalline che circondano Alghero.',
            en: 'Discover the wonderful golden sand beaches and crystal clear waters surrounding Alghero.'
        },
        media: [
            { type: 'image', src: 'images/attractions/mare/maria-pia.jpeg', srcWebp: 'images/attractions/mare/maria-pia.webp', alt: 'Spiaggia Maria Pia' },
            { type: 'image', src: 'images/attractions/mare/spiaggia-san-giovanni.jpeg', srcWebp: 'images/attractions/mare/spiaggia-san-giovanni.webp', alt: 'Spiaggia San Giovanni Alghero' },
            { type: 'image', src: 'images/attractions/mare/lido-alghero.jpeg', srcWebp: 'images/attractions/mare/lido-alghero.webp', alt: 'Lido di Alghero' }
        ]
    },
    'natura': {
        title: {
            it: 'Capo Caccia e Grotte di Nettuno',
            en: 'Capo Caccia and Neptune\'s Caves'
        },
        description: {
            it: 'Esplora le impressionanti scogliere di Capo Caccia e le famose Grotte di Nettuno.',
            en: 'Explore the impressive cliffs of Capo Caccia and the famous Neptune\'s Caves.'
        },
        media: [
            { type: 'image', src: 'images/attractions/natura/capo-caccia.jpg', srcWebp: 'images/attractions/natura/capo-caccia.webp', alt: 'Capo Caccia Alghero' },
            { type: 'image', src: 'images/attractions/natura/grotte-nettuno.jpeg', srcWebp: 'images/attractions/natura/grotte-nettuno.webp', alt: 'Grotte di Nettuno' },
            { type: 'image', src: 'images/attractions/natura/panorami.jpeg', srcWebp: 'images/attractions/natura/panorami.webp', alt: 'Panorami mozzafiato di Alghero' }
        ]
    },
    'cultura': {
        title: {
            it: 'Monumenti e Arte',
            en: 'Monuments and Art'
        },
        description: {
            it: 'Visita i principali monumenti storici e artistici di Alghero, testimoni di secoli di storia.',
            en: 'Visit the main historical and artistic monuments of Alghero, witnesses of centuries of history.'
        },
        media: [
            { type: 'image', src: 'images/attractions/cultura/cattedrale.jpg', srcWebp: 'images/attractions/cultura/cattedrale.webp', alt: 'Cattedrale Santa Maria di Alghero' },
            { type: 'image', src: 'images/attractions/cultura/torri-difesa.jpg', srcWebp: 'images/attractions/cultura/torri-difesa.webp', alt: 'Torri di difesa catalane' },
            { type: 'image', src: 'images/attractions/cultura/palazzi-storici.jpg', srcWebp: 'images/attractions/cultura/palazzi-storici.webp', alt: 'Palazzi storici di Alghero' }
        ]
    },
    'enogastronomia': {
        title: {
            it: 'Enogastronomia Sarda',
            en: 'Sardinian Food & Wine'
        },
        description: {
            it: 'Degusta i sapori autentici della Sardegna nei ristoranti e nelle cantine di Alghero.',
            en: 'Taste the authentic flavors of Sardinia in Alghero\'s restaurants and wineries.'
        },
        media: [
            { type: 'image', src: 'images/attractions/enogastronomia/vini-locali.jpg', srcWebp: 'images/attractions/enogastronomia/vini-locali.webp', alt: 'Vini locali di Alghero' },
            { type: 'image', src: 'images/attractions/enogastronomia/specialita-mare.jpg', srcWebp: 'images/attractions/enogastronomia/specialita-mare.webp', alt: 'Specialità di mare sarde' },
            { type: 'image', src: 'images/attractions/enogastronomia/prodotti-tipici.jpg', srcWebp: 'images/attractions/enogastronomia/prodotti-tipici.webp', alt: 'Prodotti tipici sardi' }
        ]
    },
    'sport': {
        title: {
            it: 'Attività Marine e Sport',
            en: 'Marine Activities and Sports'
        },
        description: {
            it: 'Vivi il mare di Alghero attraverso immersioni, escursioni in barca e sport acquatici.',
            en: 'Experience the sea of Alghero through diving, boat excursions and water sports.'
        },
        media: [
            { type: 'image', src: 'images/attractions/sport/escursioni-barca.jpg', srcWebp: 'images/attractions/sport/escursioni-barca.webp', alt: 'Escursioni in barca ad Alghero' },
            { type: 'image', src: 'images/attractions/sport/immersioni.jpg', srcWebp: 'images/attractions/sport/immersioni.webp', alt: 'Immersioni subacquee' },
            { type: 'image', src: 'images/attractions/sport/sport-acquatici.jpg', srcWebp: 'images/attractions/sport/sport-acquatici.webp', alt: 'Sport acquatici ad Alghero' }
        ]
    }
};

async function loadAccommodationData() {
    console.log('Inizio caricamento dati JSON...');
    try {
        const response = await fetch('js/converted_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dati caricati con successo:', data);
        populateSwiper(data.apartments, 'apartments-swiper', 'apartment');
        populateSwiper(data.rooms, 'rooms-swiper', 'room');
        initializeSwipers();
    } catch (error) {
        console.error("Could not load accommodation data:", error);
        // Update error handling if necessary for new structure
        const apartmentsSwiper = document.querySelector('.apartments-swiper .swiper-wrapper');
        const roomsSwiper = document.querySelector('.rooms-swiper .swiper-wrapper');
        if (apartmentsSwiper) {
            apartmentsSwiper.innerHTML = '<p>Error loading apartment information. Please try again later.</p>';
        }
        if (roomsSwiper) {
            roomsSwiper.innerHTML = '<p>Error loading room information. Please try again later.</p>';
        }
    }
}

function populateSwiper(items, swiperContainerClass, type) {
    const swiperWrapper = document.querySelector(`.${swiperContainerClass} .swiper-wrapper`);
    if (!swiperWrapper) {
        console.error(`Swiper wrapper .${swiperContainerClass} .swiper-wrapper not found`);
        return;
    }
    swiperWrapper.innerHTML = ''; // Clear existing slides

    if (!items || items.length === 0) {
        const noAccommodationsText = window.translationManager && window.translationManager.getCurrentLanguage() === 'en' 
            ? 'No accommodations available at the moment.' 
            : 'Nessun alloggio disponibile al momento.';
        swiperWrapper.innerHTML = `<p>${noAccommodationsText}</p>`;
        return;
    }

    items.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        const card = document.createElement('div');
        card.className = 'room-card';
        card.classList.add(type);
        
        const id = item.id || `item-${Math.random().toString(36).substr(2, 9)}`;
        const imageSrc = item.image || 'images/placeholder-image.jpg';
        
        // Use original data as fallback
        let name = item.name || 'Name not available';
        let description = item.description || 'Description not available.';
        
        // Get current language and translate if available
        const currentLang = window.translationManager ? window.translationManager.getCurrentLanguage() : 'it';
        const translatedName = getTranslatedAccommodationName(id, currentLang);
        const translatedDescription = getTranslatedAccommodationDescription(id, currentLang);
        
        if (translatedName) name = translatedName;
        if (translatedDescription) description = translatedDescription;
        
        const maxGuests = item.maxGuests || 'N/A';
        const beds = item.beds || 'N/A';

        // Determine accommodation type icon
        const isApartment = type === 'apartment';
        const accommodationIcon = isApartment ? 'fas fa-home' : 'fas fa-bed';
        
        // Get translated labels
        const typeLabel = getTranslatedLabel(isApartment ? 'apartment' : 'room', currentLang);
        const guestsLabel = getTranslatedLabel('guests', currentLang);
        const discoverMoreLabel = getTranslatedLabel('discover-more', currentLang);

        card.innerHTML = `
            <img src="${imageSrc}" alt="${name}" loading="lazy" decoding="async" class="card-image-clickable">
            <div class="card-content">
                <h3>${name}</h3>
                <div class="description-container">
                    <p class="description">${description}</p>
                </div>
                <div class="accommodation-info">
                    <div class="info-item">
                        <i class="${accommodationIcon}"></i>
                        <span>${typeLabel}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-users"></i>
                        <span>${maxGuests} ${guestsLabel}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-bed"></i>
                        <span>${beds}</span>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-details" data-id="${id}" aria-label="${discoverMoreLabel} ${name}">${discoverMoreLabel}</button>
            </div>
        `;

        // Add click event to the "Scopri di più" button
        card.querySelector('.btn-details').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Pulsante "Scopri di più" cliccato per:', item.name);
            try {
                openDetailModal(item);
            } catch (error) {
                console.error('Errore nel click del pulsante Scopri di più:', error);
                alert('Si è verificato un errore. Ricarica la pagina e riprova.');
            }
        });

        // Add click event to the image to make it clickable like "Scopri di più"
        card.querySelector('.card-image-clickable').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Immagine cliccata per:', item.name);
            try {
                openDetailModal(item);
            } catch (error) {
                console.error('Errore nel click dell\'immagine:', error);
                alert('Si è verificato un errore. Ricarica la pagina e riprova.');
            }
        });
        slide.appendChild(card);
        swiperWrapper.appendChild(slide);
    });
}

function initializeSwipers() {
    const apartmentsSwiper = new Swiper('.apartments-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        centeredSlides: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        watchOverflow: true,
        pagination: {
            el: '.apartments-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.apartments-button-next',
            prevEl: '.apartments-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 1
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 1
            }
        },
        on: {
            init: function() {
                // Add class to enable visual hints
                this.el.classList.add('swiper-initialized');
                updateSwiperHints(this);
            },
            slideChange: function() {
                updateSwiperHints(this);
                // Hide swipe hint after first interaction
                this.el.classList.add('swiper-container-used');
            }
        }
    });

    const roomsSwiper = new Swiper('.rooms-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        centeredSlides: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        watchOverflow: true,
        pagination: {
            el: '.rooms-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.rooms-button-next',
            prevEl: '.rooms-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 1
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 1
            }
        },
        on: {
            init: function() {
                this.el.classList.add('swiper-initialized');
                updateSwiperHints(this);
            },
            slideChange: function() {
                updateSwiperHints(this);
                this.el.classList.add('swiper-container-used');
            }
        }
    });
}

function updateSwiperHints(swiper) {
    // Update container classes based on swiper state
    if (swiper.isEnd) {
        swiper.el.classList.add('swiper-container-end');
    } else {
        swiper.el.classList.remove('swiper-container-end');
    }
    
    if (swiper.isBeginning) {
        swiper.el.classList.add('swiper-container-beginning');
    } else {
        swiper.el.classList.remove('swiper-container-beginning');
    }
}

function openDetailModal(item) {
    console.log('Apertura modal per:', item.name, item);
    try {
        const modal = document.getElementById('detailModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalServices = document.getElementById('modalServices');
        const modalGalleryWrapper = document.getElementById('modalGalleryWrapper');
        const modalGuests = document.getElementById('modalGuests');
        const modalBeds = document.getElementById('modalBeds');

        if (!modal || !modalTitle || !modalDescription || !modalServices || !modalGalleryWrapper) {
            console.error('Modal elements not found!');
            alert('Errore nell\'apertura del modal. Ricarica la pagina e riprova.');
            return;
        }

        if (!item) {
            console.error('Item data is missing!');
            alert('Dati dell\'alloggio non disponibili.');
            return;
        }

        // Get current language and translations
        const currentLang = window.translationManager ? window.translationManager.getCurrentLanguage() : 'it';
        
        // Get translated content
        let name = item.name || 'Dettagli';
        let description = item.description || 'Descrizione non disponibile.';
        
        const translatedName = getTranslatedAccommodationName(item.id, currentLang);
        const translatedDescription = getTranslatedAccommodationDescription(item.id, currentLang);
        
        if (translatedName) name = translatedName;
        if (translatedDescription) description = translatedDescription;

        // Get translated labels
        const guestsLabel = getTranslatedLabel('guests', currentLang);
        
        // Aggiorna le informazioni base
        modalTitle.textContent = name;
        modalDescription.textContent = description;
        
        // Aggiorna capacità
        if (modalGuests) {
            modalGuests.textContent = `${item.maxGuests || 'N/A'} ${guestsLabel}`;
        }
        if (modalBeds) {
            modalBeds.textContent = item.beds || 'Letti non specificati';
        }

    // Aggiorna servizi con griglia di icone
    modalServices.innerHTML = ''; // Clear previous services
    if (item.services && item.services.length > 0) {
        item.services.forEach(service => {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'service-item';
            
            // Get translated service
            const translatedService = getTranslatedService(service, currentLang);
            
            // Icone per servizi specifici
            let icon = 'fas fa-check';
            const serviceLower = service.toLowerCase();
            if (serviceLower.includes('wifi')) icon = 'fas fa-wifi';
            else if (serviceLower.includes('cucina') || serviceLower.includes('kitchen')) icon = 'fas fa-utensils';
            else if (serviceLower.includes('bagno') || serviceLower.includes('bathroom')) icon = 'fas fa-bath';
            else if (serviceLower.includes('aria condizionata') || serviceLower.includes('air conditioning')) icon = 'fas fa-snowflake';
            else if (serviceLower.includes('tv')) icon = 'fas fa-tv';
            else if (serviceLower.includes('balcone') || serviceLower.includes('terrazza') || serviceLower.includes('balcony') || serviceLower.includes('terrace')) icon = 'fas fa-building';
            else if (serviceLower.includes('vista') || serviceLower.includes('view')) icon = 'fas fa-eye';
            else if (serviceLower.includes('parcheggio') || serviceLower.includes('parking')) icon = 'fas fa-parking';
            
            serviceItem.innerHTML = `
                <i class="${icon}"></i>
                <span>${translatedService}</span>
            `;
            modalServices.appendChild(serviceItem);
        });
    } else {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        const noServicesText = currentLang === 'en' ? 'Services not specified' : 'Servizi non specificati';
        serviceItem.innerHTML = `
            <i class="fas fa-info"></i>
            <span>${noServicesText}</span>
        `;
        modalServices.appendChild(serviceItem);
    }

    // Aggiorna galleria
    modalGalleryWrapper.innerHTML = ''; // Clear previous gallery images
    if (item.gallery && item.gallery.length > 0) {
        item.gallery.forEach(imagePath => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = item.name + ' gallery image';
            img.loading = 'lazy';
            slide.appendChild(img);
            modalGalleryWrapper.appendChild(slide);
        });
    } else {
        // Optionally, display a placeholder if no gallery images
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const img = document.createElement('img');
        img.src = item.image || 'images/placeholder-image.jpg'; // Use main image or placeholder
        img.alt = item.name + ' image';
        slide.appendChild(img);
        modalGalleryWrapper.appendChild(slide);
    }

    // Inizializza/reinizializza Swiper
    if (modalSwiperInstance) {
        modalSwiperInstance.destroy(true, true);
        modalSwiperInstance = null;
    }

    modalSwiperInstance = new Swiper('.modal-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: item.gallery && item.gallery.length > 1, // Loop only if more than one image
        pagination: {
            el: '.modal-gallery-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.modal-gallery-button-next',
            prevEl: '.modal-gallery-button-prev',
        },
    });
    
    // Update swiper if only one slide, to hide nav/pagination if not looping
    if (item.gallery && item.gallery.length <= 1) {
        modalSwiperInstance.params.loop = false;
        modalSwiperInstance.update();
    }

    // Mostra il modal
    modal.style.display = 'block';
    console.log('Modal display impostato su block');
    // Aggiungi un piccolo delay per permettere al display di essere applicato prima della transizione
    setTimeout(() => {
        modal.classList.add('show');
        console.log('Classe show aggiunta al modal');
    }, 10);
    document.body.classList.add('modal-open'); // Impedisce lo scroll della pagina
    console.log('Modal aperto con successo');
    
    } catch (error) {
        console.error('Errore nell\'apertura del modal:', error);
        alert('Si è verificato un errore nell\'apertura del modal. Ricarica la pagina e riprova.');
    }
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.classList.remove('show');
        // Aspetta che la transizione finisca prima di nascondere il modal
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.classList.remove('modal-open'); // Ripristina lo scroll della pagina
    }
    if (modalSwiperInstance) {
        modalSwiperInstance.destroy(true, true);
        modalSwiperInstance = null;
    }
}

function openAttractionsGallery(category) {
    const modal = document.getElementById('attractionsGalleryModal');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalDescription = document.getElementById('gallery-description');
    const galleryWrapper = document.getElementById('galleryModalWrapper');

    if (!modal || !modalTitle || !modalDescription || !galleryWrapper) {
        console.error('Attractions gallery modal elements not found!');
        return;
    }

    const attractionData = attractionsData[category];
    if (!attractionData) {
        console.error('Attraction data not found for category:', category);
        return;
    }

    // Get current language
    const currentLang = window.translationManager ? window.translationManager.getCurrentLanguage() : 'it';

    // Aggiorna contenuto modal con traduzioni
    const title = attractionData.title[currentLang] || attractionData.title.it;
    const description = attractionData.description[currentLang] || attractionData.description.it;
    
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Pulisci gallery wrapper
    galleryWrapper.innerHTML = '';    // Aggiungi media alla gallery
    if (attractionData.media && attractionData.media.length > 0) {
        attractionData.media.forEach((mediaItem, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            if (mediaItem.type === 'image') {
                const img = document.createElement('img');
                
                // Determina se usare WebP o fallback
                const hasWebPSupport = document.documentElement.classList.contains('webp');
                const imageSrc = hasWebPSupport && mediaItem.srcWebp ? mediaItem.srcWebp : mediaItem.src;
                
                img.src = imageSrc;
                img.alt = mediaItem.alt || attractionData.title.it;
                img.loading = 'lazy';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                
                // Gestione errori di caricamento con retry limitato
                let retryCount = 0;
                const maxRetries = 1;
                
                img.onerror = function() {
                    console.warn(`Impossibile caricare l'immagine: ${this.src}`);
                    
                    // Primo tentativo: fallback da WebP a JPG/JPEG
                    if (retryCount === 0 && hasWebPSupport && mediaItem.srcWebp && this.src !== mediaItem.src) {
                        retryCount++;
                        this.src = mediaItem.src;
                        return;
                    }
                    
                    // Secondo tentativo: prova a cambiare estensione da .jpg a .jpeg
                    if (retryCount === 1 && this.src.endsWith('.jpg')) {
                        retryCount++;
                        this.src = this.src.replace('.jpg', '.jpeg');
                        return;
                    }
                    
                    // Se tutti i tentativi falliscono, mostra placeholder
                    console.error(`Tutti i tentativi di caricamento falliti per: ${mediaItem.alt}`);
                    this.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-error-placeholder';
                    placeholder.innerHTML = `
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 400px; background: linear-gradient(135deg, #f5f5f5, #ebebeb); color: #666; border-radius: 8px;">
                            <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                            <p style="margin: 0; text-align: center; font-weight: 600;">Immagine non disponibile</p>
                            <small style="opacity: 0.7; margin-top: 0.5rem; text-align: center; max-width: 300px;">${mediaItem.alt}</small>
                        </div>
                    `;
                    slide.appendChild(placeholder);
                };
                
                slide.appendChild(img);
            } else if (mediaItem.type === 'video') {
                const video = document.createElement('video');
                video.src = mediaItem.src;
                video.controls = true;
                video.style.maxWidth = '100%';
                video.style.maxHeight = '100%';
                slide.appendChild(video);
            } else {
                // Placeholder
                const placeholderDiv = document.createElement('div');
                placeholderDiv.className = 'placeholder-slide';
                placeholderDiv.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #f5f5f5, #ebebeb); color: #666;">
                        <i class="${mediaItem.icon}" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <p style="margin: 0; font-weight: 600;">${mediaItem.text}</p>
                        <small style="opacity: 0.7; margin-top: 0.5rem;">Immagine da caricare</small>
                    </div>
                `;
                slide.appendChild(placeholderDiv);
            }

            galleryWrapper.appendChild(slide);
        });
    } else {
        // Nessun media disponibile
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="placeholder-slide">
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #f5f5f5, #ebebeb); color: #666;">
                    <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p style="margin: 0; font-weight: 600;">Galleria in preparazione</p>
                    <small style="opacity: 0.7; margin-top: 0.5rem;">Le immagini verranno caricate presto</small>
                </div>
            </div>
        `;
        galleryWrapper.appendChild(slide);
    }

    // Distruggi swiper esistente se presente
    if (attractionsGallerySwiper) {
        attractionsGallerySwiper.destroy(true, true);
        attractionsGallerySwiper = null;
    }

    // Inizializza nuovo swiper
    attractionsGallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: attractionData.media && attractionData.media.length > 1,
        pagination: {
            el: '.gallery-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.gallery-button-next',
            prevEl: '.gallery-button-prev',
        },
        keyboard: {
            enabled: true,
        }
    });

    // Mostra modal
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus sul pulsante di chiusura per accessibilità
    const closeBtn = modal.querySelector('.gallery-close-btn');
    if (closeBtn) {
        closeBtn.focus();
    }
}

function closeAttractionsGallery() {
    const modal = document.getElementById('attractionsGalleryModal');
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
    if (attractionsGallerySwiper) {
        attractionsGallerySwiper.destroy(true, true);
        attractionsGallerySwiper = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Script caricato, inizializzazione in corso...');
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('header .main-nav a[href^="#"], .hero-content a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId.length <= 1) return; // Handle cases like <a href="#"> for non-scrolling links
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Load accommodation data and initialize swipers
    console.log('Caricamento dati alloggi...');
    loadAccommodationData();

    // Modal close button event listener
    const modalCloseButton = document.querySelector('.modal-close-button');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeDetailModal);
    }

    // Close modal when clicking outside of the modal-content
    const modal = document.getElementById('detailModal');
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeDetailModal();
            }
        });
    }
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const modal = document.getElementById('detailModal');
            if (modal && modal.style.display === 'block') {
                closeDetailModal();
            }
        }
    });

    // Event listeners per la galleria delle attrazioni
    const attractionCards = document.querySelectorAll('.attraction-card');
    attractionCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Click sulla card
        card.addEventListener('click', () => {
            openAttractionsGallery(category);
        });

        // Click sul bottone media
        const mediaBtn = card.querySelector('.media-btn');
        if (mediaBtn) {
            mediaBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita doppio trigger
                openAttractionsGallery(category);
            });
        }

        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openAttractionsGallery(category);
            }
        });

        // Rendi le card focusabili
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Apri galleria per ${card.querySelector('h3').textContent}`);
    });

    // Event listeners per la galleria modal
    const galleryModal = document.getElementById('attractionsGalleryModal');
    const galleryCloseBtn = document.querySelector('.gallery-close-btn');

    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener('click', closeAttractionsGallery);
    }

    if (galleryModal) {
        // Close modal quando si clicca fuori
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeAttractionsGallery();
            }
        });

        // Keyboard support per chiudere la modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && galleryModal.style.display === 'block') {
                closeAttractionsGallery();
            }
        });
    }

    console.log("Amelia Apts & Rooms JS Loaded");
});

// WhatsApp Modal functionality
function openWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    if (modal) {
        // Assicurati che il modal sia visibile prima di aggiungere la classe show
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        
        // Forza un reflow per assicurarsi che il display sia applicato
        modal.offsetHeight;
        
        // Aggiungi classe per animazione
        modal.classList.add('show');
        
        // Previene lo scroll della pagina
        document.body.style.overflow = 'hidden';
    }
}

function closeWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    if (modal) {
        // Rimuovi solo la classe show per fade-out, mantieni display: flex
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        
        // Aspetta che l'animazione di fade-out finisca prima di nascondere completamente
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
    }
}

// Chiudi il modal cliccando sull'overlay
document.addEventListener('click', function(event) {
    const modal = document.getElementById('whatsappModal');
    const overlay = document.querySelector('.whatsapp-modal-overlay');
    
    if (event.target === overlay) {
        closeWhatsAppModal();
    }
});

// Chiudi il modal con il tasto Esc
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('whatsappModal');
        if (modal && modal.classList.contains('show')) {
            closeWhatsAppModal();
        }
    }
});

// Funzioni per gestire il modal del form email
function openEmailForm() {
    const modal = document.getElementById('emailModal');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    
    // Aggiungi classe per animazione
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Previene lo scroll della pagina
    document.body.style.overflow = 'hidden';
    
    // Focus sul primo campo del form
    setTimeout(() => {
        document.getElementById('nome').focus();
    }, 300);
}

function closeEmailForm() {
    const modal = document.getElementById('emailModal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Chiudi il modal cliccando fuori dal contenuto
window.addEventListener('click', function(event) {
    const modal = document.getElementById('emailModal');
    if (event.target === modal) {
        closeEmailForm();
    }
});

// Chiudi modal con tasto ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('emailModal');
        if (modal && modal.style.display === 'block') {
            closeEmailForm();
        }
    }
});

// Gestione invio form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Raccoglie i dati del form
            const formData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                checkin: document.getElementById('checkin').value,
                checkout: document.getElementById('checkout').value,
                telefono: document.getElementById('telefono').value,
                camera: document.getElementById('camera').value,
                note: document.getElementById('note').value
            };
            
            // Validazione date
            const checkinDate = new Date(formData.checkin);
            const checkoutDate = new Date(formData.checkout);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (checkinDate < today) {
                alert('La data di check-in non può essere nel passato.');
                return;
            }
            
            if (checkoutDate <= checkinDate) {
                alert('La data di check-out deve essere successiva alla data di check-in.');
                return;
            }
            
            // Qui puoi implementare l'invio via email o salvare i dati
            console.log('Dati form:', formData);
            
            // Crea il messaggio per WhatsApp con i dati del form
            const whatsappMessage = createWhatsAppMessage(formData);
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=393123456789&text=${encodeURIComponent(whatsappMessage)}`;
            
            // Apri WhatsApp in una nuova finestra
            window.open(whatsappUrl, '_blank');
            
            // Mostra messaggio di conferma
            showSuccessMessage();
            
            // Chiudi il modal e resetta il form
            closeEmailForm();
            this.reset();
        });
    }
});

// Funzione per creare il messaggio WhatsApp
function createWhatsAppMessage(data) {
    const checkinFormatted = formatDate(data.checkin);
    const checkoutFormatted = formatDate(data.checkout);
    
    let message = `🏨 *Richiesta Prenotazione Amelia Apts & Rooms*\n\n`;
    message += `👤 *Nome:* ${data.nome}\n`;
    message += `📧 *Email:* ${data.email}\n`;
    message += `📞 *Telefono:* ${data.telefono}\n`;
    message += `📅 *Check-in:* ${checkinFormatted}\n`;
    message += `📅 *Check-out:* ${checkoutFormatted}\n`;
    message += `🏠 *Camera:* ${data.camera}\n`;
    
    if (data.note.trim()) {
        message += `📝 *Note:* ${data.note}\n`;
    }
    
    message += `\nGrazie per averci scelto! 🌟`;
    
    return message;
}

// Funzione per formattare la data
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('it-IT', options);
}

// Funzione per mostrare messaggio di successo
function showSuccessMessage() {
    // Crea un toast notification
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Richiesta inviata con successo! Ti contatteremo presto.</span>
    `;
    
    // Aggiungi stili inline per il toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        z-index: 1001;
        font-weight: 500;
        max-width: 350px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animazione di entrata
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Rimuovi dopo 4 secondi
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Imposta date minime per i campi data
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput) {
        checkinInput.setAttribute('min', today);
        
        // Quando cambia la data di check-in, aggiorna il minimo per check-out
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            const minCheckout = checkinDate.toISOString().split('T')[0];
            checkoutInput.setAttribute('min', minCheckout);
            
            // Se check-out è prima del nuovo minimo, resettalo
            if (checkoutInput.value && checkoutInput.value <= this.value) {
                checkoutInput.value = '';
            }
        });
    }
    
    if (checkoutInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkoutInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);
    }
});

// Handle main contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const mainContactForm = document.getElementById('contact-form');
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone') ? document.getElementById('phone').value.trim() : '',
                message: document.getElementById('message').value.trim()
            };
            
            // Validate data
            if (!formData.name || !formData.email || !formData.message) {
                showFormStatus('error', 'Per favore, compila tutti i campi obbligatori.');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showFormStatus('error', 'Per favore, inserisci un indirizzo email valido.');
                return;
            }
            
            // Here you would typically send data to server via fetch() or similar
            console.log('Form data submitted:', formData);
            
            // Simulate successful submission (replace with actual API call)
            simulateFormSubmission(formData)
                .then(response => {
                    // Success
                    showFormStatus('success', 'Grazie! Il tuo messaggio è stato inviato con successo.');
                    mainContactForm.reset();
                })
                .catch(error => {
                    // Error
                    showFormStatus('error', 'Si è verificato un errore durante l\'invio del modulo. Riprova più tardi o contattaci direttamente via email.');
                    console.error('Form submission error:', error);
                });
        });
    }
});

// Form validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form status display helper
function showFormStatus(type, message) {
    const statusElement = document.getElementById('form-status');
    if (!statusElement) return;
    
    statusElement.textContent = message;
    statusElement.className = '';
    statusElement.classList.add(type);
    statusElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}

// Simulate sending data to server (replace with actual API call)
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // 90% success rate for simulation
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Network error'));
            }
        }, 1000);
    });
}
