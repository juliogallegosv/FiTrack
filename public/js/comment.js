const aboutFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector("#content").value.trim();

    if (content) {
      const response = await fetch(`/api/comment/`, {
        method: 'POST',
        body: JSON.stringify({content}),
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