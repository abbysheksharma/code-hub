chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "convertToPDF") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ["html2pdf.min.js", "content.js"],
        },
        () => sendResponse({ status: "done" })
      );
    });
    return true; // Will respond asynchronously.
  }
});
