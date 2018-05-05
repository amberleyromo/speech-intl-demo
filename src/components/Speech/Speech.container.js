import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Speech.css';

import {
  speak,
  cancelSpeech
} from '../../providers/SpeechProvider/SpeechProvider.actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {vocalization: ''};
  }

    static propTypes = {
    };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Web Speech API</h1>
          <form onSubmit={this.vocalize}>
            <h2>
                <label for="vocalization">
                    Enter a phrase to speechify:
                </label>
                <input id="vocalization" type="text" value={this.state.vocalization} onChange={this.handleChange} />
            </h2>
            <button type="submit">Speak</button>
          </form>
        </header>
        <p className="Speech-ttsLog">
          <pre>const synth = window.speechSynthesis;</pre>
          <pre>synth.speak({JSON.stringify(this.props.ttsLog.text, 0, 2)})</pre>
          <pre>// Using the following options:</pre>
          <pre>{JSON.stringify(this.props.ttsLog.options, 0, 2)}</pre>
        </p>
      </div>
    );
  }

  handleChange = e => {
    this.setState({vocalization: e.target.value});
  }

  vocalize = e => {
    e.preventDefault();
    const { speak } = this.props;
    speak(this.state.vocalization);
  }
  
}

// const mapStateToProps = () => {
//   return {
//     dir: state.language.dir,
//   };
// };

const mapStateToProps = state => ({
  ttsLog: state.speech.ttsLog
});

const mapDispatchToProps = {
  speak
};


export default connect(mapStateToProps, mapDispatchToProps)(App);