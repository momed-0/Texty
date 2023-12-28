
var stompClient = null;
var username = null;

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

function connect(event) {
    //get the username and remove the leading and trailing whitespace
    username = document.querySelector('#name').value.trim();
    if(username) { //check if username is not empty
        usernamePage.classList.add('hidden');//hide the login page
        chatPage.classList.remove('hidden');//display the chatpage

        var socket = new SockJS('/texty');//create new Websocket connection using sockJS library
        //create a stomp client over the websocket connection
        stompClient = Stomp.over(socket);
        //onConnected called when connection is successfull
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected() {
    // Subscribe to the Public Topic and call onMessageReceived when message is received on this channel
    //listen to messages asynchronously
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Registration message to the server
    stompClient.send("/app/chat.register",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}

function onError(error) {
    connectingElement.textContent = 'Unable to connect to WebSocket! Refresh the page and try again, or contact your administrator.';
    connectingElement.style.color = 'red';
}

function send(event) {
    //get the message without leading or training white
    var messageContent = messageInput.value.trim();

    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };

        stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
        messageInput.value = ''; //clears the input and make ready for next message
    }
    event.preventDefault(); // prevent the page from reloading
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    //scroll to the bottom
    messageArea.scrollTop = messageArea.scrollHeight;
}


usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', send, true)
