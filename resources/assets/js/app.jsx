"use strict";

import React  from 'react';
import ReactDOM  from 'react-dom';
import $      from 'jquery';
import marked from 'marked';

var q_list = {};

class QuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        q_cnt: 0,
        y_cnt: 0,
        n_cnt: 0
    };
  }
  
  objectLength(object) {
      var length = 0;
        for( var key in object ) {
            if( object.hasOwnProperty(key) ) {
                ++length;
            }
        }
        return length;
  }
  
  changeCnt(name,value) {
      //let t = (e.srcElement || e.target);
      //let name = t.name;
      //let value = t.value;
      q_list[name] = value;
      let y_cnt = 0;
      let n_cnt = 0;
      let q_cnt = this.objectLength(this.state.data);
      let all_cnt = 0;
      $.each(q_list, function(i, val) {
          if(val == 1){
              y_cnt++;
          }else{
              n_cnt++;
          }
          all_cnt++;
      });
      this.setState({data: this.state.data,q_cnt: q_cnt,y_cnt: y_cnt,n_cnt: n_cnt});
  }
  
  loadQuestionsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: data => (this.setState({data: data,q_cnt: this.objectLength(data),y_cnt: 0,n_cnt: 0})),
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
      <div>
          <table className="questionBox table table-hover table-bordered table-condensed">
            <thead>
                <tr>
                    <th className="text-center">항목</th>
                    <th className="text-center">질문</th>
                    <th className="text-center">체크</th>
                </tr>
            </thead>
            <QuestionList data={this.state.data} url={this.props.url} q_cnt={this.state.q_cnt} y_cnt={this.state.y_cnt} n_cnt={this.state.n_cnt} changeCnt={this.changeCnt.bind(this)}/>
          </table>
          <Counter q_cnt={this.state.q_cnt} y_cnt={this.state.y_cnt} n_cnt={this.state.n_cnt}/>
      </div>
    );
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
      //Props가 변경이 있있을 경우 처리
      if(nextProps.q_cnt != 0 && nextProps.q_cnt == (nextProps.y_cnt+nextProps.n_cnt)){
          alert('체크 끝났습니다. 결과를 확인해주세요.');
      }
  }
  
  render() {
    return (
      <div className="row">
            <div className="col-lg-4 col-md-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-3">
                                <i className="fa fa-comments fa-5x"></i>
                            </div>
                            <div className="col-xs-9 text-right">
                                <div>Qestions</div>
                                <div className="huge"><h2>{this.props.q_cnt}</h2></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-3">
                                <i className="fa fa-tasks fa-5x"></i>
                            </div>
                            <div className="col-xs-9 text-right">
                                <div>Yes!</div>
                                <div className="huge"><h2>{this.props.y_cnt}</h2></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-3">
                                <i className="fa fa-shopping-cart fa-5x"></i>
                            </div>
                            <div className="col-xs-9 text-right">
                                <div>No!</div>
                                <div className="huge"><h2>{this.props.n_cnt}</h2></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let questionNodes = this.props.data.map( question => {
      return (
        <Question key={question.no} no={question.no} url={this.props.url} q_cnt={this.props.q_cnt} y_cnt={this.props.y_cnt} n_cnt={this.props.n_cnt} changeCnt={this.props.changeCnt.bind(this)}>
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
  constructor(props) {
    super(props);
  }
  render() {
    let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    let q_name = this.props.no;
    return (
       <tr>
            <td>{this.props.no}</td>
            <td>{this.props.children.toString()}</td>
            <td><RadioBox q_name={q_name} url={this.props.url} q_cnt={this.props.q_cnt} y_cnt={this.props.y_cnt} n_cnt={this.props.n_cnt} changeCnt={this.props.changeCnt.bind(this)}/></td>
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
      this.props.changeCnt(t.name,t.value);
      
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

