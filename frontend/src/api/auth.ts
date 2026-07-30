import { api } from "./client";
import type { LoginPayload, RegisterPayload, Usuario } from "../types";

export async function login(payload: LoginPayload) {
  const { data } = await api.post<{ token: string }>("/auth/login", payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  await api.post("/auth/register", payload);
}

export async function fetchCurrentUser() {
  const { data } = await api.get<Usuario>("/auth/me");
  return data;
}
