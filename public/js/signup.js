const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && username && email && password) {
    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ name, username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Redirect to the '/about' view upon successful signup
        document.location.replace('/about');
        // Send an email to the user
        sendWelcomeEmail(email, name);
      } else {
        const errorMessage = await response.text();
        displayErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
      const errorMessage = 'An error occurred. Please try again later.';
      displayErrorMessage(errorMessage);
    }
  } else {
    const errorMessage = 'Please fill in all the fields.';
    displayErrorMessage(errorMessage);
  }
};

const displayErrorMessage = (message) => {
  const existingErrorMessage = document.querySelector('.error-message');
  if (existingErrorMessage) {
    existingErrorMessage.textContent = message;
  } else {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('error-message');
    errorMessageElement.textContent = message;
    const signupForm = document.querySelector('#signup');
    signupForm.parentNode.insertBefore(errorMessageElement, signupForm);
  }
};

// Function to send a welcome email to the user
const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      body: JSON.stringify({ recipient: email, firstName: name }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      console.error('Failed to send email:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

document.querySelector('#signup').addEventListener('submit', signupFormHandler);
