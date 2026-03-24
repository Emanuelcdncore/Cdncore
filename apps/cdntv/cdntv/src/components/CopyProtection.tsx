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
      // Desabilitar Ctrl+A (selecionar tudo)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return false;
      }
      // Desabilitar Ctrl+C (copiar)
      if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      // Desabilitar Ctrl+V (colar)
      if (e.ctrlKey && e.keyCode === 86) {
        e.preventDefault();
        return false;
      }
      // Desabilitar Ctrl+X (cortar)
      if (e.ctrlKey && e.keyCode === 88) {
        e.preventDefault();
        return false;
      }
      // Desabilitar Ctrl+S (salvar)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
      // Desabilitar Ctrl+U (view source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      // Desabilitar Ctrl+Shift+I (dev tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      // Desabilitar Ctrl+Shift+C (inspect element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      // Desabilitar F12 (dev tools)
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Desabilitar Ctrl+Shift+J (console)
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
      // Desabilitar Ctrl+P (imprimir)
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

    // Adicionar event listeners
    document.addEventListener('keydown', disableKeyboardShortcuts, { capture: true });
    document.addEventListener('keydown', disablePrint, { capture: true });
    document.addEventListener('selectstart', disableTextSelection, { capture: true });
    document.addEventListener('dragstart', disableDragAndDrop, { capture: true });
    
    // Desabilitar seleção com mouse
    const disableMultiClickSelection = (e: MouseEvent) => {
      if (isFormElement(e.target)) return;
      if (e.detail > 1) { // Duplo/triplo clique
        e.preventDefault();
      }
    };
    document.addEventListener('mousedown', disableMultiClickSelection, { capture: true });

    // Limpar seleção periodicamente
    const clearSelection = setInterval(() => {
      const activeElement = document.activeElement;
      if (isFormElement(activeElement)) return;
      if (window.getSelection && document.activeElement === document.body) {
        window.getSelection()?.removeAllRanges();
      }
    }, 1000);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', disableKeyboardShortcuts, { capture: true } as any);
      document.removeEventListener('keydown', disablePrint, { capture: true } as any);
      document.removeEventListener('selectstart', disableTextSelection, { capture: true } as any);
      document.removeEventListener('dragstart', disableDragAndDrop, { capture: true } as any);
      document.removeEventListener('mousedown', disableMultiClickSelection, { capture: true } as any);
      clearInterval(clearSelection);
    };
  }, []);

  return null;
};

export default CopyProtection;