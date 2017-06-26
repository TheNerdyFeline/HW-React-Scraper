import axios from "axios";
import request from "request";
import cheerio from "cheerio";

let apiKey = "ff9b67cdcef449528c40fe593b7af9bc";

// This function serves our purpose of running the query to geolocate.
const helper = {
    runQuery: (queries) => {
	if(queries.topic === undefined || queries.start === undefined || queries.end === undefined) {
	    console.log("empty search parameters");
	    return "no articles found";
	} else {	
	    // Figure out the geolocation
	    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + $.param({
		'api-key': apiKey,
		'q': queries.topic,
		'begin_date': queries.start + '0101',
		'end_date': queries.end + '1231'
	    });
	    return axios.get(queryURL).then(function(resp) {
		//console.log(resp.data.response.docs);
		let docs = resp.data.response.docs;
		// If get get a result, return that result's formatted address property
		if (docs.length > 0) {
		    let articles = [];
		    for(var i = 0; i < docs.length; i++) {
			let singleArt = {title: docs[i].headline.main, date: docs[i].pub_date, url: docs[i].web_url};
			articles.push(singleArt);
		    }
		    return articles;
		}
		// If we don't get any results, return an empty string
		return "";
	    }).catch(function(err) {
		console.log(err);
	    });
	}
	//console.log("queries: ", queries);
	//axios.get("/api/scrape", queries);
    },
    
    
    // This function hits our own server to retrieve the record of query results
    getSavedArt: () => {
	return axios.get("/api/saved");
    },
    
    // This function posts new articles to our database.
    postArticle: (article) => {
	console.log('saving article');
	return axios.post("/api/saved", { article: article });
    }
};
// We export the API helper
    export default helper;
