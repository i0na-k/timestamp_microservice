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
  var obj = {};
  var query = req.url;
  var date = new Date();
  
  // clean the str to contain no whitespace chars and slashes
  query = query.replace(/\W+/g, "");
  
  console.log(query);
  var num = parseInt(query);
  console.log(num);
  
  // if query can be converted to num its unix, if not its natural
  if (isNaN(num)){
      console.log('Probably natural date');
    var naturalTime = new Date(query);
    var unixTime = new Date();
    obj = {natural: naturalTime, unix: unixTime};
    res.send(obj);
      
  }
  else { 
    console.log('Convert to unix');
    console.log(new Date(query));
  }
  
  res.end(query);
})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

app.listen(3010);

