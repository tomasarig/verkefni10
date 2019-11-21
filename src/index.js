/*
https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-13
const api_key = "YKrouN435I9pXW5mTAK2OWfPc3QhOHEyvcySJNBS"
*/

import init, { FavoritesInit, loadFavourites } from './lib/display-media';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isFavourites = page.classList.contains('favourites-page');


  if (isFavourites) {
    FavoritesInit();
    loadFavourites();
  } else {
    init();
  }
});
