import { useEffect, useState } from "react";

export default function useIsCompactLayout(breakpoint = 1024) {
  const [isCompactLayout, setisCompactLayout] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setisCompactLayout(window.innerWidth < breakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isCompactLayout;
}
