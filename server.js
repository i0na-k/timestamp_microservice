// server.js
// where your node app starts
var moment = require('moment');

// init project
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('views'));
app.use("/", (req,res) =>{
  var obj = {};
  var query = req.url;
  var date = new Date();
  var html = '<body style="background-color:purple";>'+'<h1 style="color:DarkTurquoise";>';
  query = decodeURI(query);
  query = query.replace('/',"");
  console.log('--->',query);
  
  
  var checkDate = Date.parse(query);
  var queryToInt = Math.round(query);
  var _unixDate = new Date(queryToInt);
  var _naturalDate = new Date(query);
  
  function isInt(value) {
  var x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
  }
  
  if (isNaN(checkDate) && !isInt(query)){
    obj = {natural:null, unix: null};
    res.send( html + JSON.stringify(obj) + '</h1>');
    // res.send(JSON.stringify(obj));
    
    console.log('Null sent back');
    return;
  }
  
  // if query can be converted to num its unix, if not its natural
  else if (isNaN(query)){
    console.log('Natural date');
    var unixTime = Math.round((_naturalDate.getTime()/1000));
    
    obj = {natural: query, unix: unixTime};
    res.send(html + JSON.stringify(obj) + '</h1>');
      
  }
  else { 
    console.log('Unix');
    var naturalTime = moment.unix(query).format('MMMM Do YYYY');
    obj = {natural: naturalTime, unix: query};
    res.send(html + JSON.stringify(obj) + '</h1>');
  }
  

})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

app.listen(3010);

