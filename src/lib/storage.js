/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';
/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const imagesString = window.localStorage.getItem(LOCALSTORAGE_KEY);
  if (!imagesString) { return []; }
  return JSON.parse(imagesString);
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  const imageJSON = {
    type, mediaUrl, text, title,
  };
  let images = load();
  images = images.concat(imageJSON);
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(images));
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

/**
 * eyðir einni mynd úr localstorage og favorites
 * @param {*} obj event þegar tvíklikkað á element sem á að eyða
 */
export function clearOne(obj) {
  const imagesString = window.localStorage.getItem(LOCALSTORAGE_KEY);
  const images = JSON.parse(imagesString);
  images.splice(obj.path[1].id, 1);
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(images));
}
