import axios from "axios";
import request from "request";
import cheerio from "cheerio";

let apiKey = "ff9b67cdcef449528c40fe593b7af9bc";

// This function serves our purpose of running the query to geolocate.
const helper = {
    runQuery: (queries) => {
	if(queries.topic === undefined || queries.start === undefined || queries.end === undefined) {
	    console.log("no search parameters and topic", queries.topic);
	    console.log("empty search parameters");
	    return "no articles found";
	} else {	
	    console.log(queries.topic, queries.start, queries.end);
	    // Figure out the geolocation
	    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + $.param({
		'api-key': apiKey,
		'q': queries.topic,
		'begin_date': queries.start + '0101',
		'end_date': queries.end + '1231'
	    });
	    console.log(queryURL);
	    return axios.get(queryURL).then(function(resp) {
		console.log("query ran: ", resp.data.response.docs);
		console.log(resp.data.response.docs.main);
		// If get get a result, return that result's formatted address property
		if (resp.data.response.docs.length > 0) {
		    return resp.data.response.docs;
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
    postarticle: (article) => {
	return axios.post("/api/saved", { article: article });
    }
};
// We export the API helper
    export default helper;
