import { useEffect, useMemo, useState } from "react";
import { useSyncExternalStore } from "react";
import { modalsStore, ModalState } from "./store";


export const ModalContainer = ({ containerClass, overlayClass, animation = { duration: 200 } }:
  { containerClass?: string, overlayClass?: string, animation?: { duration: number } }) => {
  const currentModal = useSyncExternalStore(
    modalsStore.subscribe,
    modalsStore.getSnapshot
  );
  const [isVisible, setIsVisible] = useState(false);
  const [animState, setAnimState] = useState<string>('');
  const [lastState, setLastState] = useState<ModalState | null>(null);

  useEffect(() => {
    if (currentModal) {
      setLastState(currentModal);
      setIsVisible(true);
      setTimeout(() => {
        setAnimState('enter');
      }, 100);

    } else {
      setAnimState('exit');
      setTimeout(() => {
        setIsVisible(false);
      }, animation?.duration);
    }
  }, [currentModal]);

  const transitionDuration = useMemo(() => {
    if (!animation?.duration) return {};
    return { transitionDuration: `${animation.duration}ms` }
  }, [animation?.duration])

  return (
    <div
      className={`pop-modal-container ${containerClass} ${animState === 'enter' ? 'show' : ''} ${!isVisible ? 'd-none' : ''}`}
      style={transitionDuration}
    >
      <div
        className={`pop-modal-overlay ${overlayClass}`}
        style={transitionDuration}
        onClick={() => modalsStore.hideModal()}
      />
      <div className={"center-box"}>
        {lastState?.modal}
      </div>
    </div>
  );
};

export default ModalContainer;
