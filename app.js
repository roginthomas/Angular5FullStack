//apath is the core Module we don't install it 
//We are bringing all our Dependencies 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require ('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');//Bringing users.js file  from Route folder 



//connect to Mongoose 
mongoose.connect(config.database);

//On Connect to Database 
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error : ' + err);
});


//initialising express 
const app = express();

//cours Middle ware  is allowing us to make api calls from different domain name 
app.use(cors());

//Set Static Folder that will communicate with our Angular App
app.use(express.static(path.join(__dirname, 'public')));


//bodyParser Middle ware  it parsing incoming request from the form 
app.use(bodyParser.json());

//Passport 
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//anything that is on localhost:300/users/xxx will go on that file 
app.use('/users', users);

//  defining our port 
const port = 3000;

//route 
app.get('/', (req, res)=>{
    res.send('Invalid Endpoint');
})

//any other route will be sent here 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
})

// starting out Server
app.listen(port, () =>{
    console.log('Server is started on port : ' + port);
})