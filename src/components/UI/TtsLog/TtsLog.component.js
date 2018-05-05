import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TtsLog.css';

class TtsLog extends Component {
    static propTypes = {
        vocalization: PropTypes.string,
        options: PropTypes.object
    };

    render() {
        const { vocalization, options } = this.props;
        return (
            <div className="Speech-ttsLog">
                <pre>const synth = window.speechSynthesis;</pre>
                {vocalization !== '' && (
                    <div>
                        <p>// Options:</p>
                        <pre>{JSON.stringify(options, 0, 2)}</pre>
                    </div>
                )}
                <pre>synth.speak({JSON.stringify(vocalization, 0, 2)})</pre>
            </div>
        );
    }
}

export default TtsLog;