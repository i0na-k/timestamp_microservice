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
  
  query = decodeURI(query);
  query = query.replace('/',"");
  console.log(query);
  
  var checkDate = Date.parse(query);
  var _date = new Date(checkDate);
  var naturalTime = new Date(query);
  
  if (isNaN(checkDate)){
    obj = {natural:null, unix: null};
    res.send(JSON.stringify(obj));
    console.log('Null sent back');
    return;
  }
  
  // if query can be converted to num its unix, if not its natural
  else if (isNaN(query)){
    console.log('Probably natural date');
    var unixTime = (_date.getTime()/1000);
    console.log('****', _date.getTime()/1000);
    
    obj = {natural: query, unix: unixTime};
    res.send(obj);
      
  }
  else { 
    console.log('Convert to unix');
    obj = {natural: naturalTime, unix: unixTime};
    res.send(JSON.stringify(obj));
  }
  

})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

app.listen(3010);

