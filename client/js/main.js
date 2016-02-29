// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var userInputData = {};

var HomeScreen = React.createClass({
	getInitialState: function(){
		return {
			data:{},
			id:0
		};
	},
	componentDidMount: function() {
		var saveThis = this;
		document.addEventListener("submit", function(e){
			e.preventDefault();
			var addTopicInput = document.getElementById("addTopicInput");
			var newTopic = addTopicInput.value;
			console.log(newTopic)
			saveThis.state.data[newTopic] = {"id":saveThis.state.id};
			saveThis.state.id += 1;
			console.log(saveThis.state.id)
			saveThis.setState({data:saveThis.state.data, id:saveThis.state.id});
			addTopicInput.value = '';
		})
	},
	render: function() {
		return (
			<div className="homeScreen">
				<h1>Topics</h1>
				<TopicRows data={this.state.data}/>
			</div>
		)
	}
});

var TopicRows = React.createClass({
	render: function() {
		var topicNodes = [];
		var topicList = this.props.data
		for (topic in topicList){
			topicNodes.push(
				<TopicRow topic={topic} key={topicList[topic].id}/>
			);
		}
		return (
			<div className="topicRows">
				{topicNodes}
			</div>
		)
	}
});

var AddTopicBtn = React.createClass({
	render: function(){
		return(
			<button className="addTopicBtn">Add Topic</button>
		)
	}
});

var AddTopicInput = React.createClass({
	render: function() {
		return(
			<div>
				<label>Add Topic Input</label>
				<form>
					<input id="addTopicInput" />
					<button type="submit">submit</button>
				</form>
			</div>
		)	
	}
});

var TopicRow = React.createClass({
	render: function(){
		return <h2 className="topicRow">{this.props.topic}</h2>
	}
});

ReactDOM.render(
  	<HomeScreen />,
  	document.getElementById('content')
);

ReactDOM.render(
  	<AddTopicInput />,
  	document.getElementById('addTopicInputBox')
);
