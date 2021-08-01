package com.webApp.Utopia.websocket;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/*
 * @author Jeff
 * @date 8/1/21 1:32 AM
 */
@ServerEndpoint("/notification/{username}")
@Component
public class NotificationServer {
    private static Map<String, Session> onlineSessions = new ConcurrentHashMap<>();
    private Session session;
    private String username;

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username) {
        this.session = session;
        onlineSessions.put(username, session);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        //Jsonfy message, then send notification to the person who should be notified
    }

    @OnClose
    public void onClose() {
        onlineSessions.remove(username);
    }

}
