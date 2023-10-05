import { useEffect, useState } from "react";

import { detectIfMac } from "..";

function useKeyPress(callback: () => void): boolean {
  const [keyPressed, setKeyPressed] = useState(false);
  useEffect(() => {
    const downHandler = ({ code, metaKey, ctrlKey }: KeyboardEvent) => {
      if (
        (code === "KeyK" && metaKey && detectIfMac()) ||
        (code === "KeyK" && ctrlKey && !detectIfMac())
      ) {
        setKeyPressed(true);
        callback();
      }
    };
    const upHandler = ({ code, metaKey, ctrlKey }: KeyboardEvent) => {
      if ((code === "KeyK" && metaKey) || (code === "KeyK" && ctrlKey)) {
        setKeyPressed(false);
      }
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [callback]);

  return keyPressed;
}

export { useKeyPress };
