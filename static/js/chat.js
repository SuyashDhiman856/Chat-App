document.addEventListener("DOMContentLoaded", () => {
    const urlParts = document.URL.split("/");
    const roomString = urlParts.at(-1);;
    const roomName = roomString.split('=')[1];
    const username = localStorage.getItem("userName");

    const socket = new WebSocket(
        `wss://roomlink.site/chat/${roomName}`,
    );

    const userColors = {}; // Store user colors here

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    socket.onopen = (evt) => {
        console.log("Web Socket opened");
        const data = { type: "join", name: username || "Guest" }; // If username is null, use "Guest" as default
        socket.send(JSON.stringify(data));
    };

    socket.onmessage = (evt) => {
        console.log("New Message", evt);
        let msg = JSON.parse(evt.data);
        if (msg.type === "note") {
            const item = document.createElement("li");
            const text = document.createElement("i");
            item.classList.add("join");
            text.textContent = msg.text;
            item.appendChild(text);
            document.querySelector("#messages").appendChild(item);
        } else if (msg.type === "chat") {
            const item = document.createElement("li");
            if (!userColors[msg.name]) {
                userColors[msg.name] = getRandomColor();
            }
            item.style.backgroundColor = userColors[msg.name];
            item.style.color = "#fff";
            item.innerHTML = `<b>${msg.name}:</b> ${msg.text}`;
            document.querySelector("#messages").appendChild(item);
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
        const input = document.querySelector("#msg-input");
        evt.preventDefault();
        const payload = JSON.stringify({ type: "chat", text: input.value });
        socket.send(payload);
        input.value = "";
    });
});
