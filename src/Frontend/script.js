async function getSong(input) {
    let queryParam = encodeURIComponent(JSON.stringify(input));
    console.log(queryParam)
    let url = `http://127.0.0.1:8000/api/find-songs?tag=${queryParam}`;
    console.log(url);

    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "sessionID": "killme",
                "tags": ["help"]})
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

//

let content = document.querySelector(".content");
let title = document.querySelector(".title");

let input = document.createElement("textarea");
input.setAttribute("wrap", "soft")
input.classList.add("input", "text");
let outsideInput = true;

let lyrics;

function whenInputClicked() {
    if(input.value == "Enter some lyrics!"){
        input.value = "";
    }
    outsideInput = false;
    content.addEventListener("click", () => {
        if(outsideInput == true){
            whenEnterOrClickOutside();
        }
    })
}

function whenEnterOrClickOutside(){
    if(input.value == ""){
        input.classList.remove("yellowText");
        input.value = "Enter some lyrics!";
    }
}

function handleEnter(event){
    if (event.key === "Enter") {
        event.preventDefault();
        if(input.value == "Enter some lyrics!" || input.value == ""){
            input.classList.remove("yellowText");
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
input.value = "Enter some lyrics!";
input.addEventListener("click", () => {
    input.classList.add("yellowText");
    whenInputClicked();
})

input.addEventListener("mouseleave", () => {
    outsideInput = true;
    document.addEventListener("click", () => {
        if(outsideInput == true){
            if(input.value != "Enter some lyrics!"){
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

let songContent = document.querySelector(".songContent");
let song, songArtist, songCover, songLyrics; //assuming only one song is returned
song = "Don't Like You Anymore";
songArtist = "Dallon Weekes"
songLyrics = `[Verse 1]
Well, I used to have a pretty face
And it used to be so commonplace
That I’d always get what I want
And you’d always get what you want

[Chorus]
And I don’t like you anymore
And I don’t like you anymore
But why not?
But why not?

[Verse 2]
Oh, don’t you think it's swell
Oh, you look so fancy but I can tell
You’re not getting on with your life
You’re not getting on with your life

[Chorus]
And I don’t like you anymore
And I don’t like you anymore
So just cut yourself with a knife
Just cut yourself with a knife

[Bridge]
If you don’t love me anymore
I think I’ll kill myself
Because I’m sure as sure can be
There is nobody else for you but me
If you don’t love me anymore
I think I’ll kill myself
Because I’m sure as sure can be
There is nobody else for you but me

[Verse 3]
Well, I used to have a pretty face
And it used to be so commonplace
That I’d always get what I want
And you’d always get what you want`;

function checkIfUserInputText(){
    if(lyrics != undefined || lyrics != "" || lyrics != "Enter some lyrics!"){
        title.classList.add("hidden");
        input.classList.add("hidden");

        let songContainer = document.createElement("div");
        songContainer.classList.add("songContainer");
        songContent.append(songContainer);

        let streamingContainer = document.createElement("div");
        streamingContainer.classList.add("streamingContainer");
        songContent.append(streamingContainer);
        
        /*let spotify = document.createElement("img");
        spotify.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png";
        spotify.classList.add("spotify", "icon");
        streamingContainer.append(spotify);

        let itunes = document.createElement("img");
        itunes.src = "https://static.vecteezy.com/system/resources/previews/046/437/292/non_2x/itunes-music-icon-free-png.png";
        itunes.classList.add("itunes", "icon");
        streamingContainer.append(itunes);*/

        let DOMsongCover = document.createElement("img");
        DOMsongCover.src = "https://images.genius.com/3e7e4a945f18d67189bbb5a603a3e21a.600x600x1.jpg"
        DOMsongCover.classList.add("songCover");
        songContainer.appendChild(DOMsongCover);

        DOMsong = document.createElement("p");
        DOMsong.textContent = song;
        DOMsong.classList.add("text", "song");
        songContainer.appendChild(DOMsong);

        DOMsongArtist = document.createElement("p");
        DOMsongArtist.textContent = songArtist;
        DOMsongArtist.classList.add("text", "songArtist");
        songContainer.appendChild(DOMsongArtist);

        DOMsongLyrics = document.createElement("p");
        DOMsongLyrics.textContent = songLyrics;
        DOMsongLyrics.classList.add("text", "songLyrics");
        songContainer.appendChild(DOMsongLyrics);
    }
}