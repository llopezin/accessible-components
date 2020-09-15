export default function addModalKeyboardFunctionality(
  modal,
  trigger,
  closeModal
) {
  let focusableElements = modal.querySelectorAll(
    "input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tab-index = '0'], a, object"
  );

  if (trigger) {
    trigger.addEventListener("click", () => {
      focusModal();
      addKeyDownEvent();
    });
  } else {
    addKeyDownEvent();
  }

  function addKeyDownEvent() {
    modal.onkeydown = (e) => {
      trapFocus(e);
      if (closeModal && e.key === "Escape") {
        closeModal();
        resetFocus();
      }
    };
  }

  function trapFocus(e) {
    let firstFocusableElement = focusableElements[0];
    let lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (e.key === "Tab") {
      let currentFocused = document.activeElement;
      if (currentFocused === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
      if (e.shiftKey && currentFocused === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    }
  }

  function focusModal() {
    focusableElements[0].focus();
  }

  function resetFocus() {
    if (trigger) trigger.focus();
  }
}
