// First, we select all the tab button elements and all the tab pane elements
// using the querySelectorAll method, which returns a NodeList
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanes = document.querySelectorAll(".tab-pane");

// We define a function called showTab that takes an index parameter
function showTab(index) {
  // Inside the function, we first remove the 'active' class
  // from all tab buttons and all tab panes
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabPanes.forEach((pane) => pane.classList.remove("active"));

  // Then, we add the 'active' class to the button and pane
  // at the specified index
  tabButtons[index].classList.add("active");
  tabPanes[index].classList.add("active");
}

// Next, we loop through each tab button using the forEach method
tabButtons.forEach((btn, index) => {
  // For each button, we add a click event listener
  btn.addEventListener("click", () => {
    // Inside the event listener function, we call the showTab function
    // and pass the index of the clicked button
    showTab(index);
  });
});

// Finally, we call the showTab function with an index of 0
// to show the first tab by default when the page loads
showTab(0);
