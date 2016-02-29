// main.js
// add submit handler listener for form element
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
	handleTopicSubmit: function(newTopic){
		var level = this.state.level;
		var data = this.state.data;
		var id = this.state.id;
		data[level][newTopic] = {"id":this.state.id};
		id += 1;
		console.log('data')
		console.log(data)
		this.setState({data:data, id:id})
	},
	componentDidMount: function() {
		// listen for click on a topic or the back button
		// render a new screen with the right level of data
	},
	render: function() {
		return (
			<div className="homeScreen">
				<NewScreen data={this.state.data} level={this.state.level} />
				<AddTopicForm level={this.state.level} onTopicSubmit={this.handleTopicSubmit} />
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

var AddTopicForm = React.createClass({
	getInitialState: function() {
		return {topic:''};
	},
	handleSubmit: function(e){
		e.preventDefault(e);
		var newTopic = this.state.topic;
		this.props.onTopicSubmit(newTopic);
		this.setState({topic:''})
	},
	handleTopicChange: function(e) {
		this.setState({topic:e.target.value})
	},
	render: function() {
		return(
			<form className="addTopicForm" onSubmit={this.handleSubmit}>
				<label>Add Topic Input</label>
				<input id="addTopicInput" value={this.state.topic} onChange={this.handleTopicChange}/>
				<button type="submit">submit</button>
			</form>
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
