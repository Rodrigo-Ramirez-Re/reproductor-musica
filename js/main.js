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


/* API */
const API = new FetchWrapper("https://discoveryprovider.audius.co");

/* elements */
const songImg = document.querySelector("#song-img");
const songTitle = document.querySelector("#song-title"); 
const songAuthor = document.querySelector("#song-author");
const songTrack = document.querySelector("#song-track");
const songNext = document.querySelector("#song-next");
const songBefore = document.querySelector("#song-before");
const imgPlaceholder = document.querySelector(".img-placeholder");



/* song number */
let initialSong = 0;

const getSongInfo = async () => {
    
    try {

        
        /* Getting Data */
        const tracks = await API.get("/v1/tracks/trending?app_name=ReproductorMusica");
        songTrack.setAttribute("src", `https://discoveryprovider.audius.co/v1/tracks/${tracks.data[initialSong].id}/stream`);
        songImg.setAttribute("src", tracks.data[initialSong].artwork["480x480"]);
        songTitle.textContent = tracks.data[initialSong].title;
        songAuthor.textContent = tracks.data[initialSong].user.name;

        songImg.classList.remove("hide");
        imgPlaceholder.classList.remove("img-placeholder");

        
    } catch (error) {

        console.error(error);
    
    }
    console.log(imgPlaceholder);
}


songNext.addEventListener("click", () => {
    songImg.classList.add("hide");
    imgPlaceholder.classList.add("img-placeholder");
    initialSong += 1;
    getSongInfo();
});

songBefore.addEventListener("click", () => {
    if(initialSong !== 0) {
        initialSong -= 1;
    }
    songImg.classList.add("hide");
    imgPlaceholder.classList.add("img-placeholder");
    getSongInfo();
});


getSongInfo();
