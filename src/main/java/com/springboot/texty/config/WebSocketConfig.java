package com.springboot.texty.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration //class has bean definitions
@EnableWebSocketMessageBroker //to enable Websockets
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //register a websocket endpoint that the clients will use to connect
        //SockJS as fall back options -make websockets work if browser doesn't supports websockets
        registry.addEndpoint("/texty").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //create in-memory message broker with destination prefix /topic
        registry.enableSimpleBroker("/topic");
        //methods annotated with @MessageMapping only trigger with prefic app
        registry.setApplicationDestinationPrefixes("/app");
    }
}