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


