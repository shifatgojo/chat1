/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const chatHistory = document.getElementById('chat-history');
  const messageInput = document.getElementById('message-input');
  const chatForm = document.getElementById('chat-form');
  const userSwitcher = document.getElementById('user-switcher');
  const userIndicator = document.getElementById('user-indicator');
  const chatHeader = document.getElementById('chat-header');
  const initialMessage = document.querySelector('.initial-message');

  // --- App State ---
  let currentUser = 'User 1';

  /**
   * Appends a message to the chat history.
   * @param {string} message - The text of the message.
   * @param {string} sender - The user who sent the message ('User 1' or 'User 2').
   */
  function appendMessage(message, sender) {
    // Hide the initial message if it's visible
    if (initialMessage && !initialMessage.hidden) {
      initialMessage.hidden = true;
    }

    const messageWrapper = document.createElement('div');
    const messageType = sender === 'User 1' ? 'user-message' : 'friend-message';
    messageWrapper.classList.add('message', messageType);

    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = message;

    // Add sender name above the message
    const senderName = document.createElement('div');
    senderName.classList.add('sender-name');
    senderName.textContent = sender;

    messageWrapper.appendChild(senderName);
    messageWrapper.appendChild(content);

    chatHistory.appendChild(messageWrapper);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the latest message
  }

  /**
   * Updates the UI to reflect the current user.
   */
  function updateUserUI() {
    userIndicator.textContent = `${currentUser} is typing...`;
    chatHeader.style.backgroundColor = currentUser === 'User 1' ? 'var(--user-accent)' : 'var(--friend-accent)';
  }

  /**
   * Handles the chat form submission.
   * @param {Event} e - The form submission event.
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    const userMessage = messageInput.value.trim();

    if (userMessage) {
      appendMessage(userMessage, currentUser);
      messageInput.value = ''; // Clear input after sending
      messageInput.focus();
    }
  }

  /**
   * Handles the user switcher button click.
   */
  function switchUser() {
    currentUser = currentUser === 'User 1' ? 'User 2' : 'User 1';
    updateUserUI();
    messageInput.focus();
  }

  // --- Event Listeners ---
  chatForm.addEventListener('submit', handleFormSubmit);
  userSwitcher.addEventListener('click', switchUser);

  // --- Initial Setup ---
  updateUserUI();
  messageInput.focus();
});