// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { emailUser, emailPass } = require('./config/email.Config'); // Import email configuration
const sequelize = require ("./config/conection.js")
const routes = require ('./controllers')
const path = require('path')
const exphbs = require('express-handlebars'); // Import express-handlebars

const app = express();

// Set up Handlebars view engine
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (e.g., CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


//* ROUTES

// Home (login) route
app.get('/', (req, res) => {
  res.render('login'); // Render the login view
});

// Login screen route
app.get('/login', (req, res) => {
  res.render('login'); // Render the login view
});

// Sign up route
app.get('/signup', (req, res) => {
  res.render('signup'); // Render the signup view
});

// About you route
app.get('/about', (req, res) => {
  res.render('about'); // Render the about view
});

// Home feed route
app.get('/feed', (req, res) => {
  res.render('feed'); // Render the home feed view
});

// Profile/dashboard route
app.get('/profile', (req, res) => {
  res.render('myProfile'); // Render the profile/dashboard view
});

// Add Post route
app.get('/create', (req, res) => {
  res.render('create'); // Render the add post view
});

// View other users profiles route
app.get('/profile/:id', (req, res) => {
  // Retrieve the ID from the URL params
  const id = req.params.id;
  // Render the view other profile view with the specific ID
  res.render('profile', { id: id });
});

// View following route
app.get('/following', (req, res) => {
  res.render('following'); // Render the view following view
});

// View followers route
app.get('/followers', (req, res) => {
  res.render('followers'); // Render the view followers view
});

// About you (edit) route
app.get('/aboutEdit', (req, res) => {
  res.render('aboutEdit'); // Render the about you (edit) view
});

// Define a route for sending emails
app.post('/send-email', (req, res) => {
  const { recipient, subject, firstName, lastName } = req.body;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser, // Use the imported email user
      pass: emailPass // Use the imported email password
    }
  });

  // Construct personalized email content
  let mailOptions = {
    from: emailUser,
    to: recipient,
    subject: `Welcome to FiTrack!`, // Personalized subject
    html: `
      <h1>Hello, ${firstName} ${lastName}!</h1>
      <p>Thank you for creating a FiTrack account! We hope you get the most of the app and feel inspired in every step of your journey</p>
      <p>Welcome again to the <b>FiTrack</b> family, happy training!</p>
      <h2>🚵‍♀️ 🏊‍♂️ 🏃‍♂️</h2>
    `
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT}`));
});
