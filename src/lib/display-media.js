import getRandomImage from "./nasa-api";
import { save } from "./storage";
import { createImgEl } from "./helpers";
import { createVidEl } from "./helpers";
import { load } from "./storage"

// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.


function displayImage(obj) {
    if (obj.type === 'image') {
        function goGo() {
            createImgEl(obj);
        }
        let img = new Image();
        img.src = obj.mediaUrl;
        if (img.complete) { goGo(obj) }
        img.addEventListener('load', goGo)
    };
    if (obj.type !== 'image') {
        createVidEl(obj);
    };
}
/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
    let newImgPromise = getRandomImage();
    let disp = document.querySelector('.apod');
    newImgPromise
        .then((result) => {
            if (!result.ok) {
                console.log(result.json());
                throw new Error('Non 200 status');
            };
            return result.json();
        })
        .then((data) => {
            // type, mediaUrl, text, title
            image = { type: data.media_type, mediaUrl: data.url, text: data.explanation, title: data.title };
            displayImage(image);
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
    save(image.type, image.mediaUrl, image.text, image.title);
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


function displayFavorite(img) {
    let main = document.querySelector('.favorites-body')
    if (img.type === 'image') {
        let imgEl = document.createElement('img');
        imgEl.setAttribute('src', img.mediaUrl);
        imgEl.setAttribute('class', 'apod__image');
        main.append(imgEl);
        let title = document.createElement('h2');
        title.setAttribute('class', 'apod__title');
        title.innerText = img.title
        main.append(title);
    };
    if (img.type !== 'image') {
        let vid = document.createElement('iframe');
        let vidUrl = img.mediaUrl + '?rel=0&autoplay=0&showinfo=0&autohide=1&border=0&wmode=opaque&enablejsapi=1&modestbranding=1&autohide=1&controls=0'
        vid.setAttribute('class', 'apod__image apod__video');
        vid.setAttribute('src', vidUrl);
        main.append(vid);
        let title = document.createElement('h2');
        title.setAttribute('class', '.apod__title');
        title.innerText = img.title;
    }
}
/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
    let images = load();
    if (images.length === 0) { return; }
    images.forEach((img) => displayFavorite(img));
}

