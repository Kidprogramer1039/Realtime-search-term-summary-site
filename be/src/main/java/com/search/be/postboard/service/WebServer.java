//package com.search.be.postboard.service;
//
//import org.eclipse.jetty.server.Server;
//import org.eclipse.jetty.servlet.ServletContextHandler;
//import org.eclipse.jetty.servlet.ServletHolder;
//
//import jakarta.servlet.http.HttpServlet;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//public class WebServer {
//    private final Server server;
//
//    public WebServer(int port) {
//        server = new Server(port);
//
//        // 요청 처리 핸들러 설정
//        ServletContextHandler handler = new ServletContextHandler();
//        handler.addServlet(new ServletHolder(new HelloServlet()), "/");
//
//        server.setHandler(handler);
//    }
//
//    public void start() throws Exception {
//        System.out.println("서버 시작! http://localhost:" + server.getURI().getPort());
//        server.start();
//        server.join();
//    }
//
//    // 요청 처리 클래스 (내부 클래스로 둬도 되고 밖으로 빼도 됨)
//    public static class HelloServlet extends HttpServlet {
//        @Override
//        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
//            resp.setContentType("text/html");
//            resp.getWriter().println("<h1>인텔리제이에서 잘 분리된 웹서버!</h1>");
//        }
//    }
//}