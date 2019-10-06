const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const passport = require("passport");
const profile = require("./routes/api/profile");
const item = require("./routes/api/item");

// init app
const app = express();

// using bodyParser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// creating database connection
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(res => {
    console.log("Database connected successfully!");
  })
  .catch(err => {
    console.log(err);
  });

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// Use Routing
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/item", item);

// listening app on a specified port
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
