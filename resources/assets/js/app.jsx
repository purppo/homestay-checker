"use strict";

import React  from 'react';
import ReactDOM  from 'react-dom';
import $      from 'jquery';
import marked from 'marked';

class QuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  loadQuestionsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: data => this.setState({data: data}),
      error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
    });
  }

  handleQuestionSubmit(question) {
    let questions = this.state.data;
    question.id = Date.now();
    let newQuestions = questions.concat([question]);
    this.setState({data: newQuestions});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: question,
      success: data => this.setState({data: data}),
      error: (xhr, status, err) => {this.setState({data: questions}); console.error(this.props.url, status, err.toString())}
    });
  }

  componentDidMount() {
    this.loadQuestionsFromServer();
    //setInterval( () => this.loadQuestionsFromServer(), this.props.pollInterval );
  }

  render() {
    return (
      <table className="questionBox table table-hover table-bordered table-condensed">
        <thead>
            <tr>
                <th className="text-center">항목</th>
                <th className="text-center">질문</th>
                <th className="text-center">체크</th>
            </tr>
        </thead>
        <QuestionList data={this.state.data} url={this.props.url}/>
      </table>
    );
  }
}

class QuestionList extends React.Component {
  render() {
    let questionNodes = this.props.data.map( question => {
      return (
        <Question key={question.no} no={question.no} url={this.props.url}>
          {question.q}
        </Question>
      );
    });
    return (
      <tbody className="questionList">
        {questionNodes}
      </tbody>
    );
  }
}

class Question extends React.Component {
  render() {
    let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    let q_name = this.props.no;
    return (
       <tr>
            <td>{this.props.no}</td>
            <td>{this.props.children.toString()}</td>
            <td><RadioBox q_name={q_name} url={this.props.url}/></td>
      </tr>
    );
  }
}

class RadioBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        text: ''
    };
  }
  
  onQChanged() {
    this.setState({
      q: e.currentTarget.value
      });
      alert('aaaa');
  }
  
  handleQuestionSubmit(question) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: question,
      success: res => this.setState({text: res.data}),
      error: (xhr, status, err) => {this.setState({data: questions}); console.error(this.props.url, status, err.toString())}
    });
  }
  
  handleSubmit(e) {
      let t = (e.srcElement || e.target);
      if(t.value == 1) {
          this.setState({text: ''});
          return true;
      }
      this.handleQuestionSubmit({request: t.name});
      return;
  }  

  render() {
    return (
      <span>
        <label className="radio-inline">
        <input type="radio" name={this.props.q_name} 
               value="1"
               onChange={this.handleSubmit.bind(this)} />Yes
        </label>
        <label className="radio-inline">
        <input type="radio" name={this.props.q_name} 
               value="0"
               onChange={this.handleSubmit.bind(this)} />No
        </label>
        
        {(() => {
            return this.state.text != '' ? <p className="alert alert-danger">{this.state.text}</p>:'';
        })()}
        
      </span>
    );
  }
}

class QuestionForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    let author = ReactDOM.findDOMNode(this.refs.author).value.trim();
    let text   = ReactDOM.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onQuestionSubmit({author: author, text: text});
    ReactDOM.findDOMNode(this.refs.author).value = '';
    ReactDOM.findDOMNode(this.refs.text).value   = '';
    return;
  }

  render() {
    return (
      <form className="questionForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
}


ReactDOM.render(
  <QuestionBox url="/v1/questions" pollInterval={2000} />,
  document.getElementById('content')
);
