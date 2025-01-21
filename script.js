const sendMessage = async () => {
    const message = document.getElementById('userInput').value;
    const chatbox = document.getElementById('chatbox');

    // Display user message in chatbox with animation
    chatbox.innerHTML += `<p class="user"><strong>You:</strong> ${message}</p>`;
    document.getElementById('userInput').value = '';  // Clear input field
    chatbox.scrollTop = chatbox.scrollHeight;  // Scroll to bottom

    // Send message to Flask backend
    const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    });

    const data = await response.json();
    
    // Display bot response in chatbox with animation
    setTimeout(() => {
        chatbox.innerHTML += `<p class="bot"><strong>Bot:</strong> ${data.response}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;  // Scroll to bottom
    }, 1000); // Wait for 1 second before displaying bot message for a more dynamic feel
};
