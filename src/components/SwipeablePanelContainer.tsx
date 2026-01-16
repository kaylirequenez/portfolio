import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onWheel?: (e: React.WheelEvent) => void;
  enabled?: boolean;
};

export default function SwipeablePanelContainer({
  children,
  onWheel,
  enabled = true,
}: Props) {
  return (
    <div
      className="
        h-full
        max-h-full
        overflow-y-auto
        overscroll-x-contain
        touch-pan-y
      "
      onWheel={enabled ? onWheel : undefined}
    >
      {children}
    </div>
  );
}
