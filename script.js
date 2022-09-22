'use strict';

const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let photosArray = [];

//Helper Function to Set Attributes on Dom Element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//CREATE ELEMENTS
function displayPhotos() {
  //Run for each
  photosArray.forEach((photo) => {
    //Crate <a>
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    //Create <img>
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Put img inside a, then put both inside Container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//UNSPLASH API
const count = 10;
const apiKey = `7pMZAi607cBugfBZ0G-N1nI3BDZzw13kqTpxhJ-b05I`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// GET PHOTOS FROM UNSPLASH API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //error
  }
}

//Check to see if scrolling near bottom of the page, Load more
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
  }
});
//On Load
getPhotos();
