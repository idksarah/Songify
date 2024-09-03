var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var spotifyID = '872eb044caa442049aec8c2ffdfb11a7';
var spotifySecret = 'c7dfaa9ed8bb4eed94c926a1ffdfd60c'; //should make this a local var on my comp but im kind of too lazy...
//apis: musixmatch, geniusapi, bunch of pyhton libs 
var geniusID = 'V6944-ceA2IL0n5RaZN8gSJ_nSG33D_-_Onbkg19F3cA-lVcXYgdj66dbHb7cbMI';
var geniusSecret = 'z3oXktmqmxFxOUnVi1R7LmPrm_aipwGWtHrjgDn6LyEpLz9vFjoFUheAPF4pIXU1VqiFHZGTlpdXqw9dUMUEkA';
function getSpotifyToken() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://accounts.spotify.com/api/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic ' + btoa(spotifyID + ':' + spotifySecret)
                        },
                        body: 'grant_type=client_credentials'
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.access_token];
            }
        });
    });
}
function searchSpotify(query, token) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, track;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.spotify.com/v1/search?q=".concat(encodeURIComponent(query), "&type=track&limit=1"), {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.tracks.items.length > 0) {
                        track = data.tracks.items[0];
                        return [2 /*return*/, {
                                name: track.name,
                                artist: track.artists[0].name,
                                album: track.album.name,
                                coverUrl: track.album.images[0].url,
                                songUrl: track.external_urls.spotify
                            }];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
function searchSong(query) {
    return __awaiter(this, void 0, void 0, function () {
        var spotifyToken, songInfo_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getSpotifyToken()];
                case 1:
                    spotifyToken = _a.sent();
                    return [4 /*yield*/, searchSpotify(query, spotifyToken)];
                case 2:
                    songInfo_1 = _a.sent();
                    if (songInfo_1) {
                        return [2 /*return*/, __assign({}, songInfo_1)];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var content = document.querySelector('.content');
var title = document.querySelector('.title');
var input = document.createElement('textarea');
input.setAttribute('wrap', 'soft');
input.classList.add("input", "text");
var outsideInput = true;
var lyrics;
var appIcons = false;
function whenInputClicked() {
    if (input.value == 'Enter a song/artist name!') {
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
        input.value = 'Enter a song/artist name!';
    }
}
function handleEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (input.value == 'Enter a song/artist name!' || input.value == "") {
            input.classList.remove('yellowText');
        }
        else {
            input.blur();
            lyrics = input.value;
            checkIfUserInputText();
            whenEnterOrClickOutside();
        }
    }
}
content.appendChild(input);
input.classList.add("input", "text");
input.value = 'Enter a song/artist name!';
input.addEventListener("click", function () {
    input.classList.add('yellowText');
    whenInputClicked();
});
input.addEventListener("mouseleave", function () {
    outsideInput = true;
    document.addEventListener("click", function () {
        if (outsideInput == true) {
            if (input.value != 'Enter a song/artist name!') {
                lyrics = input.value;
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
var recContent = document.querySelector(".recContent");
var song, songArtist, songCover, songLyrics;
var songInfo;
var recContainer = document.createElement("div");
var streamingContainer = document.createElement("div");
var topContainer = document.createElement("div");
var home = document.createElement("img");
var tryAgain = document.createElement("button");
var DOMsongCover = document.createElement("img");
var DOMsong = document.createElement("p");
var DOMsongArtist = document.createElement("p");
var spotifyLink = document.createElement("a");
function checkIfUserInputText() {
    if (lyrics != undefined || lyrics != "" || lyrics != 'Enter a song/artist name!') {
        searchSong(lyrics).then(function (result) {
            songInfo = result;
            DOMsong.textContent = songInfo.name;
            DOMsongCover.src = songInfo.coverUrl;
            DOMsongArtist.textContent = songInfo.artist;
            spotifyLink.href = songInfo.songUrl;
            spotifyLink.target = "_blank";
        });
        title.classList.add("hidden");
        input.classList.add("hidden");
        if (!appIcons) {
            recContainer.classList.add("recContainer");
            recContent.classList.remove("hidden");
            recContent.append(recContainer);
            recContainer.appendChild(topContainer);
            streamingContainer.classList.add("streamingContainer");
            recContent.append(streamingContainer);
            var spotify = document.createElement("img");
            spotify.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png";
            spotify.classList.add("spotify", "icon");
            streamingContainer.append(spotify);
            spotify.addEventListener("click", function () {
                window.open(spotifyLink.toString(), "_blank");
            });
            DOMsongCover.classList.add("songCover");
            recContainer.appendChild(DOMsongCover);
            DOMsong.classList.add("text", "song");
            recContainer.appendChild(DOMsong);
            DOMsongArtist.classList.add("text", "songArtist");
            recContainer.appendChild(DOMsongArtist);
            appIcons = true;
        }
    }
}
