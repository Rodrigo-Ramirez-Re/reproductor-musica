class FetchWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    put(endpoint, body) {
        return this.#send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this.#send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this.#send("delete", endpoint, body);
    }

    #send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const API = new FetchWrapper("https://discoveryprovider.audius.co");

const songImg = document.querySelector("#song-img");
const songTitle = document.querySelector("#song-Title"); 
const songAuthor = document.querySelector("#song-Track");
const songTrack = document.querySelector("#song-Track");
const trackPlaceholder = document.querySelector("#bar-placeholder");
let initialSong = 0;

const getSongInfo = async () => {
    
    try {
        
        const response = await API.get("/v1/tracks/trending?app_name=ReproductorMusica");
        const tracks = await response.json();
        trackPlaceholder.classList.remove("bar-placeholder")
        songTrack.setAttribute("src", `https://discoveryprovider.audius.co/v1/tracks/${tracks[initialSong].id}/stream`);
        console.log(tracks[initialSong].id);
        
    } catch(error) {

        console.error(error);
    }
    
}

trackPlaceholder.classList.toggle("bar-placeholder");