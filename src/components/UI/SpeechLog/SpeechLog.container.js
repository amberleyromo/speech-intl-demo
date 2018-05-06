import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import './SpeechLog.css';
import messages from '../SpeechInput/SpeechInput.messages';

class SpeechLogContainer extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    vocalization: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
  }

  render() {
    const { vocalization, options, intl } = this.props;
    const intlOptionsTitle = intl.formatMessage(messages.options);
    return (
      <div className="Speech-Log">
        <pre>const synth = window.speechSynthesis;</pre>
        {vocalization !== '' && (
          <div>
            {/* eslint-disable react/jsx-no-comment-textnodes */}
            <p>// {intlOptionsTitle}:</p>
            <pre>{JSON.stringify(options, 0, 2)}</pre>
          </div>
        )}
        <pre>synth.speak({JSON.stringify(vocalization, 0, 2)})</pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vocalization: state.speech.vocalization,
  options: state.speech.options,
});

export default connect(mapStateToProps)(
  injectIntl(SpeechLogContainer)
);
    