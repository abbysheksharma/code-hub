document.getElementById("read-button").addEventListener("click", () => {
  const text = document.getElementById("text-input").value;
  if (text.trim() !== "") {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
  } else {
    alert("Please enter some text to read aloud.");
  }
});
