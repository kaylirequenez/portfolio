import type { MainDataInfo } from "../../../types/profile.types";
import DataCard from "./DataCard";

interface DataIndexProps {
  header: string;
  cards: MainDataInfo[];
  onSelectData: (id: string) => void;
  selectedData: string | null;
}

export default function DataIndex({
  header,
  cards,
  onSelectData,
  selectedData,
}: DataIndexProps) {
  return (
    <div className="space-y-3 px-2">
      <div className="text-xs uppercase font-mono text-cyan-400/50 tracking-wider">
        {header}
      </div>
      <div className="flex flex-col gap-3">
        {cards.map((card) => (
          <DataCard
            {...card}
            onClick={() => onSelectData(card.id)}
            isSelected={selectedData === card.id}
          />
        ))}
      </div>
    </div>
  );
}
