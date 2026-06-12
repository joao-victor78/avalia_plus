import type { FilmeFormData } from '../interfaces/Filme';
import type { OmdbMovieDetails, OmdbSearchItem, OmdbSearchResponse } from '../interfaces/Omdb';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_URL = 'https://www.omdbapi.com/';

async function buscarJson<T>(parametros: URLSearchParams): Promise<T> {
  if (!OMDB_API_KEY) {
    throw new Error('Configure VITE_OMDB_API_KEY no arquivo .env.');
  }

  parametros.set('apikey', OMDB_API_KEY);
  const resposta = await fetch(`${OMDB_URL}?${parametros.toString()}`);

  if (!resposta.ok) {
    throw new Error('Não foi possível consultar a OMDb.');
  }

  return resposta.json() as Promise<T>;
}

export const omdbService = {
  async buscarFilmes(termo: string): Promise<OmdbSearchItem[]> {
    const resposta = await buscarJson<OmdbSearchResponse>(
      new URLSearchParams({
        s: termo,
        type: 'movie'
      })
    );

    if (resposta.Response === 'False') {
      return [];
    }

    return resposta.Search ?? [];
  },

  async buscarDetalhes(imdbId: string): Promise<FilmeFormData> {
    const resposta = await buscarJson<OmdbMovieDetails>(
      new URLSearchParams({
        i: imdbId,
        plot: 'short'
      })
    );

    if (resposta.Response === 'False') {
      throw new Error(resposta.Error || 'Filme não encontrado na OMDb.');
    }

    return {
      imdbId: resposta.imdbID,
      titulo: resposta.Title,
      diretor: resposta.Director === 'N/A' ? '' : resposta.Director,
      genero: resposta.Genre === 'N/A' ? '' : resposta.Genre,
      ano: Number.parseInt(resposta.Year, 10) || new Date().getFullYear(),
      posterUrl: resposta.Poster === 'N/A' ? '' : resposta.Poster,
      sinopse: resposta.Plot === 'N/A' ? '' : resposta.Plot,
      status: 'ASSISTIDO',
      nota: 0,
      comentario: '',
      dataAssistido: new Date().toISOString().slice(0, 10)
    };
  }
};
