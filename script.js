const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

//Create elements for links and photos

//Helper function for DRY 

function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key])
    }
}


function displayPhotos() {
  photosArray.forEach((photo) => {
    //Create a anchor element to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    //Create Image tag for 
    setAttributes(item,{
        href:photo.links.html,
        target:'_blank'
    });

    const img = document.createElement("img");
    setAttributes(img,{
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description
    });
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    //put <img> inside a then put both inside imageContainer Element
    item.appendChild(img);    
    imageContainer.appendChild(item);
  });
}

//UnSplash API
const count = 10;
const apiKey = "hB-UjtBAsNNHZ-QrjC5TRldTH4cHUrqjmEEAVCgCXoY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from UNsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch the error here
  }
}

//Check if we are scrolling to the bottom of the page 

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        console.log('load more')
        getPhotos();
    }
})



//on Load
getPhotos();
