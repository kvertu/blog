import { type FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostagem, deletePostagem } from "../api/postagens";
import { createComentario } from "../api/comentarios";
import { useFetch } from "../hooks/useFetch";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import { CommentItem } from "../components/CommentItem";
import { useAuth } from "../context/AuthContext";
import { initials } from "../utils/format";
import type { Comentario } from "../types";

export function PostagemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const postagem = useFetch(() => getPostagem(id!), [id]);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [texto, setTexto] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const allComentarios = comentarios.length
    ? comentarios
    : postagem.data?.comentarios ?? [];

  async function handleSubmitComment(e: FormEvent) {
    e.preventDefault();
    if (!postagem.data || !user || !texto.trim()) return;

    setSubmitting(true);
    setCommentError(null);
    try {
      const created = await createComentario({
        autor: { id: user.id },
        texto: texto.trim(),
        dataCriacao: new Date().toISOString(),
        postagem: { id: postagem.data.id },
      });
      setComentarios([...allComentarios, created]);
      setTexto("");
    } catch {
      setCommentError("Não foi possível publicar seu comentário.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeletePost() {
    if (!postagem.data) return;
    if (!confirm(`Excluir a postagem "${postagem.data.titulo}"?`)) return;

    setDeleting(true);
    try {
      await deletePostagem(postagem.data.id);
      navigate("/blogs");
    } catch {
      setDeleting(false);
    }
  }

  if (postagem.isLoading) return <Spinner label="Carregando postagem..." />;
  if (postagem.error || !postagem.data) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <Alert variant="error">{postagem.error ?? "Postagem não encontrada."}</Alert>
      </div>
    );
  }

  const p = postagem.data;
  const isAutor = user?.id === p.autor?.id;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <Link to="/blogs" className="text-sm font-medium text-brand-600 hover:text-brand-700">
        ← voltar
      </Link>

      <article className="mt-4 animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              {p.titulo}
            </h1>
            {p.subtitulo && (
              <p className="mt-2 text-lg font-medium text-brand-600">{p.subtitulo}</p>
            )}
          </div>
          {isAutor && (
            <button
              onClick={handleDeletePost}
              disabled={deleting}
              className="shrink-0 rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              Excluir
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <span className="grid size-7 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
            {initials(p.autor?.nome)}
          </span>
          {p.autor?.nome ?? "Autor desconhecido"}
        </div>

        {p.conteudo?.imagemCaminho && (
          <img
            src={p.conteudo.imagemCaminho}
            alt={p.titulo}
            className="mt-6 max-h-[420px] w-full rounded-2xl object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        <div className="prose-content mt-6 whitespace-pre-wrap text-slate-700">
          {p.conteudo?.texto}
        </div>
      </article>

      <section className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-xl font-bold text-slate-900">
          Comentários ({allComentarios.length})
        </h2>

        {user ? (
          <form onSubmit={handleSubmitComment} className="mt-4 flex flex-col gap-2">
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escreva um comentário..."
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            {commentError && <Alert variant="error">{commentError}</Alert>}
            <button
              type="submit"
              disabled={submitting || !texto.trim()}
              className="self-end rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-700 disabled:opacity-50"
            >
              {submitting ? "Publicando..." : "Comentar"}
            </button>
          </form>
        ) : (
          <p className="mt-4 text-sm text-slate-400">
            <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">
              Entre
            </Link>{" "}
            para deixar um comentário.
          </p>
        )}

        <div className="mt-6">
          {allComentarios.length === 0 ? (
            <p className="text-sm text-slate-400">Seja o primeiro a comentar.</p>
          ) : (
            allComentarios.map((c) => <CommentItem key={c.id} comentario={c} />)
          )}
        </div>
      </section>
    </div>
  );
}
