import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import configureStore from './store';

import SpeechProvider from './providers/SpeechProvider';
import LanguageProvider from './providers/LanguageProvider';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}> 
        <SpeechProvider> 
            <LanguageProvider>
                <BrowserRouter>
                    <Route path="/" component={App} />
                </BrowserRouter>
            </LanguageProvider>
        </SpeechProvider>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
