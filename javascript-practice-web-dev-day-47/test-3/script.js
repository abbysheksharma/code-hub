// Wait for the DOM content to be fully loaded before executing any JavaScript code
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the form and error container elements in the HTML
  const form = document.getElementById("myForm"); // Get the form element by its ID
  const errorContainer = document.getElementById("errorContainer"); // Get the error container element by its ID

  // Define an array of objects representing form fields and their error elements
  const fields = [
    // Each object contains references to the input field, its corresponding error element, and an error message
    {
      input: document.getElementById("name"),
      error: document.getElementById("nameError"),
      errorMsg: "Name is required.",
    },
    // Additionally, for the email field, we include a validation function and a specific error message for invalid format
    {
      input: document.getElementById("email"),
      error: document.getElementById("emailError"),
      errorMsg: "Email is required.",
      validationFunc: isValidEmail,
      validationErrorMsg: "Invalid email format.",
    },
    // Repeat the same pattern for the password field
    {
      input: document.getElementById("password"),
      error: document.getElementById("passwordError"),
      errorMsg: "Password is required.",
    },
  ];

  // Add an event listener to the form's submit event
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Clear any existing error messages before performing validation
    clearErrors();

    // Initialize a flag to track if the form is valid
    let isValid = true;

    // Iterate over each field object in the 'fields' array
    fields.forEach((field) => {
      // Get the trimmed value of the input field
      const value = field.input.value.trim();

      // Check if the field is empty
      if (value === "") {
        // Display the corresponding error message if the field is empty
        displayError(field.error, field.errorMsg);
        // Set the 'isValid' flag to false since the form is invalid
        isValid = false;
      } else if (field.validationFunc && !field.validationFunc(value)) {
        // If a validation function is provided and the value doesn't pass validation
        displayError(field.error, field.validationErrorMsg);
        // Display the specific validation error message
        isValid = false;
      }
    });

    // If the form is not valid
    if (!isValid) {
      // Display a general error message indicating that there are validation errors
      displayError(errorContainer, "Please fix the errors above.");
    } else {
      // If the form is valid, submit the form
      form.submit();
    }
  });

  // Define a function to clear all error messages
  function clearErrors() {
    // Iterate over each field object in the 'fields' array
    fields.forEach((field) => {
      // Clear the text content of the error element associated with the field
      field.error.textContent = "";
    });
    // Clear the text content of the general error container
    errorContainer.textContent = "";
  }

  // Define a function to display an error message for a specific field
  function displayError(errorElement, message) {
    // Set the text content of the error element to the provided message
    errorElement.textContent = message;
  }

  // Define a function to validate email format
  function isValidEmail(email) {
    // Define a regular expression for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    /*
    Explanation of the regular expression:
    - ^ asserts the start of the string
    - [^\s@]+ matches one or more characters that are not whitespace or @
    - @ matches the @ symbol
    - [^\s@]+ matches one or more characters that are not whitespace or @
    - \. matches the dot (.) character
    - [^\s@]+ matches one or more characters that are not whitespace or @
    - $ asserts the end of the string
    */

    // Return true if the email matches the regex pattern, false otherwise
    return emailRegex.test(email);
  }
});
