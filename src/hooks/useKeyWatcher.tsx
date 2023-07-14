import { useEffect, useState } from "react";

export const useKeyWatcher = () => {
  const [key, setKey] = useState("");

  const keyDown = (e: KeyboardEvent) => {
    setKey(e.key);
  };

  const keyUp = () => {
    setKey("");
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => keyDown(e));
    window.addEventListener("keyup", () => keyUp());
    return () => {
      window.removeEventListener("keydown", (e) => keyDown(e));
      window.removeEventListener("keyup", () => keyUp());
    };
  }, []);

  return key;
};
