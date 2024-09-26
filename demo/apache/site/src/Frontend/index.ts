let lyrics:boolean = false;

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
    "tags": ["Drake"]
};


function getPrompt(songLyrics, song) { 
    return `
    Recommend a song similar to ${song} if these are my favorite lyrics: ${songLyrics} 
    `;
}
async function sendToLlama(prompt) { //maria
    const response = await fetch('https://ollama-api-url', {  // Change to the real one
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt })
    });
    const data = await response.json();
    return data.result;
}

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
    There are many things that I would like to say to you, but I don't know`,
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
streamingContainer.classList.add("streamingContainer");

const home = document.createElement("img");
const tryAgain = document.createElement("button");

const spotifyLink = document.createElement("a");

const recCover = document.querySelector<HTMLImageElement>(".recCover");
const recSong = document.querySelector(".recSong");
const recArtist = document.querySelector(".recArtist");

function displaySongRec(song){
    song = testRec; //this is where u put the ollmam rec
    console.log(song);

    lyrics = true;
    lyricContent.classList.add("hidden");

    //recContent.appendChild(streamingContainer); add back if u can grab the spotify links

    recCover.src = song.coverUrl;
    console.log(recCover.src);

    recSong.textContent = song.title;
    console.log(recSong.textContent);

    recArtist.textContent = song.artist;
    console.log(recArtist.textContent);

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
}

const lyricContent = document.querySelector<HTMLDivElement>(".lyricContent");
const lyricRightContainer = document.querySelector<HTMLDivElement>(".lyricRightContainer");
const topRecContent = document.querySelector<HTMLDivElement>(".topRecContent");

const lyricTopContainer = document.querySelector<HTMLDivElement>(".lyricTopContainer");
const lyricBottomContainer = document.querySelector<HTMLDivElement>(".lyricBottomContainer");

const lyricCover = document.querySelector<HTMLImageElement>(".lyricCover");
const lyricSong = document.querySelector<HTMLParagraphElement>(".lyricSong");
const lyricArtist = document.querySelector<HTMLParagraphElement>(".lyricArtist");
const lyricLyrics = document.querySelector<HTMLParagraphElement>(".lyricLyrics");


function displaySongLyrics(song){
    song=testSong; //this is where u should be querying tali's thing btw
    if(!lyrics){
        lyricContent.classList.remove("hidden");
        lyricSong.textContent = song.title;
        lyricCover.src = song.coverUrl;
        lyricArtist.textContent = song.artist;
    }
    lyricLyrics.textContent = song.lyrics;
}

function checkIfUserInputText(){
    if(songName != undefined && songName != "" && songName != originalText){
        //spotifyLink.href = testSong.songUrl; would be vry good to have a spotify link but whatev
        //spotifyLink.target = "_blank";

        title.classList.add("hidden");
        input.classList.add("hidden");

        displaySongLyrics(input.value);
        function runOnLyricContent() {
            let highlightText = getSelectedText();
            if(highlightText != ""){
                if(highlightText.length > 100){
                    alert("Please choose lyrics under 100 characters!");
                } else {
                    console.log("reccing");
                    console.log(highlightText);
                    lyricContent.classList.add("hidden");
                    recContent.classList.remove("hidden");
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