import React, {Component} from "react";

class Results extends Component {
  // Here we describe this component's render method
    render() {
	var results = this.props.results;
	var foundArticles = results.map(function(search, i) {
	    console.log('inside map');
	    console.log(search);

	    return (
		    <div className="foundArt" key={i}>
		    <p>{search.title}</p>
		    <p>Date Published: {search.date}</p>
		    <p>{search.url}</p>
		    <button className="btn btn-primary">Save</button>
		  </div>
            )
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
