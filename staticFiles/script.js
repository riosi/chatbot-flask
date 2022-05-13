window.onload = function() {
    const socket = io('http://127.0.0.1:5000');

    function addToChat(msg) {
        const span = document.createElement("span");
        const chat = document.querySelector(".chat");
        span.innerHTML = `<strong>${msg.name}:</strong> ${msg.message}`
        chat.append(span);
    }

    socket.on('connect', () => {
        socket.send('Usuário conectado ao socket!')
    });

    document.querySelector("form").addEventListener("submit", function(event){
        event.preventDefault();
        socket.emit('sendMessage', {name: event.target[0].value, message: event.target[1].value})
        event.target[0].value = "";
        event.target[1].value = "";
    })

    socket.on('getMessage', (msg) => {
        addToChat(msg)
    });

    socket.on('message', (msgs) => {
        for (msg of msgs) {
            addToChat(msg)
        }
    })
}