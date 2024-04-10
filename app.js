require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');

// middleware to parse body
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    console.log('request received');
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.write("hello there");
  res.end();
});


app.post("/info", (req, res) => {
  console.log(req.body);
  console.log(req.url);
  res.writeHead(201, {
    "Content-Type": "text/plain"
  });
  fs.appendFile('infodb.json', `${JSON.stringify(req.body)}`, (err, data)=>{
    if (err) {
        console.log(`error occurred while appending data: ${err}`);
    }
    console.log(`data inserted successfully`);
  });
  res.end("data inserted");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
