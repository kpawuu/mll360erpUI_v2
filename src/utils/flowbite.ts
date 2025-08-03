// Flowbite initialization utility
let flowbiteInitialized = false;
let observer: MutationObserver | null = null;

export const initializeFlowbite = async () => {
    try {
        const { initFlowbite } = await import('flowbite');
        initFlowbite();
        flowbiteInitialized = true;
        console.log('Flowbite initialized successfully');
    } catch (error) {
        console.warn('Failed to initialize Flowbite:', error);
    }
};

export const reinitializeFlowbite = async () => {
    flowbiteInitialized = false;
    await initializeFlowbite();
};

export const setupFlowbiteObserver = () => {
    if (observer) {
        observer.disconnect();
    }

    // Create a mutation observer to watch for DOM changes
    observer = new MutationObserver((mutations) => {
        let shouldReinitialize = false;
        
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Check if any dropdown or collapse elements were added
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as Element;
                        if (element.querySelector('[data-dropdown-toggle], [data-collapse-toggle]')) {
                            shouldReinitialize = true;
                        }
                    }
                });
            }
        });

        if (shouldReinitialize) {
            setTimeout(() => {
                reinitializeFlowbite();
            }, 50);
        }
    });

    // Start observing the document body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

export const cleanupFlowbiteObserver = () => {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}; 