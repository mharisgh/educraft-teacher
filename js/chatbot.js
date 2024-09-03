// Open chatbot popup
document.querySelector('.ecChatBotBtn').addEventListener('click', function () {
  document.getElementById('ecChatBotPopup').classList.add('flex');
  document.getElementById('ecChatBotPopup').classList.remove('opacity-0');
  document.getElementById('ecChatBotPopup').classList.replace('translate-x-[390px]', 'translate-x-[0px]')
});

// Open chatbot popup
document.querySelector('.ecChatBotBtnSm').addEventListener('click', function () {
  document.getElementById('ecChatBotPopup').classList.add('flex');
  document.getElementById('ecChatBotPopup').classList.remove('opacity-0');
  document.getElementById('ecChatBotPopup').classList.replace('translate-x-[390px]', 'translate-x-[0px]')
});

// Close chatbot popup
document.getElementById('ecChatBotCloseBtn').addEventListener('click', function () {
  document.getElementById('ecChatBotPopup').classList.remove('opacity-100');
  document.getElementById('ecChatBotPopup').classList.replace('translate-x-[0px]', 'translate-x-[390px]',)
});

// Handle sending messages
document.getElementById('sendButton').addEventListener('click', function () {
  const chatInput = document.getElementById('chatInput');
  const chatArea = document.querySelector('.chat-area');
  const welcomeMessage = document.querySelector('.welcome-message');

  // Remove the welcome message when a user sends their first message
  if (welcomeMessage) {
    welcomeMessage.remove();
  }

  if (chatInput.value.trim() !== "") {
    // Append user's message to chat area
    const userMessage = document.createElement('p');
    userMessage.textContent = `You: ${chatInput.value}`;
    userMessage.classList.add('mt-2', 'bg-white', 'font-medium', 'p-2', 'rounded-lg', 'shadow', 'w-fit', 'text-sm');
    chatArea.appendChild(userMessage);

    // Clear input
    chatInput.value = "";

    // Auto-scroll to the bottom of chat area
    chatArea.scrollTop = chatArea.scrollHeight;
  }
});