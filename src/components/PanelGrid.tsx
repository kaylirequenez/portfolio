import type { ReactNode } from "react";

type PanelGridProps = {
  layout: "two-panel" | "three-panel";
  panels: ReactNode[];
  className?: string;
  twoPanelSpans?: [number, number];
};

export function PanelGrid({
  layout,
  panels,
  className = "",
  twoPanelSpans = [6, 6],
}: PanelGridProps) {
  if (layout === "two-panel") {
    const [left, right] = panels;
    const [leftSpan, rightSpan] = twoPanelSpans;
    const spanClass = (span: number) =>
      ((
        {
          4: "col-span-4",
          6: "col-span-6",
          8: "col-span-8",
        } as const
      )[span] ?? "col-span-6");

    return (
      <div className={`grid grid-cols-12 gap-4 p-4 h-full ${className}`}>
        <div className={`${spanClass(leftSpan)} min-h-0`}>{left}</div>
        <div className={`${spanClass(rightSpan)} min-h-0`}>{right}</div>
      </div>
    );
  }

  // three-panel
  const [left, center, right] = panels;

  return (
    <div className={`grid grid-cols-12 gap-4 p-4 h-full ${className}`}>
      <div className="col-span-4 min-h-0">{left}</div>
      <div className="col-span-4 min-h-0">{center}</div>
      <div className="col-span-4 min-h-0">{right}</div>
    </div>
  );
}
