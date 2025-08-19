// src/utils/requiredLabels.js
export function handleRequiredLabels() {
  const App = {};

  /**
   * Handles creating required abbr element.
   * @param {HTMLLabelElement} HTML label element
   */
  App.HandleRequiredFormLabels = function (label) {
    if (label && !!label.innerText) {
      if (!label.querySelector('abbr[title="required"]')) {
        const abbr = document.createElement('abbr');
        abbr.title = 'required';
        abbr.innerText = '*';
        abbr.setAttribute('aria-live', 'off');
        abbr.classList.add('usa-hint', 'usa-hint--required', 'required');
        label.append(abbr);
      }
    }
  };

  /**
   * Handles creating required abbr element.
   */
  App.HandleFormElementRequired = function () {
    Array.from(document.querySelectorAll('.fes-field-required')).forEach(function (el) {
      const abbr = document.createElement('abbr');
      abbr.innerText = '*';
      abbr.title = 'required';
      abbr.setAttribute('aria-live', 'off');
      abbr.classList.add('usa-hint', 'usa-hint--required', 'required');
      el.append(abbr);
    });
  };

  /**
   * Displays a red asterisk near label for required form fields.
   */
  App.HandleRequiredFormFields = function () {
    if (document.querySelector('form')) {
      Array.from(document.querySelectorAll('input,select,textarea,[required]:not([type=radio])')).forEach(function (
        el,
      ) {
        if (
          el.hasAttribute('data-val-required') ||
          el.hasAttribute('fes-field-required') ||
          el.hasAttribute('required')
        ) {
          const label = document.querySelector(`label:not(.form-check-label)[for="${el.id}"]`);
          App.HandleRequiredFormLabels(label);
        }
      });
    }
  };

  /**
   * Displays a red asterisk near label for required form custom fields like radio inputs.
   */
  App.HandleRequiredFormCustomFields = function () {
    if (document.querySelector('form')) {
      Array.from(document.querySelectorAll('[type=radio][required]')).forEach((el) => {
        el.closest('fieldset').querySelector('legend').classList.add('fes-field-required');
      });

      App.HandleFormElementRequired();
    }
  };

  // Run once on load
  App.HandleRequiredFormFields();
  App.HandleRequiredFormCustomFields();
}
