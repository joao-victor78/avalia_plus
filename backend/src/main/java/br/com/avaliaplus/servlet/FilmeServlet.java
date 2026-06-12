package br.com.avaliaplus.servlet;

import br.com.avaliaplus.dao.FilmeDAO;
import br.com.avaliaplus.model.Filme;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.sql.SQLException;
import java.util.Optional;

@WebServlet("/filmes/*")
public class FilmeServlet extends HttpServlet {
    private final FilmeDAO filmeDAO = new FilmeDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        configurarJson(response);

        try {
            Optional<Long> id = extrairId(request);

            if (id.isPresent()) {
                Optional<Filme> filme = filmeDAO.buscarPorId(id.get());

                if (filme.isEmpty()) {
                    enviarErro(response, HttpServletResponse.SC_NOT_FOUND, "Filme não encontrado.");
                    return;
                }

                response.getWriter().write(gson.toJson(filme.get()));
                return;
            }

            response.getWriter().write(gson.toJson(filmeDAO.listarTodos()));
        } catch (SQLException exception) {
            enviarErro(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao consultar filmes.");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        configurarJson(response);

        try {
            Filme filme = lerFilme(request);
            String erro = validarFilme(filme);

            if (erro != null) {
                enviarErro(response, HttpServletResponse.SC_BAD_REQUEST, erro);
                return;
            }

            Filme filmeCadastrado = filmeDAO.cadastrar(filme);
            response.setStatus(HttpServletResponse.SC_CREATED);
            response.getWriter().write(gson.toJson(filmeCadastrado));
        } catch (JsonSyntaxException exception) {
            enviarErro(response, HttpServletResponse.SC_BAD_REQUEST, "JSON inválido.");
        } catch (SQLException exception) {
            enviarErro(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao cadastrar filme.");
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        configurarJson(response);

        try {
            Optional<Long> id = extrairId(request);

            if (id.isEmpty()) {
                enviarErro(response, HttpServletResponse.SC_BAD_REQUEST, "Informe o ID do filme.");
                return;
            }

            Filme filme = lerFilme(request);
            String erro = validarFilme(filme);

            if (erro != null) {
                enviarErro(response, HttpServletResponse.SC_BAD_REQUEST, erro);
                return;
            }

            boolean atualizado = filmeDAO.atualizar(id.get(), filme);

            if (!atualizado) {
                enviarErro(response, HttpServletResponse.SC_NOT_FOUND, "Filme não encontrado.");
                return;
            }

            filme.setId(id.get());
            response.getWriter().write(gson.toJson(filme));
        } catch (JsonSyntaxException exception) {
            enviarErro(response, HttpServletResponse.SC_BAD_REQUEST, "JSON inválido.");
        } catch (SQLException exception) {
            enviarErro(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao atualizar filme.");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        configurarJson(response);

        try {
            Optional<Long> id = extrairId(request);

            if (id.isEmpty()) {
                enviarErro(response, HttpServletResponse.SC_BAD_REQUEST, "Informe o ID do filme.");
                return;
            }

            boolean removido = filmeDAO.excluir(id.get());

            if (!removido) {
                enviarErro(response, HttpServletResponse.SC_NOT_FOUND, "Filme não encontrado.");
                return;
            }

            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
        } catch (SQLException exception) {
            enviarErro(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao excluir filme.");
        }
    }

    private Optional<Long> extrairId(HttpServletRequest request) {
        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/") || pathInfo.isBlank()) {
            return Optional.empty();
        }

        try {
            return Optional.of(Long.parseLong(pathInfo.substring(1)));
        } catch (NumberFormatException exception) {
            return Optional.empty();
        }
    }

    private Filme lerFilme(HttpServletRequest request) throws IOException {
        return gson.fromJson(request.getReader(), Filme.class);
    }

    private String validarFilme(Filme filme) {
        if (filme == null) {
            return "Os dados do filme são obrigatórios.";
        }
        if (isBlank(filme.getTitulo()) || isBlank(filme.getDiretor()) || isBlank(filme.getGenero())) {
            return "Título, diretor e gênero são obrigatórios.";
        }
        if (filme.getAno() == null || filme.getAno() < 1888 || filme.getAno() > 2100) {
            return "Ano do filme inválido.";
        }
        if (filme.getNota() == null || filme.getNota() < 0 || filme.getNota() > 5) {
            return "A nota deve estar entre 0 e 5.";
        }
        if (isBlank(filme.getComentario())) {
            return "O comentário da avaliação é obrigatório.";
        }
        if (isBlank(filme.getDataAssistido())) {
            return "A data assistida é obrigatória.";
        }
        try {
            LocalDate.parse(filme.getDataAssistido());
        } catch (DateTimeParseException exception) {
            return "A data assistida deve estar no formato yyyy-MM-dd.";
        }
        if (!"ASSISTIDO".equals(filme.getStatus()) && !"QUERO_ASSISTIR".equals(filme.getStatus())) {
            return "Status inválido.";
        }

        return null;
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private void configurarJson(HttpServletResponse response) {
        response.setContentType("application/json;charset=UTF-8");
    }

    private void enviarErro(HttpServletResponse response, int status, String mensagem) throws IOException {
        response.setStatus(status);
        response.getWriter().write(gson.toJson(new ErroResposta(mensagem)));
    }

    private record ErroResposta(String mensagem) {
    }
}
