function StatusBadge({ label }: { label: string; color: "cyan" }) {
  return (
    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 text-cyan-300 px-4 py-1.5 rounded-full uppercase text-xs tracking-wider">
      {label}
    </div>
  );
}
export default StatusBadge;
