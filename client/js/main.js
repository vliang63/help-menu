// main.js
// add click handler for going down a level
// add back button for going up a level
var React = require('react');
var ReactDOM = require('react-dom');

var NewScreen = React.createClass({
	handleClick: function(e){
		this.props.handleNewScreenClick(e);
	},
	componentWillMount: function() {
	},
	render: function() {
		console.log('newscreenrender')
		console.log(this.props.data)
		return (
			<div className="newScreen" onClick={this.handleClick}>
				<h1>Topics</h1>
				<TopicRows data={this.props.data}/>
			</div>
		)
	}
});

var HomeScreen = React.createClass({
	getInitialState: function(){
		return {
			data:{0:{}},
			id:0,
			level:0,
			topic:""
		};
	},
	handleTopicSubmit: function(newTopic){
		var level = this.state.level;
		var data = this.state.data;
		var id = this.state.id;
		var topic = this.state.topic;
		if(data[level][topic]) {
			data[level][topic][newTopic] = {"id":this.state.id};
		}else{
			data[level][newTopic] = {"id":this.state.id};
		}
		if (!data[level + 1]){data[level + 1] = {}}
		data[level + 1][newTopic] = {};
		id += 1;
		console.log('data')
		console.log(data)
		this.setState({data:data, id:id})
	},
	handleNewScreenClick: function(e) {
		// render a new screen with the right level of data
		var selectionValue = document.getElementById(e.target.id).innerHTML;
		var level = this.state.level;
		level += 1;
		console.log('selectionValue')
		console.log(selectionValue)
		this.setState({
			level: level,
			topic: selectionValue
		});
	},
	componentDidMount: function() {
		// listen for click on a topic or the back button
		
	},
	render: function() {
		var level = this.state.level;
		var data = this.state.data;
		var topic = this.state.topic;
		var dataToRender = level > 0 ? data[level][topic] : data[level];
		return (
			<div className="homeScreen">
				<NewScreen key="1" handleNewScreenClick={this.handleNewScreenClick} data={dataToRender} />
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
	handleAddTopicChange: function(e) {
		this.setState({topic:e.target.value})
	},
	render: function() {
		return(
			<form className="addTopicForm" onSubmit={this.handleSubmit}>
				<label>Add Topic Input</label>
				<input id="addTopicInput" value={this.state.topic} onChange={this.handleAddTopicChange}/>
				<button type="submit">submit</button>
			</form>
		)	
	}
});

var TopicRow = React.createClass({
	render: function(){
		return <h2 className="topicRow" id={this.props.topic}>{this.props.topic}</h2>
	}
});

ReactDOM.render(
  	<HomeScreen />,
  	document.getElementById('content')
);
