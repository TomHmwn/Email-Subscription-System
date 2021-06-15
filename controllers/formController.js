const subscriberRouter = require("../routes/subscriberRouter")

const subscriber = require("../models/subscriber.js")
const nodemailer = require("nodemailer")
const { getMaxListeners } = require("../models/subscriber.js")


const sendMail = async (newSub)=>{

    let lstOfSubs = await subscriber.find()
    let countSub = lstOfSubs.length
    let htmlTableData = "<table><tr><th>Number of people subscribed</th><td>"+countSub+"</td><tr/><tr><th>email</th><td>"+newSub.email+"</td><tr/><tr><th>name</th><td>"+newSub.name+"</td><tr/><tr><th>phone</th><td>"+newSub.phone+"</td> <tr/><tr><th>PDF flyer</th><td>"+newSub.pdf+"</td><tr/><tr><th>videos</th><td>"+newSub.videos+"</td><tr/><tr><th>links</th><td>"+newSub.link+"</td><tr/><tr><th>events</th><td>"+newSub.event+"</td><tr/><table/>"
  

    let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "tom213931@gmail.com", // generated ethereal user
      pass: "justinchua", // generated ethereal password
    },
  })
    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
        console.log(error);
        } else {
        console.log("Server is ready to take our messages");
        }
    });
  
        // send mail with defined transport object
    let infoJustin = await transporter.sendMail({
        from: '"thomas himawan " <tom213931@gmail.com>', // sender address
        to: "thomashmwn@gmail.com", // list of receivers
        subject: "Subscription to Marketing Company", // Subject line
        text: "tally of subscribers and details of the new subscriber", // plain text body
        html: htmlTableData, // html body
    })

    console.log("Message sent: %s", infoJustin.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(infoJustin));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"thomas himawan " <tom213931@gmail.com>', // sender address
    to: "thomashmwn@gmail.com",//newSub.email, // list of receivers
    subject: "Welcome New Subscriber", // Subject line
    text: "Congratulations! You have successfully subscribed to Marketing Company", // plain text body
    html: "", // html body

  })

}

// handle request for subcription form
const getSubscriptionForm =  (req, res) => {
    
    res.render('form') // send form to browser
}

// handle response for subcription confirmation
const postConfirmSubscription = async (req, res) => {
    console.log(req.body)
    
    try{
        const newSub = new subscriber(req.body) // construct a new subscriber object from body of POST
        
        sendMail(newSub)
        
        let result = await newSub.save()
        
        return res.render('formConfirm') // send confirmation to browser
    }catch (err) {   // error detected
        console.log(err)
        res.status(400)
        return res.send("Database insert failed")
    }
}
module.exports = {
    getSubscriptionForm,postConfirmSubscription
    }