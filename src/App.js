import { subscribeToTimer, changeTweetWidget } from './api';
import { Tweet } from 'react-twitter-widgets';


import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
          timestamp: 'no timestamp yet',
          tweet: "984439194184536064"
      };

      subscribeToTimer((err, timestamp) => this.setState({
          timestamp: timestamp
      }));

      changeTweetWidget((err, tweet) => this.setState({
          tweet: tweet.data
      }));
    }

  render() {
    return (
      <div className="App">
      <Tweet
        className="tweet"
        tweetId={this.state.tweet}
       />
    </div>
    );
  }
}

export default App;
