import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "../components/Alert";

const initialForm = {
  nome: "",
  email: "",
  ddd: "",
  numero: "",
  login: "",
  senha: "",
  confirmarSenha: "",
};

export function Register() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.senha !== form.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setSubmitting(true);
    try {
      await register({
        nome: form.nome,
        email: form.email,
        celular: {
          ddd: form.ddd ? Number(form.ddd) : null,
          numero: form.numero ? Number(form.numero) : null,
        },
        login: form.login,
        senha: form.senha,
        role: "USER",
      });
      await login({ login: form.login, senha: form.senha });
      navigate("/");
    } catch {
      setError("Não foi possível criar a conta. O login pode já estar em uso.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg animate-fade-in rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Criar conta</h1>
        <p className="mt-1 text-sm text-slate-500">
          Cadastre-se para publicar blogs e comentar postagens.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Nome</label>
            <input
              required
              value={form.nome}
              onChange={(e) => update("nome", e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">E-mail</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">DDD</label>
            <input
              value={form.ddd}
              onChange={(e) => update("ddd", e.target.value.replace(/\D/g, ""))}
              placeholder="11"
              maxLength={2}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Celular</label>
            <input
              value={form.numero}
              onChange={(e) => update("numero", e.target.value.replace(/\D/g, ""))}
              placeholder="999999999"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Login</label>
            <input
              required
              value={form.login}
              onChange={(e) => update("login", e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Senha</label>
            <input
              required
              type="password"
              value={form.senha}
              onChange={(e) => update("senha", e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Confirmar senha
            </label>
            <input
              required
              type="password"
              value={form.confirmarSenha}
              onChange={(e) => update("confirmarSenha", e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {error && (
            <div className="col-span-2">
              <Alert variant="error">{error}</Alert>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="col-span-2 mt-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-700 disabled:opacity-50"
          >
            {submitting ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Já tem conta?{" "}
          <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
