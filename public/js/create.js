const aboutFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#user-description').value.trim();
    const units = document.querySelector('#units').value ? true : false;
    const gender = document.querySelector('#user-gender').value.trim();
    const country = document.querySelector('#user-country').value.trim();

    const title = document.querySelector("#title").value.trim();
    const sport = document.querySelector("#sport").value.trim();
    const duration = document.querySelector("#duration").value.trim();
    const distance = document.querySelector("#distance").value.trim();

    if (title && sport && duration && distance) {
      const response = await fetch(`/api/post/`, {
        method: 'POST',
        body: JSON.stringify({ title, sport, duration, distance}),
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
    .querySelector('#about')
    .addEventListener('submit', aboutFormHandler);