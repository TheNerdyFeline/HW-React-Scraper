import axios from "axios";
import request from "request";
import cheerio from "cheerio";

let apiKey = "ff9b67cdcef449528c40fe593b7af9bc";

// This function serves our purpose of running the query to geolocate.
const helper = {
    runQuery: (queries) => {
	/*if(topic === undefined || start === undefined || end === undefined) {
	    console.log("empty search parameters");
	} else {	
	    console.log(topic, start, end);
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
		    //return response.data.results[0].formatted;
		}
		// If we don't get any results, return an empty string
		return "";
	    }).catch(function(err) {
		console.log(err);
	    });
	    }*/
	console.log("queries: ", queries);
	axios.get("/api/scrape", queries);
    },
    
    // This function hits our own server to retrieve the record of query results
    getSavedArt: () => {
	return axios.get("/api/saved");
    },
    
    // This function posts new articles to our database.
    postarticle: (article) => {
	return axios.post("/api/saved", { article: article });
    }
};
// We export the API helper
    export default helper;
