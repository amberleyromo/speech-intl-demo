import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './App.css';
import SpeechLog from '../UI/SpeechLog';
import SpeechInput from '../UI/SpeechInput';
import LanguageSelect from '../UI/LanguageSelect';
import BrowserSupport from '../UI/BrowserSupport';
import OutlinkBanner from '../UI/OutlinkBanner';

class App extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
  };

  render() {
    const { lang, dir } = this.props;

    return (
      <div className="App">
        <Helmet>
          <html lang={lang} dir={dir} />
        </Helmet>
        <BrowserSupport />
        <header className="App-header">
          <h1 className="App-title">Web Speech + Intl APIs</h1>
        </header>
        <main className="App-main">
          <LanguageSelect />
          <SpeechInput />
        </main>
        <SpeechLog />
        <OutlinkBanner />
      </div>
    );
  }  
}

const mapStateToProps = state => ({
  dir: state.language.dir,
  lang: state.language.lang
});

export default connect(mapStateToProps)(App);