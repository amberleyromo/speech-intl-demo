import {
    RECEIVE_VOICES,
    CHANGE_VOICE,
    CHANGE_PITCH,
    CHANGE_RATE,
    CHANGE_VOLUME,
    START_SPEECH,
    END_SPEECH,
    LOG_TTS,
    CHECK_SPEECH_API,
    CHECK_INTL_API,
  } from './SpeechProvider.constants';
  
  import { CHANGE_LANG } from '../LanguageProvider/LanguageProvider.constants';
  
  const initialState = {
    supportsSpeechApi: false,
    supportsIntlApi: false,
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
        return { ...state, options: { ...state.options, volume: action.volume } };
      case START_SPEECH:
        return { ...state, isSpeaking: action.isSpeaking };
      case END_SPEECH:
        return { ...state, isSpeaking: action.isSpeaking };
      case LOG_TTS:
        return {...state, vocalization: action.vocalization }
      case CHECK_SPEECH_API:
        return {...state, supportsSpeechApi: action.supportsSpeechApi }
        case CHECK_INTL_API:
        return {...state, supportsIntlApi: action.supportsIntlApi }
      default:
        return state;
    }
  }
  
  export default speechProviderReducer;
  