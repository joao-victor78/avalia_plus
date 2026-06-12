import { FormEvent, useState } from 'react';
import type { FilmeFormData } from '../interfaces/Filme';
import type { OmdbSearchItem } from '../interfaces/Omdb';
import { omdbService } from '../services/omdbService';

interface OmdbSearchProps {
  onSelecionarFilme: (filme: FilmeFormData) => void;
  onQueroVer: (filme: FilmeFormData) => Promise<void>;
}

export function OmdbSearch({ onSelecionarFilme, onQueroVer }: OmdbSearchProps) {
  const [termo, setTermo] = useState('');
  const [resultados, setResultados] = useState<OmdbSearchItem[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!termo.trim()) {
      setErro('Digite o nome de um filme.');
      return;
    }

    setCarregando(true);
    setErro(null);

    try {
      const dados = await omdbService.buscarFilmes(termo.trim());
      setResultados(dados);

      if (dados.length === 0) {
        setErro('Nenhum filme encontrado na OMDb.');
      }
    } catch (erroCapturado) {
      setErro(erroCapturado instanceof Error ? erroCapturado.message : 'Erro ao buscar filmes.');
    } finally {
      setCarregando(false);
    }
  }

  async function selecionar(imdbId: string, status: FilmeFormData['status']) {
    setCarregando(true);
    setErro(null);

    try {
      const detalhes = await omdbService.buscarDetalhes(imdbId);
      const filme = { ...detalhes, status };

      if (status === 'QUERO_ASSISTIR') {
        await onQueroVer({
          ...filme,
          nota: 0,
          comentario: 'Adicionado à lista Quero ver.'
        });
        return;
      }

      onSelecionarFilme(filme);
    } catch (erroCapturado) {
      setErro(erroCapturado instanceof Error ? erroCapturado.message : 'Erro ao carregar detalhes do filme.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="search-panel">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <h2>Buscar filme</h2>
        <span className="badge text-bg-dark">OMDb</span>
      </div>

      <form className="input-group" onSubmit={buscar}>
        <input
          className="form-control"
          placeholder="Ex.: Clube da Luta"
          value={termo}
          onChange={(evento) => setTermo(evento.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={carregando}>
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {erro && <div className="alert alert-warning mt-3 mb-0">{erro}</div>}

      {resultados.length > 0 && (
        <div className="search-results">
          {resultados.map((filme) => (
            <article className="search-item" key={filme.imdbID}>
              <img
                src={filme.Poster !== 'N/A' ? filme.Poster : '/icon.png'}
                alt={`Poster de ${filme.Title}`}
              />
              <div>
                <h3>{filme.Title}</h3>
                <p>{filme.Year}</p>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    type="button"
                    disabled={carregando}
                    onClick={() => selecionar(filme.imdbID, 'ASSISTIDO')}
                  >
                    Avaliar
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    disabled={carregando}
                    onClick={() => selecionar(filme.imdbID, 'QUERO_ASSISTIR')}
                  >
                    Quero ver
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
