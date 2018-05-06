import React from 'react';
import PropTypes from 'prop-types';
import './Vocalize.css'

const propTypes = {
    vocalize: PropTypes.func.isRequired,
    vocalization: PropTypes.string.isRequired,
    changeVocalization: PropTypes.func.isRequired,
    changePitch: PropTypes.func.isRequired,
    changRate: PropTypes.func.isRequired,
    changeVolume: PropTypes.func.isRequired,
    intlPitchTitle: PropTypes.string.isRequired,
    intlRateTitle: PropTypes.string.isRequired,
    intlVolumeTitle: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
};

const Vocalize = ({
    vocalize,
    vocalization,
    changeVocalization,
    changePitch,
    changRate,
    changeVolume,
    intlPitchTitle,
    intlRateTitle,
    intlVolumeTitle,
    options,
}) => {

    return (
        <form className="Vocalize-form" onSubmit={vocalize}>
            <label htmlFor="vocalization">{intlRequestVocalization}</label>
            <input
                type="text"
                id="vocalization"
                value={vocalization} 
                onChange={changeVocalization} 
            />
            <button type="submit">{intlSpeakTitle}</button>

            <h2>{intlOptionsTitle}:</h2>
            <label htmlFor="pitch">{intlPitchTitle}: {options.pitch}</label>
            <input onChange={(e) => {handlePitchChange(e)}} type="range" min="0" max="2" value={options.pitch} step="0.1" id="pitch" />


            <label htmlFor="rate">{intlRateTitle}: {options.rate}</label>
            <input onChange={(e) => {handleRateChange(e)}} type="range" min="0.5" max="2" value={options.rate} step="0.1" id="rate" />

            <label htmlFor="volume">{intlVolumeTitle}: {options.volume}</label>
            <input onChange={(e) => {handleVolumeChange(e)}} type="range" min="0" max="1" value={options.volume} step="0.1" id="volume" />
        </form>
    )
};

Vocalize.propTypes = propTypes;

export default Vocalize;
