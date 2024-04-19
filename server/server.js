const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require('cookie-parser'); 

app.use(cookieParser());

const corsOptions = {
    credentials: true, 
    origin: 'http://localhost:5173', 
    methods: 'GET, POST, PUT, PATCH, DELETE', 
};
app.use( cors(corsOptions));

app.use( express.json(),  express.urlencoded({ extended: true }));

require("./config/mongoose.config");
const rutes = require("./routes/user.routes")
rutes(app) 
app.listen(8000, () => console.log('Listening on port: 8000'));