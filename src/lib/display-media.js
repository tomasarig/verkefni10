import getRandomImage from './nasa-api';
import {
  save, load, clear, clearOne,
} from './storage';
import { createImgEl, createVidEl } from './helpers';


// todo vísa í rétta hluti með import


let image; // object sem inniheldur núverandi mynd á forsíðu.

function goGo() {
  createImgEl(image);
}
function displayImage(obj) {
  if (obj.type === 'image') {
    const img = new Image();
    img.src = obj.mediaUrl;
    if (img.complete) { goGo(); }
    img.addEventListener('load', goGo);
  }
  if (obj.type !== 'image') {
    createVidEl(obj);
  }
}
/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  const newImgPromise = getRandomImage();
  newImgPromise
    .then((result) => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }
      return result.json();
    })
    .then((data) => {
      // type, mediaUrl, text, title
      image = {
        type: data.media_type, mediaUrl: data.url, text: data.explanation, title: data.title,
      };
      displayImage(image);
    })
    .catch((error) => {
      console.error(error);
    });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image.type, image.mediaUrl, image.text, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init() {
  document.getElementById('new-image-button').addEventListener('click', getNewImage);

  const clearButton = document.getElementById('clear');
  if (clearButton != null) { clearButton.addEventListener('click', clear); }
  document.getElementById('save-image-button').addEventListener('click', saveCurrentImage);
  getNewImage();
}


export function displayFavorite(img, n) {
  const main = document.querySelector('.favorites-body');
  const div = document.createElement('div');
  div.setAttribute('id', n);
  if (img.type === 'image') {
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', img.mediaUrl);
    imgEl.setAttribute('class', 'apod__image favourites__image');
    div.append(imgEl);
  }
  if (img.type !== 'image') {
    const imgEl = document.createElement('iframe');
    const vidUrl = `${img.mediaUrl}?rel=0&autoplay=0&showinfo=0&autohide=1&border=0&wmode=opaque&enablejsapi=1&modestbranding=1&autohide=1&controls=0`;
    imgEl.setAttribute('class', 'apod__image apod__video favourites__video');
    imgEl.setAttribute('src', vidUrl);
    div.append(imgEl);
  }
  div.addEventListener('dblclick', clearOne, false);

  /**ég set hérna loadFavourites til þess að myndir séu sýndar rétt og 
   * þ.a.l. er hægt að eyða réttri mynd úr local storage út frá div ID 
   * þegar tvíklikkað er á hana. veit að þetta var óþarfi en mig langaði 
   */
  div.addEventListener('dblclick', loadFavourites, false);
  const title = document.createElement('h2');
  title.setAttribute('class', 'apod__title');
  title.innerText = img.title;
  div.append(title);
  main.append(div);
}
/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  document.querySelector('main').innerHTML = '';
  const images = load();
  if (images.length === 0) { return; }
  images.forEach((img, n) => displayFavorite(img, n));
}


export function FavoritesInit() {
  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', clear);
  clearButton.addEventListener('click', loadFavourites, false);
}
