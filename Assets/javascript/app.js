


var creds = token + ":" + pw;
var encode = btoa(creds);
var season = "2017-2018-regular";
var date = "20180109";


 getDailySched();


function getDailySched() {
  var url = "https://api.mysportsfeeds.com/v1.2/pull/nhl/"
  var qURL = url + season + "/daily_game_schedule.json?fordate=" + date;
  console.log(qURL)
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
      var htImg = getLogo(homeID);
      var awayTeam = games[i].awayTeam.Name;
      var awayCity = games[i].awayTeam.City;
      var awayID = games[i].awayTeam.ID;
      var awayAbbrv = games[i].awayTeam.Abbreviation;
      var atImg = getLogo(awayID);
      var arena = games[i].location;
      var startTime = games[i].time;
      var gameID = date +"-"+ awayAbbrv + "-" + homeAbbrv;
      // console.log(gameID)
      
    // main list item 
    var li = $("<li>");
    var ch = $("<div>");
    ch.addClass("collapsible-header");
    
    var cont = $("<div>");
    cont.addClass("container");
    
    var row1 = $("<div>");
    row1.addClass("row center-align");
    
    var ht = $("<img>");
    ht.addClass("img-responsive");
    ht.attr("src",htImg);

    var vs = $("<span>")
    vs.addClass("flow-text vertical-center")
    vs.text("vs.")

    var at =  $("<img>");
    at.addClass("img-responsive");
    at.attr("src",atImg);

    row1.append(ht);
    row1.append(vs);
    row1.append(at);

    var row2 = $("<div>");
    row2.addClass("row");

    var timediv = $("<div>")
    timediv.addClass("col-12 center-align");

    var timebody = $("<div>")
    timebody.addClass("flow-text");
    timebody.text("Local Start Time: ")

    var span = $("<span>")
    span.text(startTime);
    timebody.append(span);


    // collapsible section

    var cb = $("<div>");
    cb.addClass("collapsible-body");
    

    var a = $("<div>");
    a.addClass("center-align flow-text");
    a.text(arena)
    cb.append(a);

    var sep = $("<div>");
    sep.addClass("divider");
    cb.append(sep);

    var buttonDiv = $("<div>");
    buttonDiv.addClass("center-align pt");
    cb.append(buttonDiv);

    var button = $("<a>")
    button.addClass("waves-green white black-text btn-large center-align")
    button.attr("data-gameID",gameID);
    button.text("View Game Companion");

    buttonDiv.append(button);

    var chev = $("<i>")
    chev.addClass("material-icons right");
    chev.text("chevron_right");
    button.append(chev);
    




    // put it together
    timediv.append(timebody)

    row2.append(timediv)
    cont.append(row1);
    cont.append(row2);
    
    ch.append(cont);
   
    li.append(ch);
    li.append(cb);
    $("#games").append(li);



    }
  })
}

// getLines("20180107-NJD-NYI");




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
    // console.log(res);
  })
}




var teams = {
  29: "Assets/images/ducks.gif",
  30:"Assets/images/coyotes.gif",
  11:"Assets/images/bruins.gif",
  15:"Assets/images/sabres.gif",
  23:"Assets/images/flames.gif",
  3:"Assets/images/hurricanes.gif",
  20:"Assets/images/blackhawks.gif",
  22:"Assets/images/avalanche.gif",
  19:"Assets/images/bluejackets.gif",
  27:"Assets/images/stars.gif",
  16:"Assets/images/redwings.gif",
  24:"Assets/images/oilers.gif",
  4:"Assets/images/panthers.gif",
  28:"Assets/images/kings.gif",
  25:"Assets/images/wild.gif",
  14:"Assets/images/canadiens.gif",
  18:"Assets/images/predators.gif",
  7:"Assets/images/devils.gif",
  8:"Assets/images/islanders.gif",
  9:"Assets/images/rangers.gif",
  13:"Assets/images/senators.gif",
  6:"Assets/images/flyers.gif",
  10:"Assets/images/penguins.gif",
  26:"Assets/images/sharks.gif",
  17:"Assets/images/blues.gif",
  1:"Assets/images/lightning.gif",
  12:"Assets/images/mapleleafs.gif",
  21:"Assets/images/canucks.gif",
  142:"Assets/images/goldenknights.gif",
  5:"Assets/images/capitals.gif",
  2:"Assets/images/jets.gif"
};


function getLogo(id) {
  var path = teams[id]
  return path;
}



