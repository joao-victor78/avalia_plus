import { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { FilmeForm } from './components/FilmeForm';
import { FilmeTable } from './components/FilmeTable';
import { OmdbSearch } from './components/OmdbSearch';
import type { Filme, FilmeFormData } from './interfaces/Filme';
import { filmeService } from './services/filmeService';

function App() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [filmeEditando, setFilmeEditando] = useState<Filme | null>(null);
  const [filmeSelecionado, setFilmeSelecionado] = useState<FilmeFormData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarFilmes() {
    setCarregando(true);
    setErro(null);

    try {
      const dados = await filmeService.listar();
      setFilmes(dados);
    } catch (erroCapturado) {
      setErro(erroCapturado instanceof Error ? erroCapturado.message : 'Não foi possível carregar as avaliações.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  async function salvarFilme(dados: FilmeFormData) {
    setErro(null);
    setMensagem(null);

    try {
      if (filmeEditando?.id) {
        await filmeService.atualizar(filmeEditando.id, dados);
        setMensagem('Avaliação atualizada com sucesso.');
      } else {
        await filmeService.cadastrar(dados);
        setMensagem('Avaliação publicada com sucesso.');
      }

      setFilmeEditando(null);
      setFilmeSelecionado(null);
      await carregarFilmes();
    } catch (erroCapturado) {
      const mensagemErro =
        erroCapturado instanceof Error ? erroCapturado.message : 'Não foi possível salvar a avaliação.';
      setErro(mensagemErro);
      throw new Error(mensagemErro);
    }
  }

  async function adicionarQueroVer(dados: FilmeFormData) {
    setErro(null);
    setMensagem(null);

    try {
      await filmeService.cadastrar(dados);
      setMensagem(`"${dados.titulo}" foi adicionado à lista Quero ver.`);
      await carregarFilmes();
    } catch (erroCapturado) {
      const mensagemErro =
        erroCapturado instanceof Error ? erroCapturado.message : 'Não foi possível adicionar o filme.';
      setErro(mensagemErro);
      throw new Error(mensagemErro);
    }
  }

  async function excluirFilme(id: number) {
    const confirmou = window.confirm('Deseja excluir esta avaliação?');

    if (!confirmou) {
      return;
    }

    setErro(null);
    setMensagem(null);

    try {
      await filmeService.excluir(id);
      setMensagem('Avaliação excluída com sucesso.');
      if (filmeEditando?.id === id) {
        setFilmeEditando(null);
      }
      await carregarFilmes();
    } catch (erroCapturado) {
      setErro(erroCapturado instanceof Error ? erroCapturado.message : 'Não foi possível excluir a avaliação.');
    }
  }

  function limparFormulario() {
    setFilmeEditando(null);
    setFilmeSelecionado(null);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container">
          <p className="eyebrow">Avalia++</p>
          <h1>Diário de filmes e avaliações</h1>
          <p className="lead mb-0">Busque filmes na OMDb e registre suas notas, comentários e histórico.</p>
        </div>
      </header>

      <main className="container py-4">
        {mensagem && <div className="alert alert-success">{mensagem}</div>}
        {erro && <div className="alert alert-danger">{erro}</div>}

        <Dashboard filmes={filmes} />

        <div className="row g-4">
          <div className="col-lg-5">
            <OmdbSearch
              onSelecionarFilme={(filme) => {
                setFilmeEditando(null);
                setFilmeSelecionado(filme);
              }}
              onQueroVer={adicionarQueroVer}
            />
            {(filmeEditando || filmeSelecionado) && (
              <FilmeForm
                filmeEditando={filmeEditando}
                filmeSelecionado={filmeSelecionado}
                onSalvar={salvarFilme}
                onCancelarEdicao={limparFormulario}
              />
            )}
          </div>
          <div className="col-lg-7">
            <FilmeTable
              filmes={filmes}
              carregando={carregando}
              onEditar={(filme) => {
                setFilmeSelecionado(null);
                setFilmeEditando(filme);
              }}
              onExcluir={excluirFilme}
            />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <span>Aluno: João Victor Alves da Mota</span>
          <span>09/06/2026</span>
          <span>Disciplina: Desenvolvimento Web</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
