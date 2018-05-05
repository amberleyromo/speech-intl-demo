import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { changeLang } from '../../../providers/LanguageProvider/LanguageProvider.actions';
import LanguageSelect from './LanguageSelect.component';
// import messages from './Language.messages';

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
    /**
     * Active language
     */
    lang: PropTypes.string.isRequired,
    /**
     * Language list
     */
    langs: PropTypes.arrayOf(PropTypes.string).isRequired,

    /**
     * Callback fired when language changes
     */
    onLangChange: PropTypes.func,
    /**
     * Callback fired when clicking the back button
     */
    onClose: PropTypes.func
  };

  state = { selectedLang: this.props.lang };

  handleSubmit = (lang) => {
    const { onLangChange } = this.props;
    onLangChange(lang);
  };

  handleLangClick = lang => {
    // const { onLangChange } = this.props;
    console.log('CLICKING', lang);
    // this.setState({ selectedLang: lang });
    // onLangChange(this.state.selectedLang);
  };

  render() {
    const { history, lang, langs } = this.props;
    const sortedLangs = sortLangs(lang, langs);

    return (
      <LanguageSelect
        // title={<FormattedMessage {...messages.language} />}
        title={'titleholder'}
        selectedLang={this.state.selectedLang}
        langs={sortedLangs}
        onLangClick={this.handleLangClick}
        onSubmitLang={this.handleSubmit}
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
