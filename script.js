
function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (text === "") return;

  appendMessage("شما", text, "user");
  input.value = "";

  setTimeout(() => {
    const response = getAIResponse(text);
    appendMessage("MTBlack", response, "bot");
  }, 600);
}

function appendMessage(sender, text, cls) {
  const chatBox = document.getElementById("chat-box");
  const message = document.createElement("div");
  message.classList.add("message", cls);
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getAIResponse(userMsg) {
  const replies = [
    "جالبه! بیشتر بگو.",
    "من دارم فکر می‌کنم...",
    "مطمئنی؟",
    "خوشم اومد از حرفت.",
    "بیا بیشتر حرف بزنیم.",
    "سوال خوبیه، ولی باید بیشتر بدونم."
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
