import type { Filme, FilmeFormData } from '../interfaces/Filme';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/avalia-api/filmes';

async function requisicao<T>(url: string, opcoes?: RequestInit): Promise<T> {
  const resposta = await fetch(url, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    ...opcoes
  });

  if (!resposta.ok) {
    const mensagem = await resposta.text();
    let mensagemInterpretada = mensagem;

    try {
      const corpoErro = JSON.parse(mensagem) as { mensagem?: string };
      mensagemInterpretada = corpoErro.mensagem || mensagemInterpretada;
    } catch {
      mensagemInterpretada = mensagem;
    }

    throw new Error(mensagemInterpretada || 'Erro ao se comunicar com o servidor.');
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return resposta.json() as Promise<T>;
}

export const filmeService = {
  listar: () => requisicao<Filme[]>(API_URL),
  buscarPorId: (id: number) => requisicao<Filme>(`${API_URL}/${id}`),
  cadastrar: (filme: FilmeFormData) =>
    requisicao<Filme>(API_URL, {
      method: 'POST',
      body: JSON.stringify(filme)
    }),
  atualizar: (id: number, filme: FilmeFormData) =>
    requisicao<Filme>(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(filme)
    }),
  excluir: (id: number) =>
    requisicao<void>(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
};
