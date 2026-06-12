package br.com.avaliaplus.dao;

import br.com.avaliaplus.config.ConnectionFactory;
import br.com.avaliaplus.model.Filme;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FilmeDAO {
    private static final String CAMPOS = """
            id, imdb_id, titulo, diretor, genero, ano, poster_url, sinopse,
            status, nota, comentario, data_assistido
            """;

    public List<Filme> listarTodos() throws SQLException {
        String sql = "SELECT " + CAMPOS + " FROM filmes ORDER BY data_assistido DESC, id DESC";
        List<Filme> filmes = new ArrayList<>();

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement comando = conexao.prepareStatement(sql);
             ResultSet resultado = comando.executeQuery()) {
            while (resultado.next()) {
                filmes.add(mapearFilme(resultado));
            }
        }

        return filmes;
    }

    public Optional<Filme> buscarPorId(Long id) throws SQLException {
        String sql = "SELECT " + CAMPOS + " FROM filmes WHERE id = ?";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement comando = conexao.prepareStatement(sql)) {
            comando.setLong(1, id);

            try (ResultSet resultado = comando.executeQuery()) {
                if (resultado.next()) {
                    return Optional.of(mapearFilme(resultado));
                }
            }
        }

        return Optional.empty();
    }

    public Filme cadastrar(Filme filme) throws SQLException {
        String sql = """
                INSERT INTO filmes (
                    imdb_id, titulo, diretor, genero, ano, poster_url, sinopse,
                    status, nota, comentario, data_assistido
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement comando = conexao.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            preencherComando(comando, filme);
            comando.executeUpdate();

            try (ResultSet chavesGeradas = comando.getGeneratedKeys()) {
                if (chavesGeradas.next()) {
                    filme.setId(chavesGeradas.getLong(1));
                }
            }
        }

        return filme;
    }

    public boolean atualizar(Long id, Filme filme) throws SQLException {
        String sql = """
                UPDATE filmes
                SET imdb_id = ?, titulo = ?, diretor = ?, genero = ?, ano = ?, poster_url = ?,
                    sinopse = ?, status = ?, nota = ?, comentario = ?, data_assistido = ?
                WHERE id = ?
                """;

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement comando = conexao.prepareStatement(sql)) {
            preencherComando(comando, filme);
            comando.setLong(12, id);
            return comando.executeUpdate() > 0;
        }
    }

    public boolean excluir(Long id) throws SQLException {
        String sql = "DELETE FROM filmes WHERE id = ?";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement comando = conexao.prepareStatement(sql)) {
            comando.setLong(1, id);
            return comando.executeUpdate() > 0;
        }
    }

    private void preencherComando(PreparedStatement comando, Filme filme) throws SQLException {
        filme.setImdbId(normalizarImdbId(filme));
        comando.setString(1, filme.getImdbId());
        comando.setString(2, filme.getTitulo());
        comando.setString(3, filme.getDiretor());
        comando.setString(4, filme.getGenero());
        comando.setInt(5, filme.getAno());
        comando.setString(6, filme.getPosterUrl());
        comando.setString(7, filme.getSinopse());
        comando.setString(8, filme.getStatus());
        comando.setDouble(9, filme.getNota());
        comando.setString(10, filme.getComentario());
        comando.setDate(11, Date.valueOf(filme.getDataAssistido()));
    }

    private Filme mapearFilme(ResultSet resultado) throws SQLException {
        return new Filme(
                resultado.getLong("id"),
                resultado.getString("imdb_id"),
                resultado.getString("titulo"),
                resultado.getString("diretor"),
                resultado.getString("genero"),
                resultado.getInt("ano"),
                resultado.getString("poster_url"),
                resultado.getString("sinopse"),
                resultado.getString("status"),
                resultado.getDouble("nota"),
                resultado.getString("comentario"),
                resultado.getDate("data_assistido").toString()
        );
    }

    private String normalizarImdbId(Filme filme) {
        if (filme.getImdbId() != null && !filme.getImdbId().isBlank()) {
            return filme.getImdbId();
        }

        return "manual-" + System.currentTimeMillis();
    }
}
