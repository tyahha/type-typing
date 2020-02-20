import { useState, useCallback } from "react";

export const useMiss = () => {
  const [misses, setMisses] = useState(new Map<string, number>());
  const resetMisses = useCallback(() => setMisses(new Map()), [setMisses]);
  const addMiss = useCallback(
    (input: string): void => {
      const count = misses.get(input) ?? 0;
      setMisses(new Map([...misses, [input, count + 1]]));
    },
    [misses, setMisses]
  );

  return {
    misses,
    resetMisses,
    addMiss
  };
};
