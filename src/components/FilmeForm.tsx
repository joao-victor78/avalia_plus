import { FormEvent, useEffect, useState } from 'react';
import type { Filme, FilmeFormData } from '../interfaces/Filme';

interface FilmeFormProps {
  filmeEditando: Filme | null;
  filmeSelecionado: FilmeFormData | null;
  onSalvar: (filme: FilmeFormData) => Promise<void>;
  onCancelarEdicao: () => void;
}

const estadoInicial: FilmeFormData = {
  imdbId: '',
  titulo: '',
  diretor: '',
  genero: '',
  ano: new Date().getFullYear(),
  posterUrl: '',
  sinopse: '',
  status: 'ASSISTIDO',
  nota: 0,
  comentario: '',
  dataAssistido: new Date().toISOString().slice(0, 10)
};

export function FilmeForm({ filmeEditando, filmeSelecionado, onSalvar, onCancelarEdicao }: FilmeFormProps) {
  const [form, setForm] = useState<FilmeFormData>(estadoInicial);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (filmeEditando) {
      const { id: _id, ...dados } = filmeEditando;
      setForm({ ...dados, status: 'ASSISTIDO' });
      return;
    }

    if (filmeSelecionado) {
      setForm(filmeSelecionado);
      return;
    }

    setForm(estadoInicial);
  }, [filmeEditando, filmeSelecionado]);

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setSalvando(true);

    try {
      await onSalvar(form);
      setForm(estadoInicial);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="form-panel" onSubmit={enviarFormulario}>
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <h2>{filmeEditando ? 'Editar avaliação' : 'Nova avaliação'}</h2>
        {(filmeEditando || filmeSelecionado) && (
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancelarEdicao}>
            Limpar
          </button>
        )}
      </div>

      {form.posterUrl && (
        <div className="selected-movie mb-3">
          <img src={form.posterUrl} alt={`Poster de ${form.titulo}`} />
          <div>
            <strong>{form.titulo}</strong>
            <span>
              {form.ano} • {form.genero || 'Gênero não informado'}
            </span>
          </div>
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-8">
          <label className="form-label" htmlFor="titulo">
            Filme
          </label>
          <input
            id="titulo"
            className="form-control"
            value={form.titulo}
            onChange={(evento) => setForm({ ...form, titulo: evento.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="ano">
            Ano
          </label>
          <input
            id="ano"
            type="number"
            className="form-control"
            min="1888"
            max="2100"
            value={form.ano}
            onChange={(evento) => setForm({ ...form, ano: Number(evento.target.value) })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="diretor">
            Diretor
          </label>
          <input
            id="diretor"
            className="form-control"
            value={form.diretor}
            onChange={(evento) => setForm({ ...form, diretor: evento.target.value })}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="genero">
            Gênero
          </label>
          <input
            id="genero"
            className="form-control"
            value={form.genero}
            onChange={(evento) => setForm({ ...form, genero: evento.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="nota">
            Nota
          </label>
          <input
            id="nota"
            type="number"
            className="form-control"
            min="0"
            max="5"
            step="0.5"
            value={form.nota}
            onChange={(evento) => setForm({ ...form, nota: Number(evento.target.value) })}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="dataAssistido">
            Data
          </label>
          <input
            id="dataAssistido"
            type="date"
            className="form-control"
            value={form.dataAssistido}
            onChange={(evento) => setForm({ ...form, dataAssistido: evento.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={form.status}
            onChange={(evento) => setForm({ ...form, status: evento.target.value as FilmeFormData['status'] })}
          >
            <option value="ASSISTIDO">Assistido</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="comentario">
            Comentário
          </label>
          <textarea
            id="comentario"
            className="form-control"
            rows={4}
            value={form.comentario}
            onChange={(evento) => setForm({ ...form, comentario: evento.target.value })}
            placeholder="Escreva sua avaliação do filme"
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-4" disabled={salvando}>
        {salvando ? 'Salvando...' : filmeEditando ? 'Atualizar avaliação' : 'Publicar avaliação'}
      </button>
    </form>
  );
}
