// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { emailUser, emailPass } = require('./config/email.Config'); // Import email configuration
const sequelize = require ("./config/conection.js")
const routes = require ('./controllers')
const path = require('path')
const exphbs = require('express-handlebars'); // Import express-handlebars
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

// Set up Handlebars view engine
const hbs = exphbs.create({
    helpers: {
        formatTime(date) { return date.toLocaleDateString() }
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//Authentication
app.use(session({
    secret: "shouldreallychangethistoa.envvar",
    store: new SequelizeStore({
        db: sequelize,
    }),
    resave: false,
    proxy: true,
    saveUninitialized: true
}));

// Body parser middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (e.g., CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


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
