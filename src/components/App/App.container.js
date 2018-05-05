import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import './App.css';
import TtsLog from '../UI/TtsLog';
import LanguageSelect from '../UI/LanguageSelect';

import {
  speak,
  cancelSpeech,
  changeVoice,
  changePitch,
  changeRate,
  changeVolume
} from '../../providers/SpeechProvider/SpeechProvider.actions';
import messages from './App.messages';
import { CHANGE_VOLUME } from '../../providers/SpeechProvider/SpeechProvider.constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vocalizationInput: ''
    };
  }

  static propTypes = {
    /**
     * @ignore
     */
    intl: intlShape.isRequired,
    /**
     * App language
     */
    lang: PropTypes.string.isRequired,
    /**
     * App language direction
     */
    dir: PropTypes.string.isRequired,
    /**
     * Processed vocalization (for tts log)
     */
    vocalization: PropTypes.string.isRequired,
    /**
     * TTS options (for tts log)
     */
    options: PropTypes.object.isRequired
  };

  render() {
    const { intl, lang, dir, vocalization, options } = this.props;
    // Translated strings
    const intlRequestVocalization = intl.formatMessage(messages.requestVocalization);
    const intlSpeakTitle = intl.formatMessage(messages.speak);
    const intlOptionsTitle = intl.formatMessage(messages.options);
    const intlPitchTitle = intl.formatMessage(messages.pitch);
    const intlRateTitle = intl.formatMessage(messages.rate);
    const intlVolumeTitle = intl.formatMessage(messages.volume);

    return (
      <div className="App">
        <Helmet>
          <html lang={lang} dir={dir} />
        </Helmet>
        <header className="App-header">
          <h1 className="App-title">Web Speech + Intl APIs</h1>
          <LanguageSelect />
          <form className="App-form" onSubmit={this.vocalize}>
            <label htmlFor="vocalization">{intlRequestVocalization}</label>
            <input
              type="text"
              id="vocalization"
              value={this.state.vocalizationInput} 
              onChange={this.handleVocalizationInput} 
            />
            <button type="submit">{intlSpeakTitle}</button>

            <h2>{intlOptionsTitle}:</h2>
            <label htmlFor="pitch">{intlPitchTitle}: {options.pitch}</label>
            <input onChange={(e) => {this.handlePitchChange(e)}} type="range" min="0" max="2" value={options.pitch} step="0.1" id="pitch" />
            

            <label htmlFor="rate">{intlRateTitle}: {options.rate}</label>
            <input onChange={(e) => {this.handleRateChange(e)}} type="range" min="0.5" max="2" value={options.rate} step="0.1" id="rate" />
            
            <label htmlFor="volume">{intlVolumeTitle}: {options.volume}</label>
            <input onChange={(e) => {this.handleVolumeChange(e)}} type="range" min="0" max="1" value={options.volume} step="0.1" id="volume" />
          </form>
        </header>
        <TtsLog vocalization={vocalization} options={options} />
      </div>
    );
  }

  handleVocalizationInput = e => {
    this.setState({vocalizationInput: e.target.value});
  }

  handlePitchChange = e => {
    const { changePitch } = this.props;
    changePitch(e.target.value);
  }

  handleRateChange = e => {
    const { changeRate } = this.props;
    changeRate(e.target.value);
  }

  handleVolumeChange = e => {
    const { changeVolume } = this.props;
    changeVolume(e.target.value);
  }

  vocalize = e => {
    e.preventDefault();
    const { speak } = this.props;
    speak(this.state.vocalizationInput);
  }
  
}

const mapStateToProps = state => ({
  dir: state.language.dir,
  lang: state.language.lang,
  vocalization: state.speech.vocalization,
  options: state.speech.options
});

const mapDispatchToProps = {
  speak,
  cancelSpeech,
  changeVoice,
  changePitch,
  changeRate,
  changeVolume

};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(App)
);