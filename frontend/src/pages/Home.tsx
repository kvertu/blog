import { Link } from "react-router-dom";
import { listPostagens } from "../api/postagens";
import { listBlogs } from "../api/blogs";
import { useFetch } from "../hooks/useFetch";
import { PostCard } from "../components/PostCard";
import { BlogCard } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { isAuthenticated } = useAuth();
  const postagens = useFetch(listPostagens);
  const blogs = useFetch(listBlogs);

  const recentPostagens = postagens.data?.slice().reverse().slice(0, 6) ?? [];
  const recentBlogs = blogs.data?.slice().reverse().slice(0, 3) ?? [];

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden border-b border-slate-200/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-100 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Comunidade de blogs
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Ideias, histórias e conhecimento
            <br className="hidden sm:block" /> em um só lugar
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
            Explore blogs e postagens da comunidade, comente e, se quiser,
            crie o seu próprio espaço para publicar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/blogs"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition hover:bg-brand-700"
            >
              Explorar blogs
            </Link>
            {!isAuthenticated && (
              <Link
                to="/registro"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                Criar minha conta
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Postagens recentes</h2>
          <Link to="/blogs" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            ver blogs →
          </Link>
        </div>

        {postagens.isLoading && <Spinner label="Carregando postagens..." />}
        {postagens.error && <Alert variant="error">{postagens.error}</Alert>}
        {!postagens.isLoading && recentPostagens.length === 0 && !postagens.error && (
          <Alert variant="info">Nenhuma postagem publicada ainda.</Alert>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentPostagens.map((postagem) => (
            <PostCard key={postagem.id} postagem={postagem} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Blogs em destaque</h2>
          <Link to="/blogs" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            ver todos →
          </Link>
        </div>

        {blogs.isLoading && <Spinner label="Carregando blogs..." />}
        {blogs.error && <Alert variant="error">{blogs.error}</Alert>}
        {!blogs.isLoading && recentBlogs.length === 0 && !blogs.error && (
          <Alert variant="info">Nenhum blog cadastrado ainda.</Alert>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
