import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ISO6391 from 'iso-639-1';
// import messages from './Language.messages';

const propTypes = {
    /**
     * Languages to display
     */
    langs: PropTypes.arrayOf(PropTypes.string),
    /**
     * Selected language
     */
    selectedLang: PropTypes.string,
    /**
     * Callback fired when clicking on a language item
     */
    onLangClick: PropTypes.func.isRequired,
    /**
     * Callback fired when submitting selected language
     */
    onSubmitLang: PropTypes.func.isRequired
};

const Language = ({
  langs,
  selectedLang,
  onLangClick,
  onSubmitLang
}) => {

    const langOptions = langs.map((lang, index, array) => {
        const locale = lang.slice(0, 2).toLowerCase();
        const showLangCode =
        langs.filter(langCode => langCode.slice(0, 2).toLowerCase() === locale)
            .length > 1;

        const langCode = showLangCode ? `(${lang})` : '';
        console.log('`${ISO6391.getNativeName(locale)} ${langCode}`', `${ISO6391.getNativeName(locale)} ${langCode}`)
        console.log(' - lang', lang);
        console.log(' - locale', locale);
        console.log(' - langCode', langCode);
        return (
            <option 
                // onClick={() => {
                //     console.log('clicking');
                //     onLangClick(lang)
                // }}
                key={ISO6391.getNativeName(locale)}
                value={lang}
            >
                {`${ISO6391.getNativeName(locale)} ${langCode}`}
            </option>
        );
    });
    return (
        <select value={selectedLang} onChange={(e) => {console.log('e.target.value', e.target.value); onSubmitLang(e.target.value)}}>
            {langOptions}
        </select>
    )
};

Language.propTypes = propTypes;

export default Language;
