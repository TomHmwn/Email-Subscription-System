const express = require('express') 
const app = express();
const exphbs = require('express-handlebars')
require('./models/index.js')

app.use(express.json())  // replaces body-parser
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public')) // define where static assets live


app.engine('hbs', exphbs({
  defaultlayout: 'main',
  extname: 'hbs'
}))

app.set('view engine', 'hbs')

// set up subscriber routes
const subscriberRouter = require('./routes/subscriberRouter')

// set up form routes
const formRouter = require('./routes/formRouter')

// GET home page
app.get('/', (req, res) => {
    console.log('connected')
    res.render('index')
  })

// GET form page
app.use('/form', formRouter)

// Handle subscriber-management requests
// the author routes are added onto the end of '/subscriber-management'
app.use('/subscriber-management', subscriberRouter)


app.all('*', (req, res) => {  // 'default' route to catch user errors
	res.status(404).render('error', {errorCode: '404', message: 'That route is invalid.'})
})

const port = process.env.PORT || 3000

app.listen(port, () => { 
    console.log('The library app is listening on port', port) 
})


"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
