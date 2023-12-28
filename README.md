# Texty

A real-time chat application built with Spring Boot for the backend and HTML/CSS/JS for the frontend. The application uses WebSocket communication to enable instant messaging between users.

## Features

- **User Registration:** Users can enter their usernames to join the chat.
- **Real-Time Messaging:** Messages are delivered in real-time to all connected users.
- **Event Notifications:** User join and leave events are broadcasted to all participants.
- **Clean and Responsive UI:** HTML, CSS, and JS provide a simple and responsive user interface.

## Technology Stack

- **Backend:** Spring Boot, WebSocket, Java
- **Frontend:** HTML, CSS, JavaScript, SockJS, Stomp.js

## Project Structure

- **`src/main/java/com/springboot/texty`:** Contains the Spring Boot application, WebSocket configuration, controller, and message model.
- **`src/main/resources/static`:** Houses the HTML, CSS, and JS files for the frontend.

## How to Run

1. Clone the repository.
2. Run the Spring Boot application (`TextyApplication.java`).
3. Go to localhost:8080



##To Do -
- Add database support where display previous messages in chat
- Add authentication support
- Personal messages and group messages to the users

