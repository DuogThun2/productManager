const express = require("express");
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('express-flash');

const app = express();

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({secret: 'secretKey', cookie: { maxAge: 3000 }}));
app.use(flash());

// Using pug
app.set("views", "views");
app.set("view engine", "pug");

// Declare public directory
app.use(express.static("public"));

// Declare .env
require('dotenv').config();

const port = process.env.PORT;

// Initials local variable
const prefix = require("./config/prefix");
app.locals.prefixAdmin = prefix.prefixAdmin;


// Connect database
const database = require("./config/database");
database.connect();

// Import router
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

// Using router
routeClient(app);
routeAdmin(app);


app.listen(port, (req, res) => {
    console.log(`Mở tại cổng ${port}`);
});