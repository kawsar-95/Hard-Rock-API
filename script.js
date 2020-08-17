let singleLyrics = document.querySelector(".single-lyrics");
let fancySearchResult = document.querySelector(".search-result");
let simpleSearchResult = document.querySelector(".simple-result");

// Displays the lyrics on the page
const displayLyrics = (song, artist, title) => {
  // alert
  if (!song.lyrics) {
    alert(" Lyrics not found.");
    return;
  }

  singleLyrics.innerHTML = `
        <button class="btn go-back" onclick = "showSongsResults()">& lsaquo;</button>
        <h2 class="text-success mb-4">${title} - ${artist} </h2>
        <pre class="lyric text-white">${song.lyrics}</pre>
    `;

  simpleSearchResult.style.display = "none";
  fancySearchResult.style.display = "none";
  singleLyrics.style.display = "block";
};

//  lyrics of the song
const fetchLyric = (artist, title) => {
  fetch(`https://api.lyrics.ovh/suggest/kawsar1/${artist}/${title}`)
    .then((response) => response.json())
    .then((json) => displayLyrics(json, artist, title))
    .catch((error) => alert(error));
};

//   simple design
const simpleSongResults = (songTitle, albumTitle, artistName) => {
  const simpleSong = document.createElement("div");
  simpleSong.className = "text-center";
  simpleSong.innerHTML = `
            <p class="author lead">
                <strong>${albumTitle}</strong> Album by <span>${artistName}</span> 
                <button onclick = "fetchLyric('${artistName}','${songTitle}')" class="btn btn-success">
                    Get Lyrics
                </button>
            </p>
    `;

  simpleSearchResult.appendChild(simpleSong);
};

//   fancy design
const fancySongResults = (songTitle, albumTitle, artistName) => {
  const songInfo = document.createElement("div");
  songInfo.className = "single-result row align-items-center my-3 p-3";
  songInfo.innerHTML = `
    <div class="col-md-9" id="songInfo">
        <h3 class="lyrics-name">${songTitle}</h3>
        <p class="author lead">${albumTitle} Album by <span>${artistName}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center" id="getLyrics">
        <button onclick = "fetchLyric('${artistName}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
    </div>`;

  fancySearchResult.appendChild(songInfo);
};

// Display the songs
const displaySongs = (song) => {
  const songTitle = song.title;
  const albumTitle = song.album.title;
  const artistName = song.artist.name;

  simpleSongResults(songTitle, albumTitle, artistName);
  fancySongResults(songTitle, albumTitle, artistName);
};

// Handles api song info
const handleSongs = (songs) => {
  if (!songs.data) {
    alert("Can't Fetch Any Data");
    return;
  }

  simpleSearchResult.style.display = "block";
  fancySearchResult.style.display = "block";

  for (let [index, song] of songs.data.entries()) {
    if (index == 10) {
      break;
    }
    displaySongs(song);
  }
};

// Fetch the results of the songs
const allSongs = (songName) => {
  fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then((response) => response.json())
    .then((json) => handleSongs(json))
    .catch((error) => alert(error));
};

//  search button
document.getElementById("search-song").addEventListener("click", function () {
  const songName = document.getElementById("song-name").value;

  singleLyrics.style.display = "none";
  allSongs(songName);
});
