import React, {Component} from "react";

class SavedArt extends Component {
    // Here we describe this component's render method
    render() {
	return (
	    <div className="panel panel-default">
              <div className="panel-heading">
		<h3 className="panel-title text-center">Saved Articles</h3>
              </div>
              <div className="panel-body text-center">
		   
			<div className="eachSavedArt">
			  <div className="title">
			    <p key={""}>This is where the saved article would be.</p>
			    <button className="btn btn-primary">Remove</button>
			  </div>
			  <div className="notes">
			    <p key={""}>This is where the notes would be.</p>
			  </div>
			</div>
		   
            </div>
		</div>
	);
    }
};

// Export the component back for use in other files
export default SavedArt;
