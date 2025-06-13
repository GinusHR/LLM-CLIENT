const btn = document.querySelector("#submitButton");
const field = document.querySelector("#messageInput");
const endresult = document.querySelector("#result");
const lotr1 = document.querySelector("#lotr1");

let id = "5cd95395de30eff6ebccde5d";

btn.addEventListener("click", async (e) => askQuestion(e));

lotr1.addEventListener("click", (e) => startGame(e));

async function startGame(e) {
  e.preventDefault();
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application-json",
    },
  };
  const response = await fetch("http://localhost:3000/start", options);
  if (response.ok) {
    const data = await response.json();
    console.log(data.question);
    // endresult.innerText = data.message;
    addMessageHistory(data.question, "ai");
  } else {
    console.error(response.status);
  }
}

async function askQuestion(e) {
  e.preventDefault();

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: field.value, id: id }),
  };

  const response = await fetch("http://localhost:3000/ask", options);

  if (response.ok) {
    const data = await response.json();
    console.log(data.message);
    // endresult.innerText = data.message;
    addMessageHistory(data.message, "user");
  } else {
    console.error(response.status);
  }
}

function addMessageHistory(data, from) {
  console.log(data);
  const chatBox = document.getElementById("chatBox");

  if (from === "user") {
    const message = field.value.trim();

    if (message) {
      const userMessage = document.createElement("div");
      userMessage.className = "chat-message user";
      userMessage.textContent = message;
      chatBox.appendChild(userMessage);

      const aiMessage = document.createElement("div");
      aiMessage.className = "chat-message ai";
      aiMessage.textContent = "AI is thinking...";
      chatBox.appendChild(aiMessage);

      chatBox.scrollTop = chatBox.scrollHeight;

      field.value = "";

      aiMessage.textContent = data;
    }
  } else if (from === "ai") {
    setTimeout(() => {
      const aiMessage = document.createElement("div");
      aiMessage.className = "chat-message ai";
      aiMessage.textContent = data;
      chatBox.appendChild(aiMessage);

      chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
  }
}
