import React, {Component} from "react";

class Results extends Component {
  // Here we describe this component's render method
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search Results</h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
           
          
		  <div className="foundArt">
		    <p key={""}>This is where the article title would be.</p>
		    <button className="btn btn-primary">Save</button>
		  </div>
             
          
        </div>
      </div>
    );
  }
};

// Export the component back for use in other files
export default Results;
