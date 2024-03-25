// Selecting all elements with the class "accordion-item" and storing them in accordionItems array-like NodeList
const accordionItems = document.querySelectorAll(".accordion-item");

// Selecting the element with the class "accordion" and storing it in the accordion variable
const accordion = document.querySelector(".accordion");

// Checking if the "accordion" element has a "single-open" attribute and storing the result in the singleOpen variable
const singleOpen = accordion.hasAttribute("single-open");

// Initializing a variable activeAccordion to keep track of the currently active accordion item
let activeAccordion = null;

// Iterating over each accordion item in accordionItems NodeList
accordionItems.forEach((item) => {
  // Selecting the header element within the current accordion item and storing it in the header variable
  const header = item.querySelector(".accordion-header");

  // Selecting the icon element within the current accordion item and storing it in the icon variable
  const icon = item.querySelector(".icon");

  // Adding a click event listener to the header element
  header.addEventListener("click", () => {
    // Checking if singleOpen attribute is present in the accordion element
    if (singleOpen) {
      // If there is an active accordion item and it is not the same as the clicked item, remove active class and rotation from the previous active accordion item
      if (activeAccordion && activeAccordion !== item) {
        activeAccordion.classList.remove("active");
        activeAccordion.querySelector(".icon").classList.remove("rotate");
      }

      // Toggling the "active" class on the clicked accordion item
      item.classList.toggle("active");

      // Toggling the "rotate" class on the icon within the clicked accordion item
      icon.classList.toggle("rotate");

      // Updating the activeAccordion variable to the clicked item if it is active, otherwise setting it to null
      activeAccordion = item.classList.contains("active") ? item : null;
    } else {
      // If singleOpen attribute is not present, toggle the "active" class on the clicked accordion item
      item.classList.toggle("active");

      // Toggle the "rotate" class on the icon within the clicked accordion item
      icon.classList.toggle("rotate");
    }
  });
});
