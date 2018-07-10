// i can either duplicate these values here, or store them in a new settings file, or unhide app.js on gamedetails.html
var creds = token + ":" + pw;
var encode = btoa(creds);
var season = "2017-2018-regular";


var gameID;

$(document).ready(function () {
    var URL = window.location.href;
    gameID = getAllUrlParams(URL).gameid
    console.log(gameID);
    getLines(gameID);
})



function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
            // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
}








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


        hideLoader();
    })
}

function hideLoader() {
$("#loader").hide();
}


// this needs to handle multiple dynamically created cards. 
$("#card").flip({
    axis: 'y',
    trigger: 'click'
  });