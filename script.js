//UnSplash API 
const count = 10;
const apiKey = "hB-UjtBAsNNHZ-QrjC5TRldTH4cHUrqjmEEAVCgCXoY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from UNsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

    } catch (error) {
        //Catch the error here
    }
}

getPhotos()