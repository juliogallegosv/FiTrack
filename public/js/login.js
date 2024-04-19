// Function to handle form submission for login
const loginFormHandler = async (event) => {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get the values entered by the user for email and password
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both email and password are provided
  if (email && password) {
    try {
      // Send a POST request to the login endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // If the response is ok, redirect to the home page
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        // If the response is not ok, display an error message
        const errorMessage = await response.text();
        displayErrorMessage(errorMessage);
      }
    } catch (error) {
      // If an error occurs during login, log it and display a generic error message
      console.error('Failed to log in:', error);
      const errorMessage = 'An error occurred. Please try again later.';
      displayErrorMessage(errorMessage);
    }
  } else {
    // If email or password is not provided, display an error message
    const errorMessage = 'Please enter both email and password.';
    displayErrorMessage(errorMessage);
  }
};

// Function to handle click event on the signup button
const signupButtonHandler = () => {
  // Redirect to the signup page
  document.location.href = '/signup';
};

// Add event listeners for form submission and signup button click
document.querySelector('#login').addEventListener('submit', loginFormHandler);
document.querySelector('#signupButton').addEventListener('click', signupButtonHandler);
