// Function to handle form submission for login
const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  console.log('Logging in...'); // Add console log
  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('Redirecting to profile...'); // Add console log
      document.location.href = '/profile';
    } else if (response.status === 401) {
      alert('Incorrect email or password. Please try again.');
    }
  } catch (error) {
    console.error('Failed to log in:', error);
    alert('An error occurred. Please try again later.');
  }
};

// Function to handle click event on the signup button
const signupButtonHandler = (event) => {
  event.preventDefault();
  document.location.replace('/signup');
};

// Add event listener for signup button click
document.querySelector('#signupButton').addEventListener('click', signupButtonHandler);

// Add event listener for form submission
document.querySelector('#login').addEventListener('submit', loginFormHandler);




