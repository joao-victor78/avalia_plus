import type { Filme } from '../interfaces/Filme';

interface DashboardProps {
  filmes: Filme[];
}

export function Dashboard({ filmes }: DashboardProps) {
  const filmesAssistidos = filmes.filter((filme) => filme.status === 'ASSISTIDO');
  const assistidos = filmesAssistidos.length;
  const queroAssistir = filmes.filter((filme) => filme.status === 'QUERO_ASSISTIR').length;
  const media =
    assistidos > 0
      ? (filmesAssistidos.reduce((total, filme) => total + filme.nota, 0) / assistidos).toFixed(1)
      : '0.0';

  return (
    <section className="row g-3 mb-4" aria-label="Resumo do catálogo">
      <div className="col-6 col-lg-3">
        <div className="summary-card">
          <span>Total cadastrado</span>
          <strong>{filmes.length}</strong>
        </div>
      </div>
      <div className="col-6 col-lg-3">
        <div className="summary-card">
          <span>Assistidos</span>
          <strong>{assistidos}</strong>
        </div>
      </div>
      <div className="col-6 col-lg-3">
        <div className="summary-card">
          <span>Quero ver</span>
          <strong>{queroAssistir}</strong>
        </div>
      </div>
      <div className="col-6 col-lg-3">
        <div className="summary-card">
          <span>Nota média</span>
          <strong>{media}</strong>
        </div>
      </div>
    </section>
  );
}
