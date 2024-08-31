/*const spotifyID = '872eb044caa442049aec8c2ffdfb11a7';
const spotifySecret = 'c7dfaa9ed8bb4eed94c926a1ffdfd60c'; //should make this a local var on my comp but im kind of too lazy...

//apis: musixmatch, geniusapi, bunch of pyhton libs 

const geniusID = 'V6944-ceA2IL0n5RaZN8gSJ_nSG33D_-_Onbkg19F3cA-lVcXYgdj66dbHb7cbMI';
const geniusSecret = 'z3oXktmqmxFxOUnVi1R7LmPrm_aipwGWtHrjgDn6LyEpLz9vFjoFUheAPF4pIXU1VqiFHZGTlpdXqw9dUMUEkA';

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
}*/

const content = document.querySelector<HTMLElement>('.content');
const title = document.querySelector('.title');

const input = document.createElement('textarea');
input.setAttribute('wrap', 'soft');
input.classList.add("input", "text");

let outsideInput = true;
let lyrics:String;
let appIcons = false;

function whenInputClicked(){
    if(input.value == 'Enter a song/artist name!'){
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
        input.value = 'Enter a song/artist name!';
    }
}

function handleEnter(event){
    if (event.key === "Enter") {
        event.preventDefault();
        if(input.value == 'Enter a song/artist name!' || input.value == ""){
            input.classList.remove('yellowText');
        } else {
            input.blur();
            lyrics = input.value;
            checkIfUserInputText()
            whenEnterOrClickOutside();
        }
    }
}

content.appendChild(input);
input.classList.add("input", "text");
input.value = 'Enter a song/artist name!';
input.addEventListener("click", () => {
    input.classList.add('yellowText');
    whenInputClicked();
})

input.addEventListener("mouseleave", () => {
    outsideInput = true;
    document.addEventListener("click", () => {
        if(outsideInput == true){
            if(input.value != 'Enter a song/artist name!'){
                lyrics = input.value;
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

const songContent = document.querySelector<HTMLElement>(".songContent");
let song:String, songArtist:String, songCover:HTMLImageElement, songLyrics:String;
let songInfo;

const songContainer = document.createElement("div");
const streamingContainer = document.createElement("div");
const topContainer = document.createElement("div");
const home = document.createElement("img");
const tryAgain = document.createElement("button");
const DOMsongCover = document.createElement("img");
const DOMsong = document.createElement("p");
const DOMsongArtist = document.createElement("p");
const spotifyLink = document.createElement("a");

function checkIfUserInputText(){
    /*if(lyrics != undefined || lyrics != "" || lyrics != 'Enter a song/artist name!'){
        searchSong(lyrics).then(result => {
            songInfo = result;
            DOMsong.textContent = songInfo.name;
            DOMsongCover.src = songInfo.coverUrl;
            DOMsongArtist.textContent = songInfo.artist;
            spotifyLink.href = songInfo.songUrl;
            spotifyLink.target = "_blank";
        });

        title.classList.add("hidden");
        input.classList.add("hidden");

        if(!appIcons){
            songContainer.classList.add("songContainer");
            songContent.append(songContainer);

            songContainer.appendChild(topContainer);
            topContainer.classList.add("topContainer");

            home.src = "https://i.pinimg.com/originals/d7/34/6c/d7346c03444c44944cf2f5b5674ccf27.png"
            home.classList.add("home");
            topContainer.appendChild(home);

            tryAgain.textContent = "Not the right song? Try again!";
            tryAgain.classList.add("tryAgain");
            topContainer.appendChild(tryAgain);
    
            streamingContainer.classList.add("streamingContainer");
            songContent.append(streamingContainer);
            
            const spotify = document.createElement("img");
            spotify.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png";
            spotify.classList.add("spotify", "icon");
            streamingContainer.append(spotify);

            spotify.addEventListener("click", () => {
                window.open(spotifyLink.toString(), "_blank");
            });
    
            DOMsongCover.classList.add("songCover");
            songContainer.appendChild(DOMsongCover);
    
            DOMsong.classList.add("text", "song");
            songContainer.appendChild(DOMsong);
    
            DOMsongArtist.classList.add("text", "songArtist");
            songContainer.appendChild(DOMsongArtist);

            appIcons = true;
        }
    }*/
}