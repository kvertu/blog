import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getBlog } from "../api/blogs";
import { useFetch } from "../hooks/useFetch";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import { PostCard } from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/format";

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const blog = useFetch(() => getBlog(id!), [id]);

  const isAutor = Boolean(
    user && blog.data?.autores?.some((autor) => autor.id === user.id),
  );

  async function handleDelete() {
    if (!blog.data) return;
    if (!confirm(`Excluir o blog "${blog.data.nome}"? Essa ação não pode ser desfeita.`)) return;

    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteBlog(blog.data.id);
      navigate("/blogs");
    } catch {
      setDeleteError("Não foi possível excluir o blog.");
      setDeleting(false);
    }
  }

  if (blog.isLoading) return <Spinner label="Carregando blog..." />;
  if (blog.error || !blog.data) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <Alert variant="error">{blog.error ?? "Blog não encontrado."}</Alert>
      </div>
    );
  }

  const { data: b } = blog;
  const autores = b.autores?.map((a) => a.nome).join(", ") || "Sem autores";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Link to="/blogs" className="text-sm font-medium text-brand-600 hover:text-brand-700">
        ← voltar para blogs
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{b.nome}</h1>
          <p className="mt-2 text-slate-500">
            por {autores} {b.dataCriacao && <>· desde {formatDate(b.dataCriacao)}</>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {user && (
            <Link
              to={`/postagens/nova?blogId=${b.id}`}
              className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-700"
            >
              + Nova postagem
            </Link>
          )}
          {isAutor && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              Excluir blog
            </button>
          )}
        </div>
      </div>

      {deleteError && (
        <div className="mt-4">
          <Alert variant="error">{deleteError}</Alert>
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {b.postagens?.length ? (
          b.postagens
            .slice()
            .reverse()
            .map((postagem) => <PostCard key={postagem.id} postagem={postagem} />)
        ) : (
          <p className="col-span-full text-slate-400">Este blog ainda não tem postagens.</p>
        )}
      </div>
    </div>
  );
}
