document.getElementById("convertButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "convertToPDF" }, (response) => {
    console.log(response.status);
  });
});
