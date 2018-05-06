import React from 'react';
import PropTypes from 'prop-types';
import LanguageTags from 'language-tags';
// import { FormattedMessage } from 'react-intl';
// import messages from './Language.messages';

const propTypes = {
    langs: PropTypes.arrayOf(PropTypes.string),
    selectedLang: PropTypes.string,
    onSelectLang: PropTypes.func.isRequired,
    intlChangeLang: PropTypes.string.isRequired
};

const Language = ({
  langs,
  selectedLang,
  onSelectLang,
  intlChangeLang
}) => {
    const langOptions = langs.map((lang, index, array) => {
        const locale = lang.slice(0, 2).toLowerCase();
        const showLangCode =
        langs.filter(langCode => langCode.slice(0, 2).toLowerCase() === locale)
            .length > 1;

        const langCode = showLangCode ? `(${lang})` : '';
        return (
            <option key={lang} value={lang}>
                {`${LanguageTags.language(locale).descriptions()[0]} ${langCode}`}
            </option>
        );
    });
    return (
        <div className="LanguageSelect">
            <label>{intlChangeLang}: 
                <select 
                    value={selectedLang}
                    onChange={(e) => {onSelectLang(e.target.value)}}
                >
                    {langOptions}
                </select>
            </label>
        </div>
    )
};

Language.propTypes = propTypes;

export default Language;
