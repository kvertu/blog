import { Link } from "react-router-dom";
import type { Blog } from "../types";
import { formatDate } from "../utils/format";

export function BlogCard({ blog }: { blog: Blog }) {
  const autores = blog.autores?.map((a) => a.nome).join(", ") || "Sem autores";
  const totalPostagens = blog.postagens?.length ?? 0;

  return (
    <Link
      to={`/blogs/${blog.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/10"
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-700 transition-transform group-hover:scale-x-100" />
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">
        {blog.nome}
      </h3>
      <p className="mt-1 text-sm text-slate-500">por {autores}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
          {totalPostagens} {totalPostagens === 1 ? "postagem" : "postagens"}
        </span>
        {blog.dataCriacao && <span>desde {formatDate(blog.dataCriacao)}</span>}
      </div>
    </Link>
  );
}
