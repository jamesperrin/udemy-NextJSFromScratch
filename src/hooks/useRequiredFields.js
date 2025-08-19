import { useEffect } from 'react';

export const useRequiredFields = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    const handleRequiredFields = () => {
      const form = document.querySelector('form');

      if (!form) {
        return;
      }

      // Handle standard form fields
      const fields = form.querySelectorAll('input,select,textarea,[required]:not([type=radio])');

      fields.forEach((el) => {
        if (el.hasAttribute('data-val-required') || el.hasAttribute('field-required') || el.hasAttribute('required')) {
          const label = document.querySelector(`label:not(.form-check-label)[for="${el.id}"]`);
          addRequiredIndicator(label);
        }
      });

      // Handle radio buttons
      const radioButtons = form.querySelectorAll('[type=radio][required]');

      radioButtons.forEach((el) => {
        const fieldset = el.closest('fieldset');
        const legend = fieldset?.querySelector('legend');
        if (legend) {
          legend.classList.add('field-required');
          addRequiredIndicator(legend);
        }
      });
    };

    const addRequiredIndicator = (element) => {
      if (!element || element.querySelector('abbr[title="required"]')) {
        return;
      }

      const abbr = document.createElement('abbr');
      abbr.title = 'required';
      abbr.innerText = '*';
      abbr.setAttribute('aria-live', 'off');
      abbr.classList.add('usa-hint', 'usa-hint--required', 'required');
      element.append(abbr);
    };

    // Run immediately and on DOM changes
    handleRequiredFields();

    // Optional: Set up MutationObserver for dynamic content
    const observer = new MutationObserver(handleRequiredFields);

    observer.observe(document.body, {
      childList: true, // Watch for added/removed child elements
      subtree: true, // Watch the entire subtree (children of children)
      // attributes: true, // Watch for attribute changes
      // attributeOldValue: true, // Include old attribute values
      // characterData: true, // Watch for text content changes
    });

    return () => observer.disconnect();
  }, []);
};
