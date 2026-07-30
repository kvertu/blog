import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand-100 text-brand-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white shadow-sm shadow-brand-500/30">
            B
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Blog<span className="text-brand-600">UNESP</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" end className={navLinkClasses}>
            Início
          </NavLink>
          <NavLink to="/blogs" className={navLinkClasses}>
            Blogs
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/blogs/novo" className={navLinkClasses}>
              Novo blog
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
              >
                <span className="grid size-7 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {user?.nome?.charAt(0).toUpperCase() ?? "?"}
                </span>
                {user?.nome}
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 animate-fade-in overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <Link
                    to="/blogs/novo"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 sm:hidden"
                  >
                    Novo blog
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Entrar
              </Link>
              <Link
                to="/registro"
                className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-700"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
