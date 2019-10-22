const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const passport = require("passport");
const profile = require("./routes/api/profile");
const item = require("./routes/api/item");
const wishlist = require("./routes/api/wishlist");
const cart = require("./routes/api/cart");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

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


// Initialize gfs
let gfs;

mongoose.connection.once("open", () => {
  // Initialise gfs stream
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage objects
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// POST route /loads form
app.post("/upload", upload.single("file"), (req, res) => {
  console.log({ file: req.file });
});

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// Use Routing
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/item", item);
app.use("/api/wishlist", wishlist);
app.use("/api/cart", cart);

// listening app on a specified port
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
