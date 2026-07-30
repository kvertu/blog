import { Link } from "react-router-dom";
import { listBlogs } from "../api/blogs";
import { useFetch } from "../hooks/useFetch";
import { BlogCard } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";
import { Alert } from "../components/Alert";
import { useAuth } from "../context/AuthContext";

export function Blogs() {
  const { isAuthenticated } = useAuth();
  const blogs = useFetch(listBlogs);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Blogs</h1>
          <p className="mt-1 text-slate-500">Todos os blogs publicados pela comunidade.</p>
        </div>
        {isAuthenticated && (
          <Link
            to="/blogs/novo"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-700"
          >
            + Novo blog
          </Link>
        )}
      </div>

      {blogs.isLoading && <Spinner label="Carregando blogs..." />}
      {blogs.error && <Alert variant="error">{blogs.error}</Alert>}
      {!blogs.isLoading && blogs.data?.length === 0 && (
        <Alert variant="info">Nenhum blog cadastrado ainda. Que tal criar o primeiro?</Alert>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.data?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
