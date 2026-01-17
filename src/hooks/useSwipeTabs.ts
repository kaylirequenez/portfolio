import { useEffect, useRef, useState } from "react";
import type Slider from "react-slick";

type UseSwipeTabsProps = {
  initialTab: number;
  tabCount: number;
  enableTouch: boolean; // Enable touch/finger dragging (based on device capability)
};

export function useSwipeTabs({
  initialTab,
  tabCount,
  enableTouch,
}: UseSwipeTabsProps) {
  const sliderRef = useRef<Slider>(null as unknown as Slider);

  // React state mirrors Slick (never drives it)
  const [activeTab, setActiveTab] = useState(initialTab);

  // Internal refs (non-reactive)
  const activeTabRef = useRef(initialTab);
  const isSlidingRef = useRef(false);
  const slideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync slider when initialTab changes (e.g., re-entering view)
  useEffect(() => {
    if (sliderRef.current) {
      isSlidingRef.current = false; // Reset sliding state
      activeTabRef.current = initialTab;
      sliderRef.current.slickGoTo(initialTab);
      // Note: setActiveTab will be called by beforeChange callback
    }
  }, [initialTab]);

  /* --------------------------------------------------
     Trackpad / mouse horizontal swipe (wheel-based)
     Works on all devices with precision pointers
  -------------------------------------------------- */
  const onWheel = (e: React.WheelEvent) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    // Require strong horizontal intent
    if (absX <= absY || absX < 10) return;

    e.preventDefault();

    if (isSlidingRef.current) return;

    if (e.deltaX > 0 && activeTabRef.current < tabCount - 1) {
      isSlidingRef.current = true;
      sliderRef.current?.slickNext();

      // Safety timeout in case afterChange doesn't fire
      if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
      slideTimeoutRef.current = setTimeout(() => {
        isSlidingRef.current = false;
      }, 600);
    } else if (e.deltaX < 0 && activeTabRef.current > 0) {
      isSlidingRef.current = true;
      sliderRef.current?.slickPrev();

      // Safety timeout in case afterChange doesn't fire
      if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
      slideTimeoutRef.current = setTimeout(() => {
        isSlidingRef.current = false;
      }, 600);
    }
  };

  /* --------------------------------------------------
     Slick settings (Slick is the single writer)
  -------------------------------------------------- */
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    swipe: true, // Always enable for Slick internals
    touchMove: enableTouch, // Enable finger/touch dragging
    touchThreshold: 10,

    adaptiveHeight: false,
    initialSlide: initialTab,

    beforeChange: (_: number, next: number) => {
      activeTabRef.current = next;
      setActiveTab(next);
    },

    afterChange: () => {
      if (slideTimeoutRef.current) {
        clearTimeout(slideTimeoutRef.current);
        slideTimeoutRef.current = null;
      }
      isSlidingRef.current = false;
    },
  };

  /* --------------------------------------------------
     Programmatic navigation (buttons, tabs)
     NEVER set state here
  -------------------------------------------------- */
  const goToTab = (index: number) => {
    isSlidingRef.current = false; // Reset before programmatic navigation
    sliderRef.current?.slickGoTo(index);
  };

  return {
    sliderRef,
    sliderSettings,
    activeTab,
    goToTab,
    onWheel,
  };
}
