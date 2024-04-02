// Wait for the DOM content to be fully loaded before executing any JavaScript code
document.addEventListener("DOMContentLoaded", function () {
  // Select elements by their IDs
  const counterElement = document.getElementById("counter"); // Get the counter element
  const incrementBtn = document.getElementById("incrementBtn"); // Get the increment button element
  const decrementBtn = document.getElementById("decrementBtn"); // Get the decrement button element

  // Initial count value
  let count = 0;

  // Update the counter display
  function updateCounter() {
    counterElement.textContent = count; // Update the text content of the counter element with the current count
  }

  // Increment count when increment button is clicked
  incrementBtn.addEventListener("click", function () {
    count++; // Increment the count
    updateCounter(); // Update the counter display
  });

  // Decrement count when decrement button is clicked
  decrementBtn.addEventListener("click", function () {
    count--; // Decrement the count
    updateCounter(); // Update the counter display
  });

  // Initial counter display
  updateCounter(); // Display the initial count value
});
