const messagesDiv = document.getElementById("messages");
const input = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  div.style.alignSelf = who === "user" ? "flex-end" : "flex-start";
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function callAI(userText) {
  const apiKey = "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"; // өөрийн API key
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }]
    }),
  });
  const data = await response.json();
  // OpenAI-н хариуны текст
  return data.choices[0].message.content;
}

sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";

  try {
    const reply = await window.electronAPI.callAI(text);
    addMessage(reply, "ai");
  } catch (err) {
    addMessage("Алдаа: " + err.message, "ai");
  }
});


