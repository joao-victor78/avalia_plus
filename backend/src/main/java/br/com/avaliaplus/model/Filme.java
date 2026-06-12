package br.com.avaliaplus.model;

public class Filme {
    private Long id;
    private String imdbId;
    private String titulo;
    private String diretor;
    private String genero;
    private Integer ano;
    private String posterUrl;
    private String sinopse;
    private String status;
    private Double nota;
    private String comentario;
    private String dataAssistido;

    public Filme() {
    }

    public Filme(Long id, String imdbId, String titulo, String diretor, String genero, Integer ano,
                 String posterUrl, String sinopse, String status, Double nota, String comentario,
                 String dataAssistido) {
        this.id = id;
        this.imdbId = imdbId;
        this.titulo = titulo;
        this.diretor = diretor;
        this.genero = genero;
        this.ano = ano;
        this.posterUrl = posterUrl;
        this.sinopse = sinopse;
        this.status = status;
        this.nota = nota;
        this.comentario = comentario;
        this.dataAssistido = dataAssistido;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDiretor() {
        return diretor;
    }

    public void setDiretor(String diretor) {
        this.diretor = diretor;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getSinopse() {
        return sinopse;
    }

    public void setSinopse(String sinopse) {
        this.sinopse = sinopse;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getNota() {
        return nota;
    }

    public void setNota(Double nota) {
        this.nota = nota;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getDataAssistido() {
        return dataAssistido;
    }

    public void setDataAssistido(String dataAssistido) {
        this.dataAssistido = dataAssistido;
    }
}
