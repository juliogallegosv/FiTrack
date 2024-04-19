const aboutFormHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#user-description').value.trim();
    const units = document.querySelector('#units').value ? true : false;
    const gender = document.querySelector('#user-gender').value.trim();
    const country = document.querySelector('#user-country').value.trim();
    

    if (description && gender && country) {
      console.log(description)
      const response = await fetch(`/api/user/`, { //CHECK IF CORRECT
        method: 'PUT',
        body: JSON.stringify({ description, units, gender, country}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)

      if (response.ok) {
        //document.location.replace('/');
      } else {
        alert('About section filled incorrectly');
      }
    }
  };
  
  document
    .querySelector('#about')
    .addEventListener('submit', aboutFormHandler);
  
  
  