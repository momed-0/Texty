package com.springboot.texty.controller;

import com.springboot.texty.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    //When a message is send to chat.register this method will be invoked
    @MessageMapping("/chat.register") //endpoint for this method
    @SendTo("/topic/public")//destination for the result
    public ChatMessage register(@Payload ChatMessage chatMessage,SimpMessageHeaderAccessor headerAccessor) {
        //annotated parameter should be populated witht he payload of the incoming message
        //Payload - actual data transmitted
        //automatically deserialize the incoming websocket messages payload into an instance of ChatMessage class
        //SimpMessageHeader headerAccessor - access to the headers of the WebSocket Message
        //stores the username of the sender and stores the session attribute with key username
        headerAccessor.getSessionAttributes().put("username",chatMessage.getSender());
        return chatMessage;//same chat message send to"/topic/public"
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }
}
