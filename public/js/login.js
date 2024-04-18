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
  
  
  
  //document
    //.querySelector('.signup-form')
   //.addEventListener('submit', signupFormHandler);
  
   //document.querySelector('#sumbitButton').addEventListener('submit', loginFormHandler) 
   document.querySelector('#login').addEventListener('submit', loginFormHandler);