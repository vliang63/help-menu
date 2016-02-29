// main.js
var React = require('react');
var ReactDOM = require('react-dom');

// var data = {
// 	"Doctor":{
// 		"id":1,
// 		"Insurance":{
// 			"__end":"covered by your insurance provider"
// 		},"Network":{
// 		},"Costs":{
// 		}
// 	},"Dentist":{
// 		"id":2,
// 		"Insurance":{
// 		},
// 		"Network":{
// 		},
// 		"Costs":{
// 		}
// 	}, "Physical Therapy":{
// 		"id":3,
// 		"__end":"not covered by any provider"
// 	}
// }

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
		console.log('save this')
		console.log(this)
		document.getElementById("addTopicBtn").addEventListener("click",function(){
			ReactDOM.render(
				<AddTopicInput />,
				document.getElementById("addTopicInputBox")
			);
		});
		document.addEventListener("submit", function(e){
			e.preventDefault();
			var newTopic = document.getElementById("addTopicInput").value;
			console.log(newTopic)
			saveThis.state.data[newTopic] = {"id":saveThis.state.id};
			saveThis.state.id += 1;
			console.log(saveThis.state.id)
			saveThis.setState({data:saveThis.state.data, id:saveThis.state.id});
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
  	<AddTopicBtn />,
  	document.getElementById('addTopicBtn')
);
