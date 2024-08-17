async function getSong(lyric){
    let url = 'http://127.0.0.1:8000/api/find-songs';
    let tags = lyric.split(',').map(tag => tag.trim());

    let payload = {
        lyrics: lyric
    }

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
            params: { tag: tags.join(',') }
        });
    
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log('Found songs:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

getSong('dark, dark nights and violent things');

let content = document.querySelector(".content");

let input = document.createElement("textarea");
input.setAttribute("wrap", "soft")
input.setAttribute("cols", "38");
input.classList.add("input", "text");
let outsideInput = true;

let lyrics;

function whenInputClicked() {
    if(input.value == "Enter some song lyrics!"){
        input.value = "";
    }
    outsideInput = false;
    document.addEventListener("click", () => {
        if(outsideInput == true){
            whenEnterOrClickOutside();
        }
    })
}

function whenEnterOrClickOutside(){
    if(input.value == ""){
        input.value = "Enter some song lyrics!";
    }
}

function handleEnter(event){
    if (event.key === "Enter") {
        event.preventDefault();
        input.blur();
        lyrics = input.value;
        whenEnterOrClickOutside();
    }
}

content.appendChild(input);
input.classList.add("input", "text");
input.value = "Enter some song lyrics!";
input.addEventListener("click", () => {
    whenInputClicked();
})

input.addEventListener("mouseleave", () => {
    outsideInput = true;
    document.addEventListener("click", () => {
        if(outsideInput == true){
            if(input.value != "Enter some song lyrics!"){
                lyrics = input.value;
            }
        }
    })
    whenEnterOrClickOutside;
});

input.addEventListener("keypress", (event) => {
    handleEnter(event);
});