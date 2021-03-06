var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");

//var db = require("./models");

var PORT = 3001;


var app = express();

console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the Reddit website:" +
            "\n******************************************\n");

// Making a request via axios for `nhl.com`'s homepage
axios.get("https://www.reddit.com/").then(function(response) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(response.data);

  // Empty array to save our scraped datanode
  var results = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $("h2").each(function(i, element) {

    // Save the text of the h4-tag as "title"
    var title = $(element).text();

    // Find the h4 tag's parent a-tag, and save it's href value as "link"
    var link = $(element).parent().attr("href");

    // Make an object with data we scraped for this h4 and push it to the results array
    results.push({
      title: title,
      link: link
    });
  });

  // After looping through each h4.headline-link, log the results
  console.log(results);
});


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});