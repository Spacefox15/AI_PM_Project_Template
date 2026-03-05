// ============================================================
// app.js — Core application logic
// Replace [PROJECT NAME] and customize the prompt below
// ============================================================

// --- CONFIG ---
const CONFIG = {
  model: "claude-sonnet-4-20250514",
  max_tokens: 1000,
  apiEndpoint: "https://api.anthropic.com/v1/messages"
};

// --- SYSTEM PROMPT ---
// This is where your PM thinking lives. Edit this carefully.
const SYSTEM_PROMPT = `You are a helpful assistant for [PROJECT NAME].

Your job is to [describe the task clearly].

Always respond in valid JSON using this exact format:
{
  "summary": "string",
  "items": [
    { "title": "string", "description": "string", "priority": "high|medium|low" }
  ],
  "next_steps": ["string"]
}

Do not include any text outside the JSON object.`;

// --- API CALL ---
async function callClaude(userInput) {
  const apiKey = document.getElementById("apiKey")?.value;

  if (!apiKey) {
    showError("Please enter your Anthropic API key.");
    return null;
  }

  if (!userInput || userInput.trim() === "") {
    showError("Please provide some input first.");
    return null;
  }

  showLoading(true);

  try {
    const response = await fetch(CONFIG.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: CONFIG.model,
        max_tokens: CONFIG.max_tokens,
        system: SYSTEM_PROMPT,
        messages: [
          { role: "user", content: userInput }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text || "";

    // Parse the JSON response
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return parsed;

  } catch (err) {
    showError(`Something went wrong: ${err.message}`);
    return null;
  } finally {
    showLoading(false);
  }
}

// --- RENDER OUTPUT ---
function renderResults(data) {
  const output = document.getElementById("output");
  if (!output || !data) return;

  output.innerHTML = `
    <div class="result-card">
      <h2>Summary</h2>
      <p>${data.summary}</p>

      <h2>Items</h2>
      <ul>
        ${data.items.map(item => `
          <li class="priority-${item.priority}">
            <strong>${item.title}</strong> — ${item.description}
            <span class="badge">${item.priority}</span>
          </li>
        `).join("")}
      </ul>

      <h2>Next Steps</h2>
      <ol>
        ${data.next_steps.map(step => `<li>${step}</li>`).join("")}
      </ol>
    </div>
  `;
}

// --- UI HELPERS ---
function showLoading(isLoading) {
  const btn = document.getElementById("submitBtn");
  const loader = document.getElementById("loader");
  if (btn) btn.disabled = isLoading;
  if (loader) loader.style.display = isLoading ? "block" : "none";
}

function showError(message) {
  const errorDiv = document.getElementById("errorMsg");
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    setTimeout(() => { errorDiv.style.display = "none"; }, 5000);
  }
}

// --- EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      const userInput = document.getElementById("userInput")?.value;
      const result = await callClaude(userInput);
      if (result) renderResults(result);
    });
  }
});
