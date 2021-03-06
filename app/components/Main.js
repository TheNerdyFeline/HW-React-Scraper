import React, {Component} from "react";
import Link  from "react-router";

// import components search, results, saved articles
import Search from "./children/Search";
import Results from "./children/Results";
import SavedArt from "./children/SavedArt";

// helper for saving and grabbing articles
import helpers from "./utils/helpers";

// main component
class Main extends Component {
    //var Main = React.createClass({
    // this sets initial state of children
    constructor(props) {
	super(props);	
	this.state = {search: {topic: "", start: "", end: ""}, results:[], savedArt:[]};

	this.setSearch = this.setSearch.bind(this);
	this.callNYTimes = this.callNYTimes.bind(this);
	this.saveArticle = this.saveArticle.bind(this);
    }

    componentDidMount() {
	// get saved articles
	helpers.getSavedArt().then(function(response) {
	    if(response !== this.state.savedArt) {
		console.log("saved articles", response.data);
		this.setState({ savedArt: response.data});
	    }
	}.bind(this));
    }

    componentDidUpdate(prevProps, prevState){
	if (prevState.search != this.state.search){
	    // if search is made or article saved update component
	    helpers.runQuery(this.state.search).then(function(data) {
		if (data !== this.state.results) {
		    this.setState({ results: data });
		}
	    }.bind(this));
	}
    }
    
    callNYTimes(searchObj) {
	//helpers.runQuery(queries);
	this.setState({search: searchObj});	
    }

    saveArticle(article) {
	console.log(article);
	this.setState({article: article});
	// if user wants to save article, save it to db
	helpers.postArticle(this.state.article).then(function() {
	    console.log("Updated!");
	}.bind(this));
	// after article is saved we update saved articles
	helpers.getSavedArt().then(function(response) {
	    console.log("Current Articles", response.data);			
	    console.log("Article", response.data);	
	    this.setState({ articles: response.data });
	}.bind(this));
    }
    
    setSearch(search) {
	this.setState({search: search});
    }
    
    render() {
	return (
	    <div className="container">
              <div className="row">
		<div className="jumbotron">
		  <h2 className="text-center">New York Times Article Scraper!</h2>
		  <p className="text-center">
		    <em>Search for a topic in the New York Times Newspape and save your favorite aricles with your own personal notes.</em>
		  </p>
		</div>
	      </div>
	      
	      <div className="row">
		<div className="col-md-6">
		  <Search setSearch={this.setSearch} callNYTimes={this.callNYTimes} />
		</div>
	      </div>
	      
	      <div className="row">
		<div className="col-md-6">
		  <Results results={this.state.results} saveArticle={this.saveArticle}/>
		</div>
	      </div>
	      
              

              <div className="row">
		<div className="col-md-6">
		  <SavedArt />
		</div>
              </div>

	    </div>
	);
    }
}; // closes main
export default Main;
