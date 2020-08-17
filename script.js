//load data and key
const musicLyricsApp = {
  key: "2c1ebdc953641626c209cf060c2fe39f",
  baseUrl: "https://api.lyrics.ovh/suggest/kawsar1",
};

//fetch Lyrics API
function lyricsAPI(song) {
  fetch(
    `${musicLyricsApp.baseUrl}?q=${song}&appId=${musicLyricsApp.key}&units=metric`
  )
    .then((lyricsCheck) => {
      return lyricsCheck.json();
    })
    .then(lyricsShow);
}
//Search Button Handler

document.getElementById("searchButton").addEventListener("click", () => {
  const lyricsSearch = document.getElementById("searchSong").value;

  lyricsAPI(lyricsSearch);
});

function lyricsShow(lyricsCheck) {
  console.log(lyricsCheck);
  // let setCity = document.getElementById("setCity");
  // setCity.innerHTML = `${lyricsCheck.name} ${lyricsCheck.sys.country}`;
  // let setDegree = document.getElementById("degree");
  // setDegree.innerHTML = `${lyricsCheck.main.temp}`;
  // let weatherName = document.getElementById("weatherName");
  // weatherName.innerHTML = `${lyricsCheck.weather[0].main}`;
  // // let min = document.getElementById("min");
  // //    min.innerHTML=`${lyricsCheck.main.temp_min}`
  // //    let max =  document.getElementById('max');
  // //    max.innerText=`${lyricsCheck.main.temp_max}`
  // let date = document.getElementById("dateManage");
  // let get = new Date();
  // date.innerHTML = getDateFunction(get);
}
