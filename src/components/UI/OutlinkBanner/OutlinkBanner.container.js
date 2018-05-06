import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import './OutlinkBanner.css';
import messages from './OutlinkBanner.messages';

export class OutlinkBanner extends Component {
    static propTypes = {
        intl: intlShape.isRequired,
    };
  render() {
    const { intl } = this.props;
    const intlSeeSpeechSupport = intl.formatMessage(messages.seeSpeechSynthesisSupport);

    return (
        <div className="OutlinkBanner">
            <span>{intlSeeSpeechSupport}: <a href="https://browserspeechsupport.me/">browserspeechsupport.me</a></span>
        </div>
    )
  }
}

export default connect(null, null)(
    injectIntl(OutlinkBanner)
  );
  