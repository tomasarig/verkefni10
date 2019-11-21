import { randomDate } from './helpers';


/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const myKey = 'YKrouN435I9pXW5mTAK2OWfPc3QhOHEyvcySJNBS';

// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URI = 'https://api.nasa.gov/planetary/apod';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  const randDate = randomDate();
  const params = { api_key: myKey, date: randDate };
  const url = new URL(URI);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  return fetch(url);
}
