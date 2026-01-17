import type { ReactNode } from "react";
import Slider, { type Settings } from "react-slick";
import { PanelGrid } from "./PanelGrid";
import SwipeablePanelContainer from "./SwipeablePanelContainer";

type ContentBrowserFrameProps = {
  layout: "two-panel" | "three-panel";
  panels: ReactNode[];
  onWheel: (e: React.WheelEvent) => void;
  sliderRef: React.RefObject<Slider>;
  sliderSettings: Settings;
  isCompact: boolean;
};

export default function ContentBrowserFrame({
  layout,
  panels,
  onWheel,
  sliderRef,
  sliderSettings,
  isCompact,
}: ContentBrowserFrameProps) {
  return (
    <SwipeablePanelContainer onWheel={onWheel}>
      {isCompact ? (
        <div className="relative character-slider">
          <Slider key="content-slider" ref={sliderRef} {...sliderSettings}>
            {panels.map((panel, index) => (
              <div key={index} className="px-2">
                {panel}
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <PanelGrid layout={layout} panels={panels} />
      )}
    </SwipeablePanelContainer>
  );
}
