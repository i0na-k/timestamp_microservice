// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.use("/", (req,res) =>{
  var query = JSON.stringify(req.url);
  
  if (query.includes(/^[a-z]+$/i)){
      console.log('Probably unix date');
  }
  else { 
    console.log('Convert to natural');
  }
  var string = query.replace(/\d+% ?/g, "");
  console.log(JSON.stringify(string));
  res.end(query);
})

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
]

app.get("/dreams", (request, response) => {
  response.send(dreams)
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

app.listen(3010);

