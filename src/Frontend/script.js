async function getSong(lyric){
    console.log("r u even running");
    let url = 'http://127.0.0.1:8000/api/find-songs';

    let payload = {
        lyrics: lyric
    }

    try {
        console.log("i am running!");
        let response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
    
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log('Found songs:', data);
        console.log("uh huh");
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