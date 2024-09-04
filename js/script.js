import FetchWrapper from "./fetch-wrapper.js";

const API = new FetchWrapper("https://discoveryprovider.audius.co");

const songImg = document.querySelector("#song-img");
const songTitle = document.querySelector("#song-Title"); 
const songAuthor = document.querySelector("#song-Track");
const songTrack = document.querySelector("#song-Track");
const trackPlaceholder = document.querySelector("#song-Track span");
let initialSong = 0;

const getSongInfo = async () => {
    
    try {
        
        const response = await API.get("/v1/tracks/trending?app_name=ReproductorMusica");
        const tracks = await response.json();
        trackPlaceholder.classList.remove("bar-placeholder")
        songTrack.setAttribute("src", `https://discoveryprovider.audius.co/v1/tracks/${tracks[initialSong].id}/stream`);
        
    } catch(error) {

        console.error(error);
    }
    
}

getSongInfo();