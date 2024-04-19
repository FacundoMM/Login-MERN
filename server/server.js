const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require('cookie-parser'); // to be able to read cookies

app.use(cookieParser());

const corsOptions = {
    credentials: true, // Allow credentials (cookies) to be sent to/from origin
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET, POST, PUT, PATCH, DELETE', // Allow these methods
};
app.use( cors(corsOptions));

app.use( express.json(),  express.urlencoded({ extended: true }));

require("./config/mongoose.config");
const rutes = require("./routes/user.routes")
rutes(app) 
app.listen(8000, () => console.log('Listening on port: 8000'));