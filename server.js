const express= require('express');
const app=express();

const port = 3000;
app.listen(port, ()=> {
console.log("listening on port: " + port)
});

app.get("/", (req, res) => {
    res.send("Welcome to your Node Server")
    // res.resirect ("https:google.com")
})

