var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getSong(input) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://localhost:7300/api/find-songs";
                    console.log(url);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(input)
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/, data];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var test = {
    "sessionID": "killme",
    "tags": ["help"]
};
//god im rlly sorry for the js ur about to see......
//like i'm genuinely so sorry i SQEAR ill break this up. later. lol!
var currentState = "home";
var originalText = "Enter the name of your favorite song!";
var content = document.querySelector('.content');
var title = document.querySelector('.title');
var input = document.createElement('textarea');
input.setAttribute('wrap', 'soft');
input.classList.add("input", "text");
var outsideInput = true;
var songName;
var appIcons = false;
var testSong = {
    title: "Wonderwall",
    artist: "Oasis",
    lyrics: "Today is gonna be the day that they're gonna throw it back to you\n    And by now, you should've somehow realised what you gotta do\n    I don't believe that anybody feels the way I do about you now\n    And backbeat, the word is on the street that the fire in your heart is out\n    I'm sure you've heard it all before, but you never really had a doubt\n    I don't believe that anybody feels the way I do about you now\n    And all the roads we have to walk are winding\n    And all the lights that lead us there are blinding\n    There are many things that I would like to say to you, but I don't know how\n    Because maybe\n    You're gonna be the one that saves me\n    And after all\n    You're my wonderwall\n    Today was gonna be the day, but they'll never throw it back to you\n    And by now, you should've somehow realised what you're not to do\n    I don't believe that anybody feels the way I do about you now\n    And all the roads that lead you there were winding\n    And all the lights that light the way are blinding\n    There are many things that I would like to say to you, but I don't know how\n    I said maybe\n    You're gonna be the one that saves me\n    And after all\n    You're my wonderwall\n    I said maybe (I said maybe)\n    You're gonna be the one that saves me\n    And after all\n    You're my wonderwall\n    I said maybe (I said maybe)\n    You're gonna be the one that saves me (saves me)\n    You're gonna be the one that saves me (saves me)\n    You're gonna be the one that saves me (saves me)",
    coverUrl: "https://images.genius.com/2870a86cff5f609f220b3d84cd269248.300x300x1.jpg"
};
var testRec = {
    title: "wheells on the bussssss",
    artist: "cococmelon!",
    lyrics: "the whelles on the bugs go round n round\n    round on round\n    round n round!!!!",
    coverUrl: "https://i.ytimg.com/vi/e_04ZrNroTo/maxresdefault.jpg"
};
function getSelectedText() {
    var highlightedText = window.getSelection().toString();
    return highlightedText;
}
function whenInputClicked() {
    if (input.value == originalText) {
        input.value = '';
    }
    outsideInput = false;
    content.addEventListener('click', function () {
        if (outsideInput == true) {
            whenEnterOrClickOutside();
        }
    });
}
function whenEnterOrClickOutside() {
    if (input.value == "") {
        input.classList.remove('yellowText');
        input.value = originalText;
    }
}
function handleEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (input.value == originalText || input.value == "") {
            input.classList.remove('yellowText');
        }
        else {
            input.blur();
            songName = input.value;
            checkIfUserInputText();
            whenEnterOrClickOutside();
        }
    }
}
var recContent = document.querySelector(".recContent");
var song, songArtist, songCover, songLyrics;
var songInfo;
var streamingContainer = document.createElement("div");
var home = document.createElement("img");
var tryAgain = document.createElement("button");
var DOMsongCover = document.createElement("img");
var DOMsong = document.createElement("p");
var DOMsongArtist = document.createElement("p");
var spotifyLink = document.createElement("a");
var topContainer = document.querySelector(".topContainer");
var recImage = document.querySelector(".recImage");
var recTitle = document.querySelector(".recTitle");
var recArtist = document.querySelector(".recTitle");
function displaySongRec(song) {
    alert("??????");
    console.log(song);
    recContent.innerHTML = '';
    streamingContainer.innerHTML = '';
    recContent.classList.remove("hidden"); //why can't it remove classes?
    streamingContainer.classList.add("streamingContainer");
    recContainer.appendChild(streamingContainer);
    recContent.appendChild(topContainer);
    if (!appIcons) {
        appIcons = true;
        var spotify = document.createElement("img");
        spotify.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png";
        spotify.classList.add("spotify", "icon");
        streamingContainer.appendChild(spotify);
        spotify.addEventListener("click", function () {
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
var lyricContent = document.querySelector(".lyricContent");
var recRightContainer = document.createElement("div");
var recTopContainer = document.createElement("div");
var DOMlyrics = document.createElement("p");
var lyricTopContainer = document.querySelector(".lyricTopContainer");
var lyricBottomContainer = document.querySelector(".lyricBottomContainer");
function displaySongLyrics() {
    lyricContent.classList.remove("hidden");
    lyricContent.appendChild(recContainer);
    DOMlyrics.textContent = testSong.lyrics;
    DOMlyrics.classList.add("text", "lyrics");
    lyricContent.appendChild(DOMlyrics);
    recTopContainer.classList.add(".recTopContainer");
    recContainer.appendChild(recTopContainer);
    DOMsongCover.classList.add("songCover");
    recTopContainer.appendChild(DOMsongCover);
    recRightContainer.classList.add(".recRightContainer");
    recTopContainer.appendChild(recRightContainer);
    DOMsong.classList.add("text", "song");
    recRightContainer.appendChild(DOMsong);
    DOMsongArtist.classList.add("text", "songArtist");
    recRightContainer.appendChild(DOMsongArtist);
}
function checkIfUserInputText() {
    if (songName != undefined && songName != "" && songName != originalText) {
        DOMsong.textContent = testSong.title;
        DOMsongCover.src = testSong.coverUrl;
        DOMsongArtist.textContent = testSong.artist;
        //spotifyLink.href = testSong.songUrl; would be vry good to have a spotify link but whatev
        //spotifyLink.target = "_blank";
        title.classList.add("hidden");
        input.classList.add("hidden");
        displaySongLyrics();
        function runOnLyricContent() {
            var highlightText = getSelectedText();
            if (highlightText != "") {
                if (highlightText.length > 100) {
                    alert("Please choose lyrics under 100 characters!");
                }
                else {
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
input.addEventListener("click", function () {
    input.classList.add('yellowText');
    whenInputClicked();
});
input.addEventListener("mouseleave", function () {
    outsideInput = true;
    document.addEventListener("click", function () {
        if (outsideInput == true) {
            if (input.value != originalText) {
                songName = input.value;
                input.blur();
                checkIfUserInputText();
            }
        }
    });
    whenEnterOrClickOutside;
});
input.addEventListener("keypress", function (event) {
    handleEnter(event);
});
//create some const for testing with an img, song name, lyrics, artist, and song link
//break up ur fucking files jesus christ
//take input to search through db (not rn tho), display song lyrics, allow user to highlight, then do the same song display
