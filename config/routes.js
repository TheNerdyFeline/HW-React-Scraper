var express = require('express');
var router  = express.Router();
var mongojs = require("mongojs");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// require models
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");
var dupArt, newArt;

// load homepage
router.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// query nyt
/*router.get("/api/scrape", function(req, res) {
    console.log("routes running: ", req.body.topic);
    if(topic === undefined || start === undefined || end === undefined) {
	console.log("empty search parameters");
    } else {	
	
	// Figure out the geolocation
	const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + $.param({
	    'api-key': apiKey,
	    'q': topic,
	    'begin_date': start,
	    'end_date': end
	});
	console.log(queryURL);
	return axios.get(queryURL).then(function(response) {
	    // If get get a result, return that result's formatted address property
	    if (response.data.results[0]) {
		console.log(response);
		res.send(response);
		//return response.data.results[0].formatted;
	    }
	    // If we don't get any results, return an empty string
	    return "";
	}).catch(function(err) {
		console.log(err);
	});
	
    }
    
});*/

// save article to db
router.post("/api/saved", function(req, res) {
    Article.findOne({title : req.body.title}, function(err, found) {
	console.log("articles found are " + found);
	if(found === null) {
	    dupArt = false;
	    newArt = {
		"title": req.body.title,
		"link": req.body.link
	    };
	    saveArt(newArt);
	    res.redirect("/savedArt");
	    console.log("article saved");
	} else {
	    dupArt = false;
	    console.log("Article already saved.");
	}
    });
});

// if not already in db save article to db
function saveArt(article) {
    if(dupArt === false) {
	console.log("new article saved: ", newArt);
	var entry = new Article(article);
	entry.save(function(err, doc) {
	    // Log any errors
	    if (err) {
		console.log(err);
	    }
	    // Or log the doc
	    else {
		console.log("new entry: " , doc);
	    }
	});
    } else {
	console.log("article already saved");
    }
};


// load saved articles
router.get("/api/saved", function(req, res) {
    Article.find({}, function(err, doc) {
	if(err) {
	    console.log(err);
	} else {
	    res.send(doc);
	}
    });
});

// delete article
router.get("/api/saved/:id", function(req, res) {
    console.log("remove: ", req.params.id);
    Article.remove({"_id": mongojs.ObjectId(req.params.id)}, function(err, removed) {
	if(err) {
	    console.log(err);
	    res.send(err);
	} else {
	    res.redirect('/savedArt');
	    console.log("article deleted");
	}
    });
});

module.exports = router;
