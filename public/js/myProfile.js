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