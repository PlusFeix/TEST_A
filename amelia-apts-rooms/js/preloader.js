/* ==============================================
   PRELOADER FUNCTIONALITY
   ============================================== */

(function() {
    'use strict';
    
    // Preloader configuration
    const PRELOADER_CONFIG = {
        minDisplayTime: 1000,      // Minimum time to show preloader (1 second)
        fadeOutDuration: 600,      // Fade out transition duration
        pageAnimationDelay: 200    // Delay before page content animation
    };
    
    // DOM elements
    let preloader = null;
    let body = null;
    let pageContent = null;
    
    // Timing variables
    let loadStartTime = Date.now();
    let isPageLoaded = false;
    let resourcesLoaded = 0;
    let totalResources = 0;
    
    /**
     * Initialize preloader
     */
    function initPreloader() {
        // Get DOM elements
        preloader = document.getElementById('preloader');
        body = document.body;
        
        if (!preloader) {
            console.warn('Preloader element not found');
            return;
        }
        
        // Add page content wrapper for fade-in animation
        wrapPageContent();
        
        // Count resources to load
        countResources();
        
        // Set up event listeners
        setupEventListeners();
        
        // Start monitoring page load
        monitorPageLoad();
        
        console.log('Preloader initialized');
    }
    
    /**
     * Wrap page content for animation
     */
    function wrapPageContent() {
        const contentElements = Array.from(body.children).filter(el => 
            el.id !== 'preloader' && 
            !el.classList.contains('cookie-banner')
        );
        
        const wrapper = document.createElement('div');
        wrapper.className = 'page-content';
        
        contentElements.forEach(el => {
            wrapper.appendChild(el);
        });
        
        body.appendChild(wrapper);
        pageContent = wrapper;
    }
      /**
     * Count resources that need to be loaded
     */
    function countResources() {
        // Count images
        const images = document.querySelectorAll('img');
        
        // Count background images from CSS
        const elementsWithBg = [];
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(el => {
            const style = window.getComputedStyle(el);
            const bgImage = style.backgroundImage;
            if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
                elementsWithBg.push(el);
            }
        });
        
        // Count videos
        const videos = document.querySelectorAll('video');
        
        // Count external stylesheets and scripts
        const externalStyles = document.querySelectorAll('link[rel="stylesheet"][href^="http"]');
        const externalScripts = document.querySelectorAll('script[src^="http"]');
        
        totalResources = images.length + elementsWithBg.length + videos.length + 
                        externalStyles.length + externalScripts.length;
        
        console.log(`Total resources to load: ${totalResources}`);
        
        // Load background images
        loadBackgroundImages(elementsWithBg);
    }
      /**
     * Load background images
     */
    function loadBackgroundImages(elements) {
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const bgImage = style.backgroundImage;
            const matches = bgImage.match(/url\(["']?([^"')]+)["']?\)/g);
            
            if (matches) {
                matches.forEach(match => {
                    const url = match.replace(/url\(["']?([^"')]+)["']?\)/, '$1');
                    const img = new Image();
                    img.onload = handleResourceLoad;
                    img.onerror = handleResourceLoad;
                    img.src = url;
                });
            }
        });
    }
    
    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Main window load event
        window.addEventListener('load', handleWindowLoad);
        
        // Individual resource load events
        document.querySelectorAll('img').forEach(img => {
            if (img.complete) {
                handleResourceLoad();
            } else {
                img.addEventListener('load', handleResourceLoad);
                img.addEventListener('error', handleResourceLoad);
            }
        });
        
        document.querySelectorAll('video').forEach(video => {
            if (video.readyState >= 3) {
                handleResourceLoad();
            } else {
                video.addEventListener('canplaythrough', handleResourceLoad);
                video.addEventListener('error', handleResourceLoad);
            }
        });
        
        // Handle external resources
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (link.href.startsWith('http')) {
                link.addEventListener('load', handleResourceLoad);
                link.addEventListener('error', handleResourceLoad);
            }
        });
        
        document.querySelectorAll('script[src]').forEach(script => {
            if (script.src.startsWith('http')) {
                script.addEventListener('load', handleResourceLoad);
                script.addEventListener('error', handleResourceLoad);
            }
        });
    }
    
    /**
     * Monitor page loading progress
     */
    function monitorPageLoad() {
        // Check document ready state
        if (document.readyState === 'complete') {
            handleWindowLoad();
            return;
        }
        
        // Monitor document ready state changes
        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'complete') {
                handleWindowLoad();
            }
        });
    }
    
    /**
     * Handle individual resource load
     */
    function handleResourceLoad() {
        resourcesLoaded++;
        
        // Update progress if you want to show a progress bar (optional)
        const progress = totalResources > 0 ? (resourcesLoaded / totalResources) * 100 : 100;
        
        // Optional: dispatch custom event for progress tracking
        window.dispatchEvent(new CustomEvent('preloaderProgress', {
            detail: { progress, loaded: resourcesLoaded, total: totalResources }
        }));
        
        // Check if all resources are loaded
        if (resourcesLoaded >= totalResources && document.readyState === 'complete') {
            handleWindowLoad();
        }
    }
    
    /**
     * Handle window load event
     */
    function handleWindowLoad() {
        if (isPageLoaded) return;
        
        isPageLoaded = true;
        const loadTime = Date.now() - loadStartTime;
        
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Ensure minimum display time
        const remainingTime = Math.max(0, PRELOADER_CONFIG.minDisplayTime - loadTime);
        
        setTimeout(() => {
            hidePreloader();
        }, remainingTime);
    }
    
    /**
     * Hide preloader with smooth animation
     */
    function hidePreloader() {
        if (!preloader) return;
        
        console.log('Hiding preloader');
        
        // Start fade out animation
        preloader.classList.add('hidden');
        
        // Remove scroll lock
        body.classList.remove('preloader-active');
        
        // Show page content with animation
        if (pageContent) {
            pageContent.style.display = 'block';
        }
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            if (preloader && preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
                console.log('Preloader removed from DOM');
            }
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('preloaderHidden'));
            
            // Optional: trigger any additional animations
            triggerPageAnimations();
            
        }, PRELOADER_CONFIG.fadeOutDuration);
    }
    
    /**
     * Trigger additional page animations after preloader
     */
    function triggerPageAnimations() {
        // Add any custom animations here
        // For example, animate navigation or hero section
        
        const animatableElements = document.querySelectorAll('.animate-on-load');
        animatableElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, index * 100);
        });
    }
    
    /**
     * Handle preloader error
     */
    function handlePreloaderError(error) {
        console.error('Preloader error:', error);
        
        // Force hide preloader after a timeout to prevent infinite loading
        setTimeout(() => {
            if (!isPageLoaded) {
                console.warn('Force hiding preloader due to timeout');
                hidePreloader();
            }
        }, 10000); // 10 second timeout
    }
    
    /**
     * Public API
     */
    window.PreloaderAPI = {
        hide: hidePreloader,
        isLoaded: () => isPageLoaded,
        getProgress: () => totalResources > 0 ? (resourcesLoaded / totalResources) * 100 : 100
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreloader);
    } else {
        initPreloader();
    }
    
    // Error handling
    window.addEventListener('error', handlePreloaderError);
    window.addEventListener('unhandledrejection', handlePreloaderError);
    
})();
