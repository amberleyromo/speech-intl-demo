import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import './SpeechInput.css';
import messages from './SpeechInput.messages';
import {
  speak,
  cancelSpeech,
  changeVoice,
  changePitch,
  changeRate,
  changeVolume
} from '../../../providers/SpeechProvider/SpeechProvider.actions';

class SpeechInputContainer extends Component {
  static propTypes = {
    intl: intlShape.isRequired
  }

  state = { vocalizationInput: '' };

  render() {
    const {
      intl,
      options,
      supportsSpeechApi
    } = this.props;

    // Internationalized strings
    const intlRequestVocalization = intl.formatMessage(messages.requestVocalization);
    const intlSpeakTitle = intl.formatMessage(messages.speak);
    const intlOptionsTitle = intl.formatMessage(messages.options);
    const intlPitchTitle = intl.formatMessage(messages.pitch);
    const intlRateTitle = intl.formatMessage(messages.rate);
    const intlVolumeTitle = intl.formatMessage(messages.volume);
    const intlNotFound = intl.formatMessage(messages.notFound);
    
    return (
      <Fragment>
        {supportsSpeechApi ? (
          <form className="SpeechInput-form" onSubmit={this.vocalize}>
            <label className="SpeechInput-vocalization-title" htmlFor="vocalization">{intlRequestVocalization}</label>
            <input
              autoFocus
              type="text"
              id="vocalization"
              value={this.state.vocalizationInput} 
              onChange={this.handleVocalizationInput} 
            />
            <button type="submit">{intlSpeakTitle}</button>

            <h2>{intlOptionsTitle}:</h2>
            <label htmlFor="pitch"><span>{intlPitchTitle}: {options.pitch}</span></label>
            <input onChange={(e) => {this.handlePitchChange(e)}} type="range" min="0" max="2" value={options.pitch} step="0.1" id="pitch" />
            
            <label htmlFor="rate"><span>{intlRateTitle}: {options.rate}</span></label>
            <input onChange={(e) => {this.handleRateChange(e)}} type="range" min="0.5" max="2" value={options.rate} step="0.1" id="rate" />
            
            <label htmlFor="volume"><span>{intlVolumeTitle}: {options.volume}</span></label>
            <input onChange={(e) => {this.handleVolumeChange(e)}} type="range" min="0" max="1" value={options.volume} step="0.1" id="volume" />
          </form>
        ) : (
          <h2>Support for Web Speech API {intlNotFound}</h2>
        )}
      </Fragment>
    )
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
  supportsSpeechApi: state.speech.supportsSpeechApi,
  options: state.speech.options,
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
  injectIntl(SpeechInputContainer)
);
  