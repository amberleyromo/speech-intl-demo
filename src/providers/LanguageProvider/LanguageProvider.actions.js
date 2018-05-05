import { CHANGE_LANG, SET_LANGS } from './LanguageProvider.constants';

export function changeLang(lang) {
  console.log('running changeLang action');
  return {
    type: CHANGE_LANG,
    lang
  };
}

export function setLangs(langs) {
  return {
    type: SET_LANGS,
    langs
  };
}
