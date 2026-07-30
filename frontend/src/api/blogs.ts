import { api } from "./client";
import type { Blog } from "../types";

export async function listBlogs() {
  const { data } = await api.get<Blog[]>("/blog/");
  return data;
}

export async function getBlog(id: number | string) {
  const { data } = await api.get<Blog>(`/blog/${id}`);
  return data;
}

export interface CreateBlogPayload {
  nome: string;
  autores: { id: number }[];
  dataCriacao: string;
}

export async function createBlog(payload: CreateBlogPayload) {
  const { data } = await api.post<Blog>("/blog/", payload);
  return data;
}

export async function deleteBlog(id: number) {
  await api.delete(`/blog/${id}`);
}
