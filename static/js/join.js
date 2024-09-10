document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("join-chat-form");
    const input = document.getElementById("room-name");
    const messageElement = document.getElementById("join-room-message");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const roomName = input.value.trim(); // Get and trim the room name

        if (roomName) {
            try {
                // Check if the room exists
                const response = await fetch("/check-room", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ roomName }),
                });

                const data = await response.json();

                if (response.ok) {
                    // If the room exists, redirect to the room
                    window.location.href = `/chat/room=${roomName}`;
                } else {
                    // Show error message if the room doesn't exist
                    messageElement.textContent = data.error;
                    messageElement.style.color = "red";
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    });
});
