import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BrowserSupport.css';
import { connect } from 'react-redux';
import Emoji from 'react-emoji-render';

import tts from '../../../providers/SpeechProvider/tts';
import i18n from '../../../i18n'; 
import { checkSpeechApi, checkIntlApi } from '../../../providers/SpeechProvider/SpeechProvider.actions';

export class BrowserSupport extends Component {
  static propTypes = {
    supportsSpeechApi: PropTypes.bool.isRequired,
    supportsIntlApi: PropTypes.bool.isRequired
  };

  componentWillMount() {
    const { checkSpeechApi, checkIntlApi } = this.props;
    checkSpeechApi(tts.isSupported());
    checkIntlApi(i18n.isSupported());
  }

  render() {
    const { supportsSpeechApi, supportsIntlApi } = this.props;
    return (
        <div className="BrowserSupport">
            <span>Web Speech API: {<Emoji text={supportsSpeechApi ? ":+1:" : ":-1:"} />} Intl API: {<Emoji text={supportsIntlApi ? ":+1:" : ":-1:"} />}</span>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  supportsSpeechApi: state.speech.supportsSpeechApi,
  supportsIntlApi: state.speech.supportsIntlApi
});

const mapDispatchToProps = {
  checkSpeechApi,
  checkIntlApi
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowserSupport);
