require('dotenv').config()
const mongoose = require("mongoose")


// login details retrieved from environment variables
connectionString = "mongodb+srv://<username>:<password>@cluster0.werc7.mongodb.net/EmailSubscriptionWeb?retryWrites=true&w=majority"
dbAddress = connectionString.replace("<username>",process.env.MONGO_USERNAME).replace("<password>",process.env.MONGO_PASSWORD)

console.log(dbAddress)
mongoose.connect( dbAddress, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "EmailSubscriptionWeb"
  })
  
  const db = mongoose.connection

  db.on("error", err => {
    console.error(err);
    process.exit(1)
  })

db.once("open", async () => {
  console.log("Mongo connection started on " + db.host + ":" + db.port)
})

require('./subscriber')