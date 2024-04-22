document.querySelector(`#createBtn`).addEventListener('click', (event) => {
    event.preventDefault();

    document.location = `/create`;
});

document.querySelector(`#logoutBtn`).addEventListener('click', async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/user/logout`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    });

    if (response.ok) {
        document.location = '/login';
    }
});

// Function to handle click event on the signup button
const aboutEdit = (event) => {
    event.preventDefault();
    document.location.replace('/aboutedit');
  };

  // Add event listener for signup button click
document.querySelector('#aboutYouBtn').addEventListener('click', aboutEdit);