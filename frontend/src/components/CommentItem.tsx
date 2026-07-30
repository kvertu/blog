import type { Comentario } from "../types";
import { formatDateTime, initials } from "../utils/format";

export function CommentItem({ comentario }: { comentario: Comentario }) {
  return (
    <div className="flex gap-3 border-b border-slate-100 py-4 last:border-none">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
        {initials(comentario.autor?.nome)}
      </span>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">
            {comentario.autor?.nome ?? "Usuário"}
          </span>
          <span className="text-xs text-slate-400">{formatDateTime(comentario.dataCriacao)}</span>
        </div>
        <p className="mt-1 text-sm text-slate-600">{comentario.texto}</p>
      </div>
    </div>
  );
}
