//god im rlly sorry for the js ur about to see......

/*const spotifyID = '872eb044caa442049aec8c2ffdfb11a7';
const spotifySecret = 'c7dfaa9ed8bb4eed94c926a1ffdfd60c'; //should make this a local var on my comp but im kind of too lazy...*/

let currentState = "home";
let originalText = "Enter the name of your favorite song!";

async function getSpotifyToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(spotifyID + ':' + spotifySecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

async function searchSpotify(query, token) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    if (data.tracks.items.length > 0) {
        const track = data.tracks.items[0];
        return {
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            coverUrl: track.album.images[0].url,
            songUrl: track.external_urls.spotify
        };
    }
    return null;
}

async function searchSong(query) {
    try {
        const spotifyToken = await getSpotifyToken();
        const songInfo = await searchSpotify(query, spotifyToken);
        if (songInfo) {
            return {
                ...songInfo,
            };
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const content = document.querySelector<HTMLElement>('.content');
const title = document.querySelector('.title');

const input = document.createElement('textarea');
input.setAttribute('wrap', 'soft');
input.classList.add("input", "text");

let outsideInput = true;
let songName:String;
let appIcons = false;

function whenInputClicked(){
    if(input.value == originalText){
        input.value = '';
    }
    outsideInput = false;
    content.addEventListener('click', () => {
        if(outsideInput == true){
            whenEnterOrClickOutside();
        }
    })
}

function whenEnterOrClickOutside(){
    if(input.value == ""){
        input.classList.remove('yellowText');
        input.value = originalText;
    }
}

function handleEnter(event){
    if (event.key === "Enter") {
        event.preventDefault();
        if(input.value == originalText || input.value == ""){
            input.classList.remove('yellowText');
        } else {
            input.blur();
            songName = input.value;
            checkIfUserInputText()
            whenEnterOrClickOutside();
        }
    }
}

const recContent = document.querySelector<HTMLElement>(".recContent");
let song:String, songArtist:String, songCover:HTMLImageElement, songLyrics:String;
let songInfo;

const recContainer = document.createElement("div");
const streamingContainer = document.createElement("div");
const topContainer = document.createElement("div");
const home = document.createElement("img");
const tryAgain = document.createElement("button");
const DOMsongCover = document.createElement("img");
const DOMsong = document.createElement("p");
const DOMsongArtist = document.createElement("p");
const spotifyLink = document.createElement("a");

function displaySongRec(){
    recContainer.classList.add("recContainer");
    recContent.classList.remove("hidden");
    recContent.append(recContainer);

    recContainer.appendChild(topContainer);

    streamingContainer.classList.add("streamingContainer");
    recContent.append(streamingContainer);
    
    const spotify = document.createElement("img");
    spotify.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png";
    spotify.classList.add("spotify", "icon");
    streamingContainer.append(spotify);

    spotify.addEventListener("click", () => {
        window.open(spotifyLink.toString(), "_blank");
    });

    DOMsongCover.classList.add("songCover");
    recContainer.appendChild(DOMsongCover);

    DOMsong.classList.add("text", "song");
    recContainer.appendChild(DOMsong);

    DOMsongArtist.classList.add("text", "songArtist");
    recContainer.appendChild(DOMsongArtist);
}

const lyricContent = document.querySelector<HTMLDivElement>(".lyricContent");

const lyricTopContainer = document.querySelector<HTMLDivElement>(".lyricTopContainer");
const lyricBottomContainer = document.querySelector<HTMLDivElement>(".lyricBottomContainer");

function displaySongLyrics(){
    lyricContent.classList.add("recContainer");
    lyricContent.classList.remove("hidden");
    lyricContent.append(recContainer);

    recContainer.appendChild(topContainer);

    streamingContainer.classList.add("streamingContainer");
    lyricContent.append(streamingContainer);

    DOMsongCover.classList.add("songCover");
    recContainer.appendChild(DOMsongCover);

    DOMsong.classList.add("text", "song");
    recContainer.appendChild(DOMsong);

    DOMsongArtist.classList.add("text", "songArtist");
    recContainer.appendChild(DOMsongArtist);
}

function checkIfUserInputText(){
    if(songName != undefined && songName != "" && songName != originalText){
        searchSong(songName).then(result => {
            songInfo = result;
            DOMsong.textContent = songInfo.name;
            DOMsongCover.src = songInfo.coverUrl;
            DOMsongArtist.textContent = songInfo.artist;
            spotifyLink.href = songInfo.songUrl;
            spotifyLink.target = "_blank";
        });

        title.classList.add("hidden");
        input.classList.add("hidden");

        if(!appIcons){ //move this one
            appIcons = true;
            displaySongRec();
        }
    }
}

content.appendChild(input);
input.classList.add("input", "text");
input.value = originalText;
input.addEventListener("click", () => {
    input.classList.add('yellowText');
    whenInputClicked();
})

input.addEventListener("mouseleave", () => {
    outsideInput = true;
    document.addEventListener("click", () => {
        if(outsideInput == true){
            if(input.value != originalText){
                songName = input.value;
                input.blur();
                checkIfUserInputText()
            }
        }
    })
    whenEnterOrClickOutside;
});

input.addEventListener("keypress", (event) => {
    handleEnter(event);
});

//create some const for testing with an img, song name, lyrics, artist, and song link
//break up ur fucking files jesus christ
//take input to search through db (not rn tho), display song lyrics, allow user to highlight, then do the same song display