function scrollToBottom() {
  const chatArea = document.getElementById("chatArea");
  chatArea.scrollTop = chatArea.scrollHeight;
}

function addResponse(response) {
  const chatArea = document.getElementById("chatArea");

  // Create new div
  const msg = document.createElement("div");
  msg.className = "aiResponse";
  msg.innerHTML = `<p><strong>AI: </strong>${response}</p>`;

  chatArea.append(msg);

  // scroll to bottom
  scrollToBottom();
}

async function getResponse(formData) {
  const apiUrl = "http://127.0.0.1:8000/generate_script/";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    addResponse(data.response);
  } catch (error) {
    console.error(error);
  }
  // addResponse("Sample response");
}

document.getElementById("send_btn").addEventListener("click", (event) => {
  event.preventDefault();
  const prompt_input = document.getElementById("prompt_input");
  const fileInput = document.getElementById("fileInput").files[0];
  const chatArea = document.getElementById("chatArea");

  if (!prompt_input.value) {
    alert("Please enter a prompt");
    return;
  }

  // create new div and add
  const userRes = document.createElement("div");
  userRes.className = "userResponse";
  userRes.innerHTML = `<p><strong>You: </strong>${prompt_input.value}</p>`;

  // files
  const formData = new FormData();
  formData.append("prompt", prompt_input.value);

  if (fileInput) {
    formData.append("file", fileInput);
  }

  // append

  chatArea.append(userRes);
  scrollToBottom();

  // generate response
  getResponse(formData);

  // clear the input field
  prompt_input.value = "";

  // clear the file input
  document.getElementById("fileInput").value = "";
});

document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const fileType = file.type;
    const previewDiv = document.getElementById("preview");

    if (fileType.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.maxWidth = "200px";
      previewDiv.innerHTML = "";
      previewDiv.appendChild(img);
    } else if (fileType === "application/pdf") {
      previewDiv.innerHTML = `<p> PDF Selected: ${file.name}`;
    }
  }
});

async function fetchSavedScripts() {
  try {
    const apiUrl = "http://127.0.0.1:8000/get_scripts";
    const response = await fetch(apiUrl);
    const data = await response.json();

    const savedChatsDiv = document.getElementById("savedChats");
    savedChatsDiv.innerHTML = ""; 
    if (data.length === 0) {
      savedChatsDiv.innerHTML = "<p>No saved scripts yet</p>";
      return;
    }
    data.forEach((script) => {
      const scriptDiv = document.createElement("div");
      scriptDiv.classList.add("p-3", "bg-gray-700", "rounded-lg");

      scriptDiv.innerHTML = `
              <p class="text-sm text-gray-300">${script.title}</p>
              <button class="text-blue-400 text-xs mt-1 hover:underline" onclick="viewScript(${script.id})">
                  View Script
              </button>
          `;

      savedChatsDiv.appendChild(scriptDiv);
    });
  } catch (error) {
    console.error("Error fetching saved scripts:", error);
  }
}

async function viewScript(id) {
  try {
    const apiUrl = `http://127.0.0.1:8000/get_script/${id}/`; 
    const response = await fetch(apiUrl);
    const data = await response.json();

    const chatArea = document.getElementById("chatArea");

    // Clear existing chat
    chatArea.innerHTML = "";

    // Create user response div
    const userRes = document.createElement("div");
    userRes.className = "userResponse";
    userRes.innerHTML = `<p><strong>You: </strong>${data.title}</p>`;

    // Create AI response div
    const aiRes = document.createElement("div");
    aiRes.className = "aiResponse";
    aiRes.innerHTML = `<p><strong>AI: </strong>${data.content}</p>`;

    // Append to chat area
    chatArea.append(userRes, aiRes);

    // Scroll to bottom
    scrollToBottom();
  } catch (error) {
    console.error("Error fetching script:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchSavedScripts);
