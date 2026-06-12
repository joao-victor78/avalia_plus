import type { Filme } from '../interfaces/Filme';

interface FilmeTableProps {
  filmes: Filme[];
  carregando: boolean;
  onEditar: (filme: Filme) => void;
  onExcluir: (id: number) => void;
}

export function FilmeTable({ filmes, carregando, onEditar, onExcluir }: FilmeTableProps) {
  return (
    <section className="reviews-panel">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <h2>Diário de avaliações</h2>
        <span className="badge text-bg-light">{filmes.length} registro(s)</span>
      </div>

      {carregando && <p className="text-secondary mb-0">Carregando avaliações...</p>}
      {!carregando && filmes.length === 0 && <p className="text-secondary mb-0">Nenhuma avaliação cadastrada.</p>}

      {!carregando && (
        <div className="review-list">
          {filmes.map((filme) => (
            <article className="review-card" key={filme.id}>
              <img src={filme.posterUrl || '/icon.png'} alt={`Poster de ${filme.titulo}`} />
              <div className="review-content">
                <div className="review-heading">
                  <div>
                    <h3>{filme.titulo}</h3>
                    <p>
                      {filme.ano} • {filme.diretor} • {filme.genero}
                    </p>
                  </div>
                  <strong>{filme.nota.toFixed(1)}/5</strong>
                </div>

                {filme.sinopse && <p className="synopsis">{filme.sinopse}</p>}
                <p className="comment">{filme.comentario}</p>

                <div className="review-meta">
                  <span className={`status-badge ${filme.status === 'ASSISTIDO' ? 'watched' : 'watchlist'}`}>
                    {filme.status === 'ASSISTIDO' ? 'Assistido' : 'Quero ver'}
                  </span>
                  <span>{filme.dataAssistido}</span>
                </div>

                <div className="btn-group btn-group-sm mt-3" role="group" aria-label="Ações da avaliação">
                  <button className="btn btn-outline-primary" type="button" onClick={() => onEditar(filme)}>
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => filme.id && onExcluir(filme.id)}
                  >
                    Excluir
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
