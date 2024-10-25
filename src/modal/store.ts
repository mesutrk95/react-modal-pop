import { ReactNode } from "react";

export type ModalState = {
  modal: ReactNode;
  resolve?: (data?: any) => void;
};

let currentState: ModalState | null = null;
let listeners: (() => void)[] = [];

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export const modalsStore = {
  setCurrentModal(component: ReactNode, resolve?: (data?: any) => void) {
    currentState = component ? { modal: component, resolve } : null;
    emitChange();
  },
  hideModal(data?: any) {
    currentState?.resolve?.(data);
    currentState = null;
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return currentState;
  },
};
