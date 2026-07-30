import { type FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { listBlogs } from "../api/blogs";
import { createPostagem } from "../api/postagens";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import { Alert } from "../components/Alert";
import { Spinner } from "../components/Spinner";

export function NewPostagem() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedBlogId = searchParams.get("blogId") ?? "";

  const blogs = useFetch(listBlogs);

  const [blogId, setBlogId] = useState(preselectedBlogId);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [imagemCaminho, setImagemCaminho] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user || !blogId) return;

    setSubmitting(true);
    setError(null);
    try {
      const postagem = await createPostagem({
        autor: { id: user.id },
        titulo,
        subtitulo,
        conteudo: { texto, imagemCaminho: imagemCaminho.trim() || null },
        blog: { id: Number(blogId) },
      });
      navigate(`/postagens/${postagem.id}`);
    } catch {
      setError("Não foi possível publicar a postagem.");
      setSubmitting(false);
    }
  }

  if (blogs.isLoading) return <Spinner label="Carregando blogs..." />;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Nova postagem</h1>
      <p className="mt-1 text-sm text-slate-500">Compartilhe algo novo com a comunidade.</p>

      {blogs.data?.length === 0 ? (
        <div className="mt-6">
          <Alert variant="info">
            Você precisa criar um blog antes de publicar uma postagem.
          </Alert>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Blog</label>
            <select
              required
              value={blogId}
              onChange={(e) => setBlogId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            >
              <option value="" disabled>
                Selecione um blog
              </option>
              {blogs.data?.map((blog) => (
                <option key={blog.id} value={blog.id}>
                  {blog.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Título</label>
            <input
              required
              autoFocus
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Subtítulo</label>
            <input
              value={subtitulo}
              onChange={(e) => setSubtitulo(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Imagem de capa (URL, opcional)
            </label>
            <input
              value={imagemCaminho}
              onChange={(e) => setImagemCaminho(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Conteúdo</label>
            <textarea
              required
              rows={10}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {error && <Alert variant="error">{error}</Alert>}

          <button
            type="submit"
            disabled={submitting || !blogId || !titulo.trim() || !texto.trim()}
            className="mt-2 self-start rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-700 disabled:opacity-50"
          >
            {submitting ? "Publicando..." : "Publicar"}
          </button>
        </form>
      )}
    </div>
  );
}
