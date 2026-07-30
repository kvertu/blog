import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api/blogs";
import { useAuth } from "../context/AuthContext";
import { Alert } from "../components/Alert";

export function NewBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setError(null);
    try {
      const blog = await createBlog({
        nome,
        autores: [{ id: user.id }],
        dataCriacao: new Date().toISOString().slice(0, 10),
      });
      navigate(`/blogs/${blog.id}`);
    } catch {
      setError("Não foi possível criar o blog.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Novo blog</h1>
      <p className="mt-1 text-sm text-slate-500">
        Você será cadastrado automaticamente como autor.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nome do blog</label>
          <input
            required
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Notas de Engenharia de Software"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        {error && <Alert variant="error">{error}</Alert>}

        <button
          type="submit"
          disabled={submitting || !nome.trim()}
          className="mt-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-700 disabled:opacity-50"
        >
          {submitting ? "Criando..." : "Criar blog"}
        </button>
      </form>
    </div>
  );
}
