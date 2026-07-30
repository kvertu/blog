export function Spinner({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-slate-400">
      <span className="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
