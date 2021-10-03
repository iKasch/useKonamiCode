import { useCallback, useEffect, useState } from "react";

export const useKonamiCode = (timeout: number = 2000) => {
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);

  const listenForKeypress = useCallback(
    (event: KeyboardEvent) => {
      const keyStrokes = [...keys, event.key];
      setKeys(keyStrokes);
    },
    [keys]
  );

  // start timer and check code
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    const checkCode = setTimeout(() => {
      if (JSON.stringify(keys) === JSON.stringify(konamiCode)) {
        setCodeSuccess(true);
        setKeys([]);
      }
      if (keys !== konamiCode && keys.length !== 0) {
        setKeys([]);
      }
    }, timeout);

    return () => {
      clearTimeout(checkCode);
    };
  }, [keys, timeout]);

  useEffect(() => {
    window.addEventListener("keydown", listenForKeypress);
    return () => {
      window.removeEventListener("keydown", listenForKeypress);
    };
  }, [listenForKeypress]);

  return codeSuccess;
};
