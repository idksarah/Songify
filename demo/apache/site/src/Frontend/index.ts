async function getSong(input) {
    let url = `http://127.0.0.1:8000/api/find-songs`;
    console.log(url);

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

let test = {
    "sessionID": "killme",
    "tags": ["help"]
};


//god im rlly sorry for the js ur about to see......
//like i'm genuinely so sorry i SQEAR ill break this up. later. lol!
let currentState = "home";
let originalText = "Enter the name of your favorite song!";

const content = document.querySelector<HTMLElement>('.content');
const title = document.querySelector('.title');

const input = document.createElement('textarea');
input.setAttribute('wrap', 'soft');
input.classList.add("input", "text");

let outsideInput = true;
let songName:String;
let appIcons = false;

const testSong = {
    title: "Wonderwall",
    artist: "Oasis",
    lyrics: `Today is gonna be the day that they're gonna throw it back to you
    And by now, you should've somehow realised what you gotta do
    I don't believe that anybody feels the way I do about you now
    And backbeat, the word is on the street that the fire in your heart is out
    I'm sure you've heard it all before, but you never really had a doubt
    I don't believe that anybody feels the way I do about you now
    And all the roads we have to walk are winding
    And all the lights that lead us there are blinding
    There are many things that I would like to say to you, but I don't know how
    Because maybe
    You're gonna be the one that saves me
    And after all
    You're my wonderwall
    Today was gonna be the day, but they'll never throw it back to you
    And by now, you should've somehow realised what you're not to do
    I don't believe that anybody feels the way I do about you now
    And all the roads that lead you there were winding
    And all the lights that light the way are blinding
    There are many things that I would like to say to you, but I don't know how
    I said maybe
    You're gonna be the one that saves me
    And after all
    You're my wonderwall
    I said maybe (I said maybe)
    You're gonna be the one that saves me
    And after all
    You're my wonderwall
    I said maybe (I said maybe)
    You're gonna be the one that saves me (saves me)
    You're gonna be the one that saves me (saves me)
    You're gonna be the one that saves me (saves me)`,
    coverUrl: "https://images.genius.com/2870a86cff5f609f220b3d84cd269248.300x300x1.jpg"
};

const testRec = {
    title: "wheells on the bussssss",
    artist: "cococmelon!",
    lyrics: `the whelles on the bugs go round n round
    round on round
    round n round!!!!`,
    coverUrl: "https://i.ytimg.com/vi/e_04ZrNroTo/maxresdefault.jpg"
};

function getSelectedText() {
    const highlightedText = window.getSelection().toString();
    return highlightedText;
}

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

const recContent = document.querySelector<HTMLDivElement>(".recContent");
let song:String, songArtist:String, songCover:HTMLImageElement, songLyrics:String;
let songInfo;

const streamingContainer = document.createElement("div");
const home = document.createElement("img");
const tryAgain = document.createElement("button");
const DOMsongCover = document.createElement("img");
const DOMsong = document.createElement("p");
const DOMsongArtist = document.createElement("p");
const spotifyLink = document.createElement("a");

const topContainer = document.querySelector(".topContainer");
const recImage = document.querySelector<HTMLImageElement>(".recImage");
const recTitle = document.querySelector(".recTitle");
const recArtist = document.querySelector(".recTitle");

function displaySongRec(song){
    alert("??????");
    console.log(song);
    recContent.innerHTML = '';
    streamingContainer.innerHTML = '';
    
    recContent.classList.remove("hidden"); //why can't it remove classes?

    streamingContainer.classList.add("streamingContainer");
    recContainer.appendChild(streamingContainer);

    recContent.appendChild(topContainer);

    if(!appIcons){
        appIcons = true;
        const spotify = document.createElement("img");
        spotify.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png";
        spotify.classList.add("spotify", "icon");
        streamingContainer.appendChild(spotify);

        spotify.addEventListener("click", () => {
            window.open(spotifyLink.toString(), "_blank");
        });
    }

    DOMsongCover.classList.add("songCover");
    DOMsongCover.src = song.coverUrl;
    topContainer.appendChild(DOMsongCover);

    DOMsong.classList.add("text", "song");
    DOMsong.textContent = song.title;
    topContainer.appendChild(DOMsong);

    DOMsongArtist.classList.add("text", "songArtist");
    DOMsongArtist.textContent = song.artist;
    topContainer.appendChild(DOMsongArtist);
}

const lyricContent = document.querySelector<HTMLDivElement>(".lyricContent");
const recRightContainer = document.createElement("div");
const recTopContainer = document.createElement("div");
let DOMlyrics = document.createElement("p");

const lyricTopContainer = document.querySelector<HTMLDivElement>(".lyricTopContainer");
const lyricBottomContainer = document.querySelector<HTMLDivElement>(".lyricBottomContainer");

function displaySongLyrics(){
    lyricContent.classList.remove("hidden");
    lyricContent.appendChild(recContainer);

    DOMlyrics.textContent = testSong.lyrics;
    DOMlyrics.classList.add("text", "lyrics");
    lyricContent.appendChild(DOMlyrics);

    recTopContainer.classList.add(".recTopContainer");
    recContainer.appendChild(recTopContainer)

    DOMsongCover.classList.add("songCover");
    recTopContainer.appendChild(DOMsongCover);

    recRightContainer.classList.add(".recRightContainer");
    recTopContainer.appendChild(recRightContainer)

    DOMsong.classList.add("text", "song");
    recRightContainer.appendChild(DOMsong);

    DOMsongArtist.classList.add("text", "songArtist");
    recRightContainer.appendChild(DOMsongArtist);
}

function checkIfUserInputText(){
    if(songName != undefined && songName != "" && songName != originalText){
        DOMsong.textContent = testSong.title;
        DOMsongCover.src = testSong.coverUrl;
        DOMsongArtist.textContent = testSong.artist;
        //spotifyLink.href = testSong.songUrl; would be vry good to have a spotify link but whatev
        //spotifyLink.target = "_blank";

        title.classList.add("hidden");
        input.classList.add("hidden");

        displaySongLyrics();
        function runOnLyricContent() {
            let highlightText = getSelectedText();
            if(highlightText != ""){
                if(highlightText.length > 100){
                    alert("Please choose lyrics under 100 characters!");
                } else {
                    console.log(highlightText);
                    lyricContent.classList.add("idkwhyhiddendoesntworkbutthisdoesso");
                    recContainer.classList.remove("hidden");
                    displaySongRec(testRec);
                }
            }
        }

        lyricContent.addEventListener("click", runOnLyricContent);

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