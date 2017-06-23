import React, {Component} from "react";

class Search extends Component {
    constructor(props) {
	super(props);	
	this.state = {search: {topic: "", start: "", end: ""}};
	this.onSubmitClick = this.onSubmitClick.bind(this);
    }
    // This function will respond to the user input
    handleChange(property, e) {
	const search = this.state.search;
	search[property] = e.target.value;
	this.setState({ search: search });
	
    }
    // When a user submits...
    onSubmitClick() {
	console.log("search topic: ", this.state.search.topic);
	/*this.props.callback({topic: this.state.search.topic, start: this.state.search.start, end: this.state.search.end});*/
	// Set the parent to have the search terms
	this.props.setSearch({search: {topic: this.state.search.topic, start: this.state.search.start, end: this.state.search.end}});
	this.props.callNYTimes(this.state.search);
	this.setState({search: {topic:"", start:"", end:""}});
    }
    render() {
	return (
	    <div className="panel panel-default">
	      <div className="panel-heading">
		<h3 className="panel-title text-center">Query</h3>
	      </div>
	      <div className="panel-body text-center">
		
		  <div className="form-group">
		    <h4 className="">
                      <strong>Search LA Times</strong>
		    </h4>
		    <h4>Topic</h4>
		    <input type="text" value={this.state.search.topic} className="form-control text-center" id="topic" onChange={this.handleChange.bind(this, "topic")} required />
		    <br/>
		    <h4>Start Year</h4>
		    <input type="text"  value={this.state.search.start} className="form-control text-center" id="startYear" onChange={this.handleChange.bind(this, "start")} required />
		    <br/>
		    <h4>End Year</h4>
		    <input type="text" value={this.state.search.end} className="form-control text-center" id="endYear" onChange={this.handleChange.bind(this, "end")} required />
		    <br/>
		<button className="btn btn-primary" onClick={this.onSubmitClick}>Submit</button>
		  </div>
		
              </div>
	    </div>
	);
    }
    
};

export default Search;
