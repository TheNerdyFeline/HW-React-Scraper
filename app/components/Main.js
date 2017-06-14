import React, {Component} from "react";
import Link  from "react-router";

// import components search, results, saved articles
import Search from "./children/Search";
import Results from "./children/Results";
import SavedArt from ",.children/SavedArt";

// helper for saving and grabbing articles
import helpers from "./utils/helpers";

// main component
class Main extends Component {
    //var Main = React.createClass({
    // this sets initial state of children
    constructor(props) {
	super(props);	
	this.state = {search: {topic: "", startYear: "", endYear: ""}, results:[], savedArt: []};
    }

    componentDidMount() {
	// get saved articles
	helpers.getSavedArt().then(function(response) {
	    console.log(response);
	    if(response !== this.state.savedArt) {
		console.log("saved articles", response.data);
		this.setState({ savedArt: response.data});
	    }
	}.bind(this));
    }

    componentDidUpdate() {
	// if search is made or article saved update component
    }

    render() {
	return (
	    <div className="container">
              <div className="row">
		<div className="jumbotron">
		  <h2 className="text-center">Los Angeles Times Article Scraper!</h2>
		  <p className="text-center">
		    <em>Search for a topic in the Los Angeles Newspaper and save your favorite aricles with your own personal notes.</em>
		  </p>
		</div>
	      </div>
	      
	      <div className="row">
		<div className="col-md-6">
		  <Search setSearch={this.setSearch} />
		</div>
	      </div>
	      
	      <div className="row">
		<div className="col-md-6">
		  <Results address={this.state.results} />
		  </div>
	      </div>
	      
              

              <div className="row">
		<div className="col-md-6">
		  <SavedArt history={this.state.SavedArt} />
		</div>
            </div>

	    </div>
	);
    }
}; // closes main
export default Main;
