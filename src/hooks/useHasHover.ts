import { useEffect, useState } from "react";

export default function useHasHover() {
  const [hasHover, setHasHover] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const listener = () => setHasHover(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return hasHover;
}
