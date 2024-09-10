document.addEventListener("DOMContentLoaded", () => {
    const urlParts = document.URL.split("/");
    const roomName = urlParts.at(-1);
    const username = prompt("Enter your username. (no spaces)");

    const socket = new WebSocket(`wss://03acef41-7d6e-44e6-9cbc-e40de73e0b7f-00-yfjhqydzgoaj.riker.replit.dev/chat/${roomName}`);

    socket.onopen = (evt) => {
        console.log("Web Socket opened");
        const data = { type: "join", name: username || "Guest" }; // If username is null, use "Guest" as default
        socket.send(JSON.stringify(data));
    };

    socket.onmessage = (evt) => {
        console.log("New Message", evt);
        let msg = JSON.parse(evt.data);
        if (msg.type === "note") {
            const item = document.createElement('li');
            const text = document.createElement('i');
            item.classList.add("join");
            text.textContent = msg.text;
            item.appendChild(text);
            document.querySelector('#messages').appendChild(item);
        } else if (msg.type === "chat") {
            const item = document.createElement('li');
            item.innerHTML = `<b>${msg.name}:</b> ${msg.text}`;
            document.querySelector('#messages').appendChild(item);
        }
    };

    socket.onerror = (evt) => {
        console.log("Something went wrong");
        console.log(evt);
    };

    socket.onclose = (evt) => {
        console.log("WebSocket has been closed");
    };

    document.querySelector("#msg-form").addEventListener("submit", (evt) => {
        const input = document.querySelector('#msg-input');
        evt.preventDefault();
        const payload = JSON.stringify({ type: "chat", text: input.value });
        socket.send(payload);
        input.value = "";
    });
});
