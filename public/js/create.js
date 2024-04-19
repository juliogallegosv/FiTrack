const createFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    //const sport = document.querySelector("#sport").value.trim();
    const duration = document.querySelector("#duration").value.trim();
    const distance = document.querySelector("#distance").value.trim();

    if (title && duration && distance) {
      const response = await fetch(`/api/post/`, {
        method: 'POST',
        body: JSON.stringify({ title, duration, distance}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('About section filled incorrectly');
      }
    }
  };
  
  document
    .querySelector('#create')
    .addEventListener('submit', createFormHandler);