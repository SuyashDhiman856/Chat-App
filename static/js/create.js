document.addEventListener("DOMContentLoaded", function () {
    const createForm = document.getElementById("create-chat-form");
    const messageElement = document.getElementById("create-room-message");
    const user = document.getElementById("user-name");

    createForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const roomName = document.getElementById("room-name").value.trim();

        if (roomName) {
            localStorage.setItem("userName", user.value);
            try {
                // Create the room
                const response = await fetch("/create-room", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ roomName }),
                });

                const data = await response.json();

                if (response.ok) {
                    // If the room was created, redirect to the room
                    window.location.href = `/chat/room=${roomName}`;
                } else {
                    // Show error message if room creation fails
                    messageElement.textContent = data.error;
                    messageElement.style.color = "red";
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    });
});
