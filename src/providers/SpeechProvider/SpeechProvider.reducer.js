import {
    RECEIVE_VOICES,
    CHANGE_VOICE,
    CHANGE_PITCH,
    CHANGE_RATE,
    CHANGE_VOLUME,
    START_SPEECH,
    END_SPEECH,
    LOG_TTS
  } from './SpeechProvider.constants';
  
  import { CHANGE_LANG } from '../LanguageProvider/LanguageProvider.constants';
  
  const initialState = {
    voices: [],
    langs: [],
    options: {
      lang: '',
      voiceURI: null,
      pitch: 1.0,
      rate: 1.0,
      volume: 1
    },
    isSpeaking: false,
    vocalization: ''
  };
  
  function speechProviderReducer(state = initialState, action) {
    switch (action.type) {
      case RECEIVE_VOICES:
        return {
          ...state,
          voices: action.voices,
          langs: [...new Set(action.voices.map(voice => voice.lang))].sort()
        };
      case CHANGE_VOICE:
        return {
          ...state,
          options: {
            ...state.options,
            voiceURI: action.voiceURI,
            lang: action.lang
          }
        };
      case CHANGE_LANG:
        return {
          ...state,
          options: {
            ...state.options,
            lang: action.lang,
            voiceURI: state.voices.find(voice => voice.lang === action.lang)
              .voiceURI
          }
        };
      case CHANGE_PITCH:
        return { ...state, options: { ...state.options, pitch: action.pitch } };
      case CHANGE_RATE:
        return { ...state, options: { ...state.options, rate: action.rate } };
      case CHANGE_VOLUME:
      console.log('running CHANGE_VOLUME reducer');
      console.log('state.options', state.options);
      console.log('action.volume', action.volume)
        return { ...state, options: { ...state.options, volume: action.volume } };
      case START_SPEECH:
        return { ...state, isSpeaking: action.isSpeaking };
      case END_SPEECH:
        return { ...state, isSpeaking: action.isSpeaking };
      case LOG_TTS:
        console.log('LOG_TTS action', action);
        return {...state, vocalization: action.vocalization }
      default:
        return state;
    }
  }
  
  export default speechProviderReducer;
  