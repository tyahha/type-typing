import { useState } from "react";

export type MissObserver = () => void;

export const useMissObservable = () => {
  const [observers, setObservers] = useState<MissObserver[]>([]);

  return {
    missObservers: observers,
    publishMiss() {
      observers.forEach(o => o());
    },
    addMissObserver(observer: MissObserver) {
      setObservers([...observers, observer]);
    },
    removeMissObserver(observer: MissObserver) {
      setObservers(observers.filter(o => o !== observer));
    }
  };
};
