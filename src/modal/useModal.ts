
import React from "react";
import { modalsStore } from "./store";

type ModalProps<T = any, P = {}> = P & {
  close: (data?: T) => void;
};

export const useModal = () => {
  return {
    show: <T, P extends {}>(
      ModalComponent: React.ComponentType<ModalProps<T, P | undefined>>,
      props?: P
    ) => {
      if (!ModalComponent) {
        throw new Error("No modal component provided");
      }

      const close = (data?: T) => {
        modalsStore.hideModal(data);
      };

      const ModalElement = React.createElement(
        ModalComponent,
        props ? { ...props, close } : { close, ...{} as P }
      );

      modalsStore.setCurrentModal(ModalElement);

      return {
        result: (): Promise<T | undefined> => new Promise((resolve) => {
          modalsStore.setCurrentModal(ModalElement, resolve);
        }),
        hide: () => {
          modalsStore.hideModal();
        }
      }
    },
  };
};