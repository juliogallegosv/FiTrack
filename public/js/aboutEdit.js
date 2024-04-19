const aboutFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#user-description').value.trim();
    const units = document.querySelector('#units').value.trim();
    const gender = document.querySelector('#user-gender').value.trim();
    const country = document.querySelector('#user-country').value.trim();
    

    if (description && units && gender && country) {
      const response = await fetch(`/api/about`, { //CHECK IF CORRECT
        method: 'POST',
        body: JSON.stringify({ description, units, gender, country}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  



      if (response.ok) {
        document.location.replace('/about');
      } else {
        alert('About section filled incorrectly');
      }
    }
  };

  document
    .querySelector('.about-form')
    .addEventListener('submit', aboutFormHandler);
  
  
  