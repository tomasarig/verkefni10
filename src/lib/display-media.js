import getRandomImage from "./nasa-api";
import {save} from "./storage";



// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
    let newImgPromise = getRandomImage();
    let disp = document.querySelector('.apod');
    disp.querySelector('.apod__image').setAttribute('src', '')
    newImgPromise
    .then((result) => {
        if(!result.ok) {
            console.log(result.json());
            throw new Error('Non 200 status');
        };
        return result.json();
    })
    .then((data) => {
        // type, mediaUrl, text, title
        title = data.title;
        text = data.explanation;
        img = disp.querySelector('.apod__image')
        image = data;
        if (image.media_type !== 'image') {
            console.log(image);
            let vid = document.createElement('iframe');
            let vidUrl = image.url + '?rel=0&autoplay=0&showinfo=0&autohide=1&border=0&wmode=opaque&enablejsapi=1&modestbranding=1&autohide=1&controls=0'
            vid.setAttribute('class', 'apod__image');
            //vid.setAttribute('height', 560);
            //vid.setAttribute('width', 995);
            vid.setAttribute('src', vidUrl);
            img.replaceWith(vid);      
        };
        if (image.media_type === 'image') {
            console.log('reynum aftur');
            getNewImage();return;
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', image.url);
            imgEl.setAttribute('class', 'apod__image');
            img.replaceWith(imgEl)
        };
        disp.querySelector('.apod__title').textContent = title;
        disp.querySelector('.apod__text').textContent = text;

/**
 *      <img class="apod__image">
      <h2 class="apod__title"></h2>
      <p class="apod__text"></p>
 */

    })
    .catch((error) => {
        console.error(error);
    });
    return;
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
    save(image.media_type, image.url, image.explanation, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
    document.getElementById('new-image-button').addEventListener('click', getNewImage);
    document.getElementById('save-image-button').addEventListener('click', saveCurrentImage);
    getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {

}
