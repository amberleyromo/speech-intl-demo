import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';

import { changeLang } from '../../../providers/LanguageProvider/LanguageProvider.actions';
import LanguageSelect from './LanguageSelect.component';
import './LanguageSelect.css';

const sortLangs = (lang, [...langs] = []) => {
  const langIndex = langs.indexOf(lang);
  if (langIndex >= 0) {
    const temp = langs[0];
    langs[0] = langs[langIndex];
    langs[langIndex] = temp;
  }
  return langs;
};

export class LanguageContainer extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    langs: PropTypes.arrayOf(PropTypes.string).isRequired,
    onLangChange: PropTypes.func.isRequired,
    intlChangeLang: PropTypes.string.isRequired
  };

  state = { selectedLang: this.props.lang };

  selectLang = (lang) => {
    const { onLangChange } = this.props;
    onLangChange(lang);
  };

  render() {
    const { lang, langs, intlChangeLang } = this.props;
    const sortedLangs = sortLangs(lang, langs);

    return (
      <LanguageSelect
        // title={<FormattedMessage {...messages.language} />}
        intlChangeLang={intlChangeLang}
        selectedLang={this.state.selectedLang}
        langs={sortedLangs}
        onLangClick={this.handleLangClick}
        onSelectLang={this.selectLang}
      />
    );
  }
}

const mapStateToProps = state => ({
  lang: state.language.lang,
  langs: state.language.langs
});

const mapDispatchToProps = {
  onLangChange: changeLang
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);
