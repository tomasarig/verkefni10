
/**
 * Hreinsa börn úr elementi
 *
 * @param {object} element Element sem á að hreinsa börn úr
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Búa til element og aukalega setja börn ef send með
 *
 * @param {string} name Nafn á element
 * @param  {...any} children Börn fyrir element
 */
export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
* Skilar tölu af handahófi á bilinu [min, max]
*/
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * skilar dagsetningu af handhófi á milli dagsins í dag og 16.6.2019
 */
export function random_date() {
  let date1 = new Date("06/19/1995");
  let date2 = new Date();
  let randDate = new Date(randomNumber(date1.valueOf(), date2.valueOf()))
  //önnur leið
  //let days_interval = Math.floor((date2 - date1)/(1000*60*60*24));
  //date1.setDate(date1.getDate() + Math.floor(Math.random() * days_interval));
  return randDate.toISOString().substring(0,10);
}