import { Link } from "react-router-dom";
import type { Postagem } from "../types";
import { excerpt, initials } from "../utils/format";

export function PostCard({ postagem }: { postagem: Postagem }) {
  return (
    <Link
      to={`/postagens/${postagem.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/10"
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-700 transition-transform group-hover:scale-x-100" />
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">
        {postagem.titulo}
      </h3>
      {postagem.subtitulo && (
        <p className="mt-1 text-sm font-medium text-brand-600">{postagem.subtitulo}</p>
      )}
      <p className="prose-content mt-3 text-sm text-slate-500">
        {excerpt(postagem.conteudo?.texto)}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">
            {initials(postagem.autor?.nome)}
          </span>
          <span>{postagem.autor?.nome ?? "Autor desconhecido"}</span>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
          {postagem.comentarios?.length ?? 0} comentários
        </span>
      </div>
    </Link>
  );
}
