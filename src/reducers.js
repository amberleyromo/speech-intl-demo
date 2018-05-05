import {combineReducers} from 'redux';
import appReducer from './components/App/App.reducer';
import speechReducer from './providers/SpeechProvider/SpeechProvider.reducer';
import langReducer from './providers/LanguageProvider/LanguageProvider.reducer';

export default function createReducer() {
    return combineReducers({
        appReducer,
        speech: speechReducer,
        language: langReducer
    });
}
