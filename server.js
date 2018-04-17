const io = require('socket.io')();
const {spawn} = require('child_process');
const ls = spawn('minimodem', ["--rx", "60"]);
var twitter = require("twitter");
var twit = new twitter(require('./config.js'));

var arrayOfStrings = [];


io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});




ls.stdout.on('data', traitDonner);
ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});
ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


function traitDonner(data) {

  if(`${data}` === "�"){
    return;
  }

  arrayOfStrings.push(`${data}`);
  console.log(arrayOfStrings);
  console.log("this is the length", arrayOfStrings.length);

  if (arrayOfStrings.length === 100) {

    var theStringToTweet = arrayOfStrings.join("");
    var theStringToTweetRegex

    twit.post('statuses/update', {status: theStringToTweet}, function(error, tweet, response) {
      if (!error) {
        console.log(tweet);

        twit.get('statuses/user_timeline', {screen_name	: 'f__n__g'}, function(err, data, response) {
          var theLastStringId = data.map(function(ele){
            return ele.id_str
          })[0]
          console.log(theLastStringId);
            io.emit("sendNewTweet", {data: theLastStringId})
            console.log("emit sent to client");
        })
      }
    });
    arrayOfStrings = [];
  }
}


const port = 8000;
io.listen(port);
console.log('listening on port ', port);
