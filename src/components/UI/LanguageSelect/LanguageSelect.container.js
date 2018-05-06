import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import LanguageTags from 'language-tags';
import messages from './LanguageSelect.messages';
// import { FormattedMessage } from 'react-intl';

import { changeLang } from '../../../providers/LanguageProvider/LanguageProvider.actions';
import './LanguageSelect.css';
export class LanguageContainer extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  };

  state = { selectedLang: this.props.lang };

  render() {
    const { lang, langs, supportsIntlApi, intl } = this.props;
    const intlChangeLang = intl.formatMessage(messages.changeLanguage);

    const sortedLangs = this.sortLangs(lang, langs);
    const langOptions = langs.map((lang, index, array) => {
      const locale = lang.slice(0, 2).toLowerCase();
      const showLangCode =
      sortedLangs.filter(langCode => langCode.slice(0, 2).toLowerCase() === locale)
          .length > 1;

      const langCode = showLangCode ? `(${lang})` : '';
      return (
        <option key={lang} value={lang}>
          {`${LanguageTags.language(locale).descriptions()[0]} ${langCode}`}
        </option>
      );
    });

    return (
      <Fragment>
        {supportsIntlApi && (
          <div className="LanguageSelect">
          <label>{intlChangeLang}: 
            <select 
              value={this.state.selectedLang}
              onChange={(e) => {this.selectLang(e.target.value)}}
            >
              {langOptions}
            </select>
          </label>
        </div>
        )}
      </Fragment>
    )
  }

  selectLang = (lang) => {
    const { onLangChange } = this.props;
    onLangChange(lang);
  };

  // sorts selected language to top
  sortLangs = (lang, [...langs] = []) => {
    const langIndex = langs.indexOf(lang);
    if (langIndex >= 0) {
      const temp = langs[0];
      langs[0] = langs[langIndex];
      langs[langIndex] = temp;
    }
    return langs;
  };
}

const mapStateToProps = state => ({
  lang: state.language.lang,
  langs: state.language.langs,
  supportsIntlApi: state.speech.supportsIntlApi
});

const mapDispatchToProps = {
  onLangChange: changeLang
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(LanguageContainer)
);
