package br.com.avaliaplus.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter("/*")
public class CorsFilter implements Filter {
    private static final String LOCALHOST_ORIGIN = "http://localhost:5173";
    private static final String LOOPBACK_ORIGIN = "http://127.0.0.1:5173";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest requisicaoHttp = (HttpServletRequest) request;
        HttpServletResponse respostaHttp = (HttpServletResponse) response;
        String origem = requisicaoHttp.getHeader("Origin");

        requisicaoHttp.setCharacterEncoding("UTF-8");
        respostaHttp.setCharacterEncoding("UTF-8");

        if (LOCALHOST_ORIGIN.equals(origem) || LOOPBACK_ORIGIN.equals(origem)) {
            respostaHttp.setHeader("Access-Control-Allow-Origin", origem);
        }
        respostaHttp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        respostaHttp.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if ("OPTIONS".equalsIgnoreCase(requisicaoHttp.getMethod())) {
            respostaHttp.setStatus(HttpServletResponse.SC_NO_CONTENT);
            return;
        }

        chain.doFilter(request, response);
    }
}
