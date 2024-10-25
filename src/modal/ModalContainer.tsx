import { useEffect, useState } from "react";
import { useSpring, animated, config, easings } from "@react-spring/web";
import { useSyncExternalStore } from "react";
import { modalsStore, ModalState } from "./store";

export const ModalContainer = () => {
  const currentModal = useSyncExternalStore(
    modalsStore.subscribe,
    modalsStore.getSnapshot
  );
  const [isVisible, setIsVisible] = useState(false);
  const [lastState, setLastState] = useState<ModalState | null>(null);

  const [modalSpring, modalApi] = useSpring(() => ({
    from: { transform: "translateY(-100%)" },
    config: { ...config.gentle },
  }));

  const [containerSpring, containerApi] = useSpring(
    () => ({
      from: { opacity: 0 },
      config: { ...config.gentle, duration: 200 },
      onRest: () => {
        if (!currentModal) {
          setIsVisible(false);
        }
      },
    }),
    [currentModal]
  );

  useEffect(() => {
    if (currentModal) {
      setIsVisible(true);
      setLastState(currentModal);
      modalApi.start({
        from: { transform: "translateY(-100%)" },
        to: { transform: "translateY(0%)" },
        config: { tension: 280, friction: 20 },
      });
      containerApi.start({
        opacity: 1,
      });
    } else {
      modalApi.start({
        to: { transform: "translateY(-100%) scale(80%)" },
      });
      containerApi.start({
        opacity: 0,
        config: {
          duration: 200,
          easing: easings.easeInCubic,
        },
      });
    }
  }, [currentModal, modalApi, containerApi]);

  if (!isVisible) return null;

  return (
    <animated.div
      className="pop-modal-container"
      style={{
        ...containerSpring,
      }}
    >
      <div
        className="pop-modal-overlay"
        onClick={() => modalsStore.hideModal()}
      />
      <animated.div
        className={"center-box"}
        style={{
          ...modalSpring,
        }}
      >
        {lastState?.modal}
      </animated.div>
    </animated.div>
  );
};

export default ModalContainer;
