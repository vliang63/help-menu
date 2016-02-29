// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var NewScreen = React.createClass({
	getInitialState: function() {
		return {
			data:this.props.data[this.props.level],
			level: this.props.level
		}
	},
	componentDidMount: function() {
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

var HomeScreen = React.createClass({
	getInitialState: function(){
		return {
			data:{0:{}},
			id:0,
			level:0
		};
	},
	componentDidMount: function() {
		var saveThis = this;
		document.addEventListener("submit", function(e){
			e.preventDefault();
			var addTopicInput = document.getElementById("addTopicInput");
			var newTopic = addTopicInput.value;
			var level = saveThis.state.level;
			var data = saveThis.state.data;
			data[level][newTopic] = {"id":saveThis.state.id};
			saveThis.state.id += 1;
			saveThis.setState({data:data, id:saveThis.state.id});
			addTopicInput.value = '';
			console.log('data')
			console.log(data)
		})
		// listen for click on a topic or the back button
		// render a new screen with the right level of data
	},
	render: function() {
		return (
			<NewScreen data={this.state.data} level={this.state.level}/>
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
