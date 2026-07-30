import { api } from "./client";
import type { Postagem } from "../types";

export async function listPostagens() {
  const { data } = await api.get<Postagem[]>("/postagem/");
  return data;
}

export async function getPostagem(id: number | string) {
  const { data } = await api.get<Postagem>(`/postagem/${id}`);
  return data;
}

export interface CreatePostagemPayload {
  autor: { id: number };
  titulo: string;
  subtitulo: string;
  conteudo: { texto: string; imagemCaminho: string | null };
  blog: { id: number };
}

export async function createPostagem(payload: CreatePostagemPayload) {
  const { data } = await api.post<Postagem>("/postagem/", payload);
  return data;
}

export async function deletePostagem(id: number) {
  await api.delete(`/postagem/${id}`);
}
