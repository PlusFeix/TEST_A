// WebP support detection and fallback system
(function() {
    // Check WebP support
    function supportsWebP() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = function () {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    // Apply WebP support class to document
    async function initWebPSupport() {
        const hasWebPSupport = await supportsWebP();
        document.documentElement.classList.add(hasWebPSupport ? 'webp' : 'no-webp');
        
        // Apply background images with WebP support
        if (hasWebPSupport) {
            applyWebPBackgrounds();
        } else {
            applyFallbackBackgrounds();
        }
    }
    
    // Apply WebP backgrounds
    function applyWebPBackgrounds() {
        const attractions = [
            {
                selector: '[data-category="centro-storico"] .placeholder-media',
                webp: 'images/attractions/centro-storico/vicoli-medievali.webp',
                fallback: 'images/attractions/centro-storico/vicoli-medievali.jpg',
                gradient: 'linear-gradient(135deg, rgba(244, 162, 97, 0.7), rgba(231, 111, 81, 0.7))'
            },
            {
                selector: '[data-category="mare"] .placeholder-media',
                webp: 'images/attractions/mare/maria-pia.webp',
                fallback: 'images/attractions/mare/maria-pia.jpeg',
                gradient: 'linear-gradient(135deg, rgba(127, 179, 211, 0.7), rgba(93, 156, 219, 0.7))'
            },
            {
                selector: '[data-category="natura"] .placeholder-media',
                webp: 'images/attractions/natura/capo-caccia.webp',
                fallback: 'images/attractions/natura/capo-caccia.jpg',
                gradient: 'linear-gradient(135deg, rgba(144, 198, 149, 0.7), rgba(107, 142, 35, 0.7))'
            },
            {
                selector: '[data-category="cultura"] .placeholder-media',
                webp: 'images/attractions/cultura/cattedrale.webp',
                fallback: 'images/attractions/cultura/cattedrale.jpg',
                gradient: 'linear-gradient(135deg, rgba(212, 163, 115, 0.7), rgba(224, 201, 166, 0.7))'
            },
            {
                selector: '[data-category="enogastronomia"] .placeholder-media',
                webp: 'images/attractions/enogastronomia/vini-locali.webp',
                fallback: 'images/attractions/enogastronomia/vini-locali.jpg',
                gradient: 'linear-gradient(135deg, rgba(231, 111, 81, 0.7), rgba(244, 162, 97, 0.7))'
            },
            {
                selector: '[data-category="sport"] .placeholder-media',
                webp: 'images/attractions/sport/escursioni-barca.webp',
                fallback: 'images/attractions/sport/escursioni-barca.jpg',
                gradient: 'linear-gradient(135deg, rgba(93, 156, 219, 0.7), rgba(127, 179, 211, 0.7))'
            }
        ];

        attractions.forEach(attraction => {
            const element = document.querySelector(attraction.selector);
            if (element) {
                const bgImage = `${attraction.gradient}, url('${attraction.webp}')`;
                element.style.backgroundImage = bgImage;
                element.style.backgroundSize = 'cover';
                element.style.backgroundPosition = 'center';
                
                // Gestione errore caricamento WebP con retry limitato
                const testImg = new Image();
                let retryAttempted = false;
                
                testImg.onload = function() {
                    console.log(`✅ WebP caricato: ${attraction.webp}`);
                };
                
                testImg.onerror = function() {
                    console.warn(`⚠️ WebP fallito, uso fallback: ${attraction.fallback}`);
                    const fallbackBgImage = `${attraction.gradient}, url('${attraction.fallback}')`;
                    element.style.backgroundImage = fallbackBgImage;
                    
                    // Test il fallback solo una volta
                    if (!retryAttempted) {
                        retryAttempted = true;
                        const testFallback = new Image();
                        
                        testFallback.onerror = function() {
                            console.error(`❌ Fallback mancante: ${attraction.fallback}`);
                            
                            // Prova con estensione .jpeg se il fallback era .jpg
                            if (attraction.fallback.endsWith('.jpg')) {
                                const jpegFallback = attraction.fallback.replace('.jpg', '.jpeg');
                                console.log(`🔄 Tentativo con .jpeg: ${jpegFallback}`);
                                
                                const testJpeg = new Image();
                                testJpeg.onload = function() {
                                    const jpegBgImage = `${attraction.gradient}, url('${jpegFallback}')`;
                                    element.style.backgroundImage = jpegBgImage;
                                };
                                testJpeg.onerror = function() {
                                    console.error(`❌ Anche .jpeg mancante: ${jpegFallback}`);
                                    element.style.backgroundImage = attraction.gradient;
                                };
                                testJpeg.src = jpegFallback;
                            } else {
                                // Se non è .jpg, usa solo il gradiente
                                element.style.backgroundImage = attraction.gradient;
                            }
                        };
                        
                        testFallback.src = attraction.fallback;
                    }
                };
                testImg.src = attraction.webp;
            }
        });
    }

    // Apply fallback backgrounds
    function applyFallbackBackgrounds() {
        const attractions = [
            {
                selector: '[data-category="centro-storico"] .placeholder-media',
                fallback: 'images/attractions/centro-storico/vicoli-medievali.jpg',
                gradient: 'linear-gradient(135deg, rgba(244, 162, 97, 0.7), rgba(231, 111, 81, 0.7))'
            },
            {
                selector: '[data-category="mare"] .placeholder-media',
                fallback: 'images/attractions/mare/maria-pia.jpeg',
                gradient: 'linear-gradient(135deg, rgba(127, 179, 211, 0.7), rgba(93, 156, 219, 0.7))'
            },
            {
                selector: '[data-category="natura"] .placeholder-media',
                fallback: 'images/attractions/natura/capo-caccia.jpg',
                gradient: 'linear-gradient(135deg, rgba(144, 198, 149, 0.7), rgba(107, 142, 35, 0.7))'
            },
            {
                selector: '[data-category="cultura"] .placeholder-media',
                fallback: 'images/attractions/cultura/cattedrale.jpg',
                gradient: 'linear-gradient(135deg, rgba(212, 163, 115, 0.7), rgba(224, 201, 166, 0.7))'
            },
            {
                selector: '[data-category="enogastronomia"] .placeholder-media',
                fallback: 'images/attractions/enogastronomia/vini-locali.jpg',
                gradient: 'linear-gradient(135deg, rgba(231, 111, 81, 0.7), rgba(244, 162, 97, 0.7))'
            },
            {
                selector: '[data-category="sport"] .placeholder-media',
                fallback: 'images/attractions/sport/escursioni-barca.jpg',
                gradient: 'linear-gradient(135deg, rgba(93, 156, 219, 0.7), rgba(127, 179, 211, 0.7))'
            }
        ];

        attractions.forEach(attraction => {
            const element = document.querySelector(attraction.selector);
            if (element) {
                const bgImage = `${attraction.gradient}, url('${attraction.fallback}')`;
                element.style.backgroundImage = bgImage;
                element.style.backgroundSize = 'cover';
                element.style.backgroundPosition = 'center';
                
                // Test se il fallback esiste con retry limitato
                const testImg = new Image();
                let retryAttempted = false;
                
                testImg.onload = function() {
                    console.log(`✅ Fallback caricato: ${attraction.fallback}`);
                };
                
                testImg.onerror = function() {
                    console.warn(`⚠️ Fallback mancante: ${attraction.fallback}`);
                    
                    // Prova con estensione .jpeg se il fallback era .jpg
                    if (!retryAttempted && attraction.fallback.endsWith('.jpg')) {
                        retryAttempted = true;
                        const jpegFallback = attraction.fallback.replace('.jpg', '.jpeg');
                        console.log(`🔄 Tentativo con .jpeg: ${jpegFallback}`);
                        
                        const testJpeg = new Image();
                        testJpeg.onload = function() {
                            const jpegBgImage = `${attraction.gradient}, url('${jpegFallback}')`;
                            element.style.backgroundImage = jpegBgImage;
                        };
                        testJpeg.onerror = function() {
                            console.error(`❌ Anche .jpeg mancante: ${jpegFallback}`);
                            element.style.backgroundImage = attraction.gradient;
                        };
                        testJpeg.src = jpegFallback;
                    } else {
                        // Se non è .jpg o retry già fatto, usa solo il gradiente
                        element.style.backgroundImage = attraction.gradient;
                    }
                };
                testImg.src = attraction.fallback;
            }
        });
    }

    // Preload critical images with smart extension detection
    function preloadAttractionImages() {
        const hasWebPSupport = document.documentElement.classList.contains('webp');
        
        // Define images with their actual extensions
        const imagesToPreload = [
            {
                webp: 'images/attractions/centro-storico/vicoli-medievali.webp',
                fallback: 'images/attractions/centro-storico/vicoli-medievali.jpg'
            },
            {
                webp: 'images/attractions/mare/maria-pia.webp',
                fallback: 'images/attractions/mare/maria-pia.jpeg'
            },
            {
                webp: 'images/attractions/natura/capo-caccia.webp',
                fallback: 'images/attractions/natura/capo-caccia.jpg'
            },
            {
                webp: 'images/attractions/cultura/cattedrale.webp',
                fallback: 'images/attractions/cultura/cattedrale.jpg'
            },
            {
                webp: 'images/attractions/enogastronomia/vini-locali.webp',
                fallback: 'images/attractions/enogastronomia/vini-locali.jpg'
            },
            {
                webp: 'images/attractions/sport/escursioni-barca.webp',
                fallback: 'images/attractions/sport/escursioni-barca.jpg'
            }
        ];

        imagesToPreload.forEach(imageSet => {
            const img = new Image();
            const src = hasWebPSupport ? imageSet.webp : imageSet.fallback;
            
            img.onerror = function() {
                // Se il primo tentativo fallisce, prova l'altro formato
                const alternateSrc = hasWebPSupport ? imageSet.fallback : imageSet.webp;
                
                // Se era .jpg, prova anche .jpeg
                if (alternateSrc.endsWith('.jpg')) {
                    const jpegSrc = alternateSrc.replace('.jpg', '.jpeg');
                    const jpegImg = new Image();
                    jpegImg.onerror = function() {
                        console.warn(`Preload fallito per: ${src}, ${alternateSrc}, ${jpegSrc}`);
                    };
                    jpegImg.src = jpegSrc;
                } else {
                    const altImg = new Image();
                    altImg.onerror = function() {
                        console.warn(`Preload fallito per: ${src}, ${alternateSrc}`);
                    };
                    altImg.src = alternateSrc;
                }
            };
            
            img.src = src;
        });
    }

    // Initialize WebP support detection
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWebPSupport);
    } else {
        initWebPSupport();
    }

    // Preload images after WebP detection
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(preloadAttractionImages, 100);
    });
})();
