import { useState, useCallback } from "react";

export type MissObserver = () => void;

export const useMissObservable = () => {
  const [observers, setObservers] = useState<MissObserver[]>([]);

  const publishMiss = useCallback(() => {
    observers.forEach(o => o());
  }, [observers]);
  const addMissObserver = useCallback(
    (observer: MissObserver) => {
      setObservers([...observers, observer]);
    },
    [observers]
  );
  const removeMissObserver = useCallback(
    (observer: MissObserver) => {
      setObservers(observers.filter(o => o !== observer));
    },
    [observers]
  );
  return {
    missObservers: observers,
    publishMiss,
    addMissObserver,
    removeMissObserver
  };
};
