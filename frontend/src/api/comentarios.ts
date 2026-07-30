import { api } from "./client";
import type { Comentario } from "../types";

export interface CreateComentarioPayload {
  autor: { id: number };
  texto: string;
  dataCriacao: string;
  postagem: { id: number };
}

export async function createComentario(payload: CreateComentarioPayload) {
  const { data } = await api.post<Comentario>("/comentario/", payload);
  return data;
}

export async function deleteComentario(id: number) {
  await api.delete(`/comentario/${id}`);
}
