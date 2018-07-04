var creds = "tbizz22:" + pw;
var encode = btoa(creds);
var season = "2017-2018-regular";
var date = "20180101";





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
    console.log(res);
  })
}

// getLines("20171104-COL-PHI");







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
