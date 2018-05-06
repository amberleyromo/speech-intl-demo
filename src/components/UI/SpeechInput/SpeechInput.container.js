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
import { FormattedMessage } from 'react-intl';

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
    
    return (
      <Fragment>
        {supportsSpeechApi ? (
          <form className="SpeechInput-form" onSubmit={this.vocalize}>
            <label className="SpeechInput-vocalization-title" htmlFor="vocalization">
              <FormattedMessage {...messages.requestVocalization} />
            </label>
            <input
              autoFocus
              type="text"
              id="vocalization"
              value={this.state.vocalizationInput} 
              onChange={this.handleVocalizationInput} 
            />
            <button type="submit">
              <FormattedMessage {...messages.speak} />
            </button>

            <h2>{intl.formatMessage(messages.options)}:</h2>
            <label htmlFor="pitch"><span>{intl.formatMessage(messages.pitch)}: {options.pitch}</span></label>
            <input onChange={(e) => {this.handlePitchChange(e)}} type="range" min="0" max="2" value={options.pitch} step="0.1" id="pitch" />
            
            <label htmlFor="rate"><span>{intl.formatMessage(messages.rate)}: {options.rate}</span></label>
            <input onChange={(e) => {this.handleRateChange(e)}} type="range" min="0.5" max="2" value={options.rate} step="0.1" id="rate" />
            
            <label htmlFor="volume"><span>{intl.formatMessage(messages.volume)}: {options.volume}</span></label>
            <input onChange={(e) => {this.handleVolumeChange(e)}} type="range" min="0" max="1" value={options.volume} step="0.1" id="volume" />
          </form>
        ) : (
          <h2>Support for Web Speech API {intl.formatMessage(messages.notFound)}</h2>
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
  