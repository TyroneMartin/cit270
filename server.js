const express= require('express');
const bodyParser = require('body-parser')
const Redis = require ('redis');
const app=express();
const { createHash } =  require('node:crypto')
const fs = require('fs')
const https = require('https')
//..
https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/archive/tyronemartin.cit270.com/privkey1.pem'), //This is a private key 
    cert: fs.readFileSync('/etc/letsencrypt/archive/tyronemartin.cit270.com/cert1.pem'),
    chain:fs.readFileSync('/etc/letsencrypt/archive/tyronemartin.cit270.com/fullchain1.pem')//This is a self-signed ceriticated.
})

const port = 443;
const redisClient = Redis.createClient({url:'redis://127.0.0.1:6379'});

app.use(bodyParser.json ());//allow json (Javascript object Notation) requests

// app.listen(port, ()=> {
//     redisClient.connect();
// console.log("listening on port: " + port)
// });

app.get("/", (req, res) => {
    res.send("Welcome to your Node Server")
    // res.resirect ("https:google.com")
}, app).listen(port, () => {
    redisClient.connect();    
    console.log('Listening...')
});

app.post('/login', async (req, res) => {
    const loginBody =req.body;
    const userName = loginBody.userName;
    const password = loginBody.password; //we need to hash the password the user gave us
    const hashedPassword = password==null? null : createHash('sha3-256').update(password).digest('hex');
    console.log("Hashed Password: " + hashedPassword);
    const redisPassword = password==null ? null : await redisClient.hGet('hashedpasswords',userName);
    console.log("Passord for " + userName + " " + redisPassword);
   
    if (password!= null && hashedPassword===redisPassword) {
        //this happens if the password is correct
        res.send ("Welcome" + userName)
    } else {
        //this happens if the password is not correct
        res.status (401); //unauthorized
        res.send("Incorrect password");
    }
});