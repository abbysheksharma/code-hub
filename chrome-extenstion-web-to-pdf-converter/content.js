// Use a unique variable name or limit its scope
const bodyElement = document.body;
const opt = {
  margin: 1,
  filename: "webpage.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
};

html2pdf().from(bodyElement).set(opt).save();
