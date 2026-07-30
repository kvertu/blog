export type UserRole = "ADMIN" | "USER";

export interface Telefone {
  ddd: number | null;
  numero: number | null;
}

export interface Usuario {
  id: number;
  nome: string;
  role: UserRole;
  email: string;
  celular: Telefone | null;
}

export interface Pagina {
  texto: string;
  imagemCaminho: string | null;
}

export interface Comentario {
  id: number;
  autor: Usuario;
  texto: string;
  dataCriacao: string;
}

export interface Postagem {
  id: number;
  autor: Usuario;
  titulo: string;
  subtitulo: string;
  conteudo: Pagina;
  comentarios: Comentario[];
}

export interface Blog {
  id: number;
  nome: string;
  autores: Usuario[];
  dataCriacao: string;
  postagens: Postagem[];
}

export interface LoginPayload {
  login: string;
  senha: string;
}

export interface RegisterPayload {
  nome: string;
  email: string;
  celular: Telefone;
  login: string;
  senha: string;
  role: UserRole;
}
