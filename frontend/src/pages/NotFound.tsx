import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <span className="text-6xl font-extrabold text-brand-200">404</span>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Página não encontrada</h1>
      <p className="mt-2 text-slate-500">O conteúdo que você procura não existe ou foi removido.</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-700"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
