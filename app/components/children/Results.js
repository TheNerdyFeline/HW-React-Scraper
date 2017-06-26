import React, {Component} from "react";

class Results extends Component {
    constructor(props) {
	super(props);
	this.saveCurrArt = this.saveCurrArt.bind(this);
    }
    
    saveCurrArt() {
	console.log("save clicked");
	var articleToSave = this.props.results;
	this.props.saveArticle(articleToSave);
    }
  // Here we describe this component's render method
    render() {
	var results = this.props.results;
	var foundArticles = results.map(function(search, i) {
	    return (
		    <div className="foundArt" key={i}>
		    <p>{search.title}</p>
		    <p>Date Published: {search.date}</p>
		    <p>{search.url}</p>
		    <button className="btn btn-primary" onClick={this.saveCurrArt}>Save</button>
		  </div>
            );
	});
	 
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search Results</h3>
        </div>
            <div className="panel-body text-center">
	    {foundArticles}
        </div>
      </div>
    );
  }
};

// Export the component back for use in other files
export default Results;
