import { useState } from "react";

function detectTouch() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function detectFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function useInputCapabilities() {
  const [hasTouch] = useState(detectTouch);
  const [hasFinePointer] = useState(detectFinePointer);

  return {
    hasTouch, // finger input available
    hasFinePointer, // mouse / trackpad
  };
}
