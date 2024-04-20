const aboutFormHandler = async (event) => {
  event.preventDefault();

  const description = document.querySelector('#user-description').value.trim();
  const units = document.querySelector('#units').value ? true : false;
  const gender = document.querySelector('#user-gender').value.trim();
  const country = document.querySelector('#user-country').value.trim();

  if (description && gender && country) {
    try {
      const response = await fetch('/api/user/about', {
        method: 'PUT',
        body: JSON.stringify({ description, units, gender, country }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to the '/profile' view upon successful form submission
        document.location.replace('/profile');
      } else {
        const errorMessage = await response.text();
        alert(errorMessage); // Display error message
      }
    } catch (error) {
      console.error('Failed to update user info:', error);
      alert('An error occurred. Please try again later.'); // Display generic error message
    }
  } else {
    alert('Please fill in all the fields.'); // Display validation error message
  }
};

document.querySelector('#about').addEventListener('submit', aboutFormHandler);

// Event listener for "Finish Later" button
document.querySelector('.about-form').addEventListener('click', () => {
  document.location.href = '/profile';
});
