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