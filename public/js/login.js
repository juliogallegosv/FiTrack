console.log('login.js')


const loginFormHandler = async (event) => {

    event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
 
  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }


  console.log(email)

   
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();


//SIGN UP
    const name = document.querySelector('#name-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
   
    if (name && username && email && password) {
      const response = await fetch('/api/users', { //CHANGE 
        method: 'POST',
        body: JSON.stringify({ name, username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/myProfile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  
  //document
    //.querySelector('.signup-form')
   //.addEventListener('submit', signupFormHandler);
  
   //document.querySelector('#sumbitButton').addEventListener('submit', loginFormHandler) 
   document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
   document.querySelector('.signup-form').addEventListener('submit', loginFormHandler); //WE HAVE TO ADD THE CLASSES TO SIGN UP