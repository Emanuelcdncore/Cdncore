'use client';

import { useEffect } from 'react';

const CopyProtection = () => {
  useEffect(() => {
    const isFormElement = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      return Boolean(target.closest('input, textarea, select, [contenteditable="true"], button, label, form'));
    };

    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      if (isFormElement(e.target)) return;
      // Disable Ctrl+A (select all)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+C (copy)
      if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+V (paste)
      if (e.ctrlKey && e.keyCode === 86) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+X (cut)
      if (e.ctrlKey && e.keyCode === 88) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+S (save)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+U (view source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+I (dev tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+C (inspect element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      // Disable F12 (dev tools)
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+J (console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
    };

    const disableTextSelection = (e: Event) => {
      if (isFormElement(e.target)) return;
      if (window.getSelection) {
        window.getSelection()?.removeAllRanges();
      }
    };

    const disablePrint = (e: KeyboardEvent) => {
      if (isFormElement(e.target)) return;
      // Disable Ctrl+P (print)
      if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        return false;
      }
    };

    const disableDragAndDrop = (e: DragEvent) => {
      if (isFormElement(e.target)) return;
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('keydown', disableKeyboardShortcuts, { capture: true });
    document.addEventListener('keydown', disablePrint, { capture: true });
    document.addEventListener('selectstart', disableTextSelection, { capture: true });
    document.addEventListener('dragstart', disableDragAndDrop, { capture: true });

    // Disable multi-click selection
    const disableMultiClickSelection = (e: MouseEvent) => {
      if (isFormElement(e.target)) return;
      if (e.detail > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('mousedown', disableMultiClickSelection, { capture: true });

    // Clear selection periodically
    const clearSelection = setInterval(() => {
      const activeElement = document.activeElement;
      if (isFormElement(activeElement)) return;
      if (window.getSelection && document.activeElement === document.body) {
        window.getSelection()?.removeAllRanges();
      }
    }, 1000);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', disableKeyboardShortcuts, { capture: true } as EventListenerOptions);
      document.removeEventListener('keydown', disablePrint, { capture: true } as EventListenerOptions);
      document.removeEventListener('selectstart', disableTextSelection, { capture: true } as EventListenerOptions);
      document.removeEventListener('dragstart', disableDragAndDrop, { capture: true } as EventListenerOptions);
      document.removeEventListener('mousedown', disableMultiClickSelection, { capture: true } as EventListenerOptions);
      clearInterval(clearSelection);
    };
  }, []);

  return null;
};

export default CopyProtection;
