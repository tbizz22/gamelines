var creds = "tbizz22:" + pw;
var encode = btoa(creds);
var season = "2017-2018-regular";
var date = "20180107";


// getDailySched();


function getDailySched() {
  var url = "https://api.mysportsfeeds.com/v1.2/pull/nhl/"
  var qURL = url + season + "/daily_game_schedule.json?fordate=" + date;
  
  $.ajax({
    type: "GET",
    url: qURL,
    dataType: "json",
    async: false,
    headers: {
      "Authorization": "Basic " + encode
    }
  }).then(function (res) {
    var games = res.dailygameschedule.gameentry;
    console.log(games);

    for (var i=0; i < games.length; i++) {
      var homeTeam = games[i].homeTeam.Name;
      var homeCity = games[i].homeTeam.City;
      var homeID = games[i].homeTeam.ID;
      var homeAbbrv = games[i].homeTeam.Abbreviation;
      var awayTeam = games[i].awayTeam.Name;
      var awayCity = games[i].awayTeam.City;
      var awayID = games[i].awayTeam.ID;
      var awayAbbrv = games[i].awayTeam.Abbreviation;
      var arena = games[i].location;
      var startTime = games[i].time;
      var gameID = date +"-"+ awayAbbrv + "-" + homeAbbrv;
      console.log(gameID)
      




    }
  })
}

//getLines("20180107-NJD-NYI");




$(document).ready(function(){
  $('.collapsible').collapsible();
});
     
$(document).ready(function(){
  $('.parallax').parallax();
});


function getLines(gameID) {
  var url = "https://api.mysportsfeeds.com/v1.2/pull/nhl/"
  var qURL = url + season + "/game_startinglineup.json?gameid=" + gameID;

  $.ajax({
    type: "GET",
    url: qURL,
    dataType: "json",
    async: false,
    headers: {
      "Authorization": "Basic " + encode
    }
  }).then(function (res) {
    console.log(res);
  })
}
