const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


let photosArray = [];

//Check if all images are loaded

function imageLoaded (){
    console.log('image Loaded')
    imagesLoaded ++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log("ready =", ready)
    }
}


//Create elements for links and photos

//Helper function for DRY 

function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key])
    }
}


function displayPhotos() {
    imagesLoaded = 0;
    totalImages  = photosArray.length;
    console.log('total images', totalImages)
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

    //Event Listener when image loaded is complete
    img.addEventListener('load', imageLoaded())
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    //put <img> inside a then put both inside imageContainer Element
    item.appendChild(img);    
    imageContainer.appendChild(item);
  });
}

//UnSplash API
const count = 30;
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
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})



//on Load
getPhotos();
