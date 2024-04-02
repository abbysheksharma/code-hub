// Wait for the DOM content to be fully loaded before executing any JavaScript code
document.addEventListener("DOMContentLoaded", function () {
  // Select the button element by its ID
  const changeColorBtn = document.getElementById("changeColorBtn");

  // Add a click event listener to the button
  changeColorBtn.addEventListener("click", function () {
    // Generate random RGB color values
    // Math.random() generates a random floating-point number between 0 (inclusive) and 1 (exclusive)
    // We multiply it by 256 to scale it to the range [0, 256)
    // Math.floor() rounds the number down to the nearest integer, ensuring we get whole numbers
    const randomRed = Math.floor(Math.random() * 256); // Generate a random value for the red component
    const randomGreen = Math.floor(Math.random() * 256); // Generate a random value for the green component
    const randomBlue = Math.floor(Math.random() * 256); // Generate a random value for the blue component

    // Construct the RGB color string using template literals
    const randomColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;

    // Change the background color of the body to the randomly generated color
    document.body.style.backgroundColor = randomColor;
  });
});
