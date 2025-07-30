function getWrappedPrompt(rawPrompt, model, tone) {
  let prefix = "";
  switch (model) {
    case "gpt-4":
      prefix = `You are a ${tone} assistant. Please respond thoroughly and clearly.`;
      break;
    case "claude":
      prefix = `If anything in the following is unclear, ask for clarification before responding. Use a ${tone} tone.`;
      break;
    case "grok":
      prefix = `Respond in a ${tone} tone. Prioritize relevance and clarity. Avoid sarcasm unless explicitly requested.`;
      break;
    case "mistral":
      prefix = `You are a helpful assistant. Use a ${tone} style. Avoid offensive or speculative content.`;
      break;
    default:
      prefix = `You are a helpful assistant. Use a ${tone} tone.`;
  }
  return `${prefix}\n\nUser Prompt:\n${rawPrompt}`;
}

function getWrappedPrompt(rawPrompt, model, tone, zodiac) {
  let prefix = "";
  let zodiacTone = "";

  if (zodiac) {
    const zodiacTones = {
      Aries: "direct, energetic, and assertive",
      Taurus: "steady, calm, and grounded",
      Gemini: "curious, witty, and fast-paced",
      Cancer: "empathetic, nurturing, and emotionally aware",
      Leo: "bold, charismatic, and dramatic",
      Virgo: "precise, practical, and analytical",
      Libra: "balanced, diplomatic, and charming",
      Scorpio: "intense, insightful, and emotionally deep",
      Sagittarius: "optimistic, adventurous, and philosophical",
      Capricorn: "professional, serious, and structured",
      Aquarius: "innovative, eccentric, and objective",
      Pisces: "dreamy, poetic, and emotionally intuitive"
    };
    zodiacTone = `Respond in a tone that reflects someone who is ${zodiacTones[zodiac]}.`;
  }

  switch (model) {
    case "gpt-4":
      prefix = `You are a ${tone} assistant. Be clear, accurate, and helpful.`;
      break;
    case "claude":
      prefix = `Ask for clarification if needed. Use a ${tone} tone.`;
      break;
    case "grok":
      prefix = `Use a ${tone} tone. Avoid sarcasm unless requested.`;
      break;
    case "mistral":
      prefix = `Be ${tone}, neutral, and safe. Avoid bias or sensitive topics.`;
      break;
    default:
      prefix = `You are a helpful assistant. Use a ${tone} tone.`;
  }

  return `${prefix}\n${zodiacTone}\n\nUser Prompt:\n${rawPrompt}`;
}


function handleSubmit() {
  const model = document.getElementById("modelSelect").value;
  const tone = document.getElementById("toneSelect").value;
  const zodiac = document.getElementById("zodiacSelect").value;
  const rawPrompt = document.getElementById("userPrompt").value.trim();

  const wrappedPrompt = getWrappedPrompt(rawPrompt, model, tone, zodiac);
  const isFallbackMode = (model === "grok");

  if (!rawPrompt) {
    alert("Please enter a prompt.");
    return;
  }

  if (isFallbackMode) {
    // Fallback mode (e.g., Grok): Display wrapped prompt and change button label
      document.getElementById("wrappedPromptOutput").value = wrappedPrompt;
    document.getElementById("wrappedPromptContainer").style.display = "block";
    document.getElementById("submitButton").textContent = "Translate";
  } else {
      
// API-capable mode: Also show the wrapped prompt (even though no API yet)      
    document.getElementById("wrappedPromptOutput").value = wrappedPrompt;
  document.getElementById("wrappedPromptContainer").style.display = "block";
  document.getElementById("submitButton").textContent = "Submit";

  // Optional: Still alert user that API integration isn't active yet
  alert("API integration not yet active.\n\nYou can copy and paste the wrapped prompt below.");
}

function copyWrappedPrompt() {
  const output = document.getElementById("wrappedPromptOutput");
  output.select();
  output.setSelectionRange(0, 99999); // iOS support
  navigator.clipboard.writeText(output.value).then(() => {
    alert("Wrapped prompt copied to clipboard!");
  });
}
}