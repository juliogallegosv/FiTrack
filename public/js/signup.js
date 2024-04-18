
  const signupFormHandler = async (event) => {
    event.preventDefault();


//SIGN UP
    const name = document.querySelector('#name-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
   
    if (name && username && email && password) {
      const response = await fetch('/api/user/signup', { //CHANGE 
        method: 'POST',
        body: JSON.stringify({ name, username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/about');
      } else {
        alert(response.statusText);
      }
    }
  };

   document.querySelector('#signup').addEventListener('submit', signupFormHandler); //WE HAVE TO ADD THE CLASSES TO SIGN UP